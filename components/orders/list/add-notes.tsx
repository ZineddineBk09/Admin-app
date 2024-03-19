import { Divider, Modal, Text, Tooltip, Loading } from '@nextui-org/react'
import { IconButton } from '../../table/table.styled'
import React from 'react'
import { Flex } from '../../styles/flex'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { NotesIcon } from '../../icons/table'
import { Note, Order } from '../../../interfaces'
import { createRecord } from '../../../lib/api'
import { useOrdersContext } from '../../../context/orders'
import toast from 'react-hot-toast'

export const AddNotes = ({ order }: { order: Order }) => {
  const [visible, setVisible] = React.useState(false)
  const handler = () => setVisible(true)
  const [loading, setLoading] = React.useState<boolean>(false)
  const { refreshOrders } = useOrdersContext()

  const formik = useFormik({
    initialValues: {
      note: '',
    },
    validationSchema: Yup.object({
      note: Yup.string().required('Please enter a note'),
    }),
    onSubmit: async (values) => {
      setLoading(true)
      await createRecord(
        {
          order: order.id,
          description: values.note,
        },
        'note'
      )
        .then((res) => {
          if (res) {
            setVisible(false)
            toast.success('Note added successfully')
            refreshOrders()
          }
        })
        .catch((err) => {
          console.log('Error adding note!: ', err)
          toast.error('Error adding note!')
        })
      setVisible(false)
      setLoading(false)
      // if (response.status) {
      //   setVisible(false)
      //   setLoading(false)
      // } else {
      //   setError('Something went wrong')
      //   setLoading(false)
      // }
    },
  })

  const closeHandler = () => setVisible(false)

  return (
    <div>
      <Tooltip content='Note'>
        <IconButton onClick={handler}>
          <NotesIcon size={20} fill='#979797' />
        </IconButton>
      </Tooltip>
      <Modal
        closeButton
        aria-labelledby='modal-title'
        width='600px'
        open={visible}
        onClose={closeHandler}
        className='rounded-md'
      >
        {/* Form */}
        {loading ? (
          <Loading size='xl' className='my-3' color='warning' />
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <Modal.Header css={{ justifyContent: 'center' }}>
              <Text
                id='modal-title'
                className='text-xl font-semibold capitalize'
                h4
              >
                Notes
              </Text>
            </Modal.Header>
            {/* <Divider css={{ my: '$5' }} /> */}
            <Modal.Body css={{ py: '$10' }}>
              <Flex
                direction={'column'}
                css={{
                  flexWrap: 'wrap',
                  gap: '$8',
                  '@lg': { flexWrap: 'nowrap', gap: '$12' },
                }}
              >
                <div className='w-full flex flex-col items-end gap-y-3'>
                  <div className='w-full flex flex-col items-start gap-y-2'>
                    <label className='text-gray-500'>Note</label>
                    <textarea
                      placeholder='Note'
                      name='note'
                      id='note'
                      className='w-full bg-gray-200 rounded p-4'
                      rows={4}
                      value={formik.values.note}
                      onChange={formik.handleChange}
                    />
                  </div>
                  <button
                    className='h-11 px-10 bg-primary rounded font-medium text-lg shadow-lg hover:bg-opacity-90 transition-all duration-300'
                    type='submit'
                  >
                    Add New Note
                  </button>
                </div>

                {/* Notes */}
                <div className='flex flex-col items-start gap-y-2 max-h-[300px] overflow-y-auto bg-gray-50'>
                  <Divider css={{ my: '$5' }} />
                  {order?.notes?.map((note: Note, index: number) => (
                    <div
                      className='w-full flex flex-col items-start gap-y-2'
                      key={index}
                    >
                      <div className='w-full p-2'>
                        <div className='flex justify-between items-center'>
                          <span className='text-gray-600 font-semibold'>
                            {new Date(note.added_at).toLocaleDateString() +
                              '-' +
                              new Date(note.added_at).toLocaleTimeString()}
                          </span>
                        </div>
                        <div className='text-gray-500 text-sm'>
                          {note.description}
                        </div>
                      </div>
                      <Divider css={{ my: '$5' }} />
                    </div>
                  ))}
                </div>
              </Flex>
            </Modal.Body>
            {/* <Divider css={{ my: '$5' }} /> */}
            <Modal.Footer>
              <button
                className='h-11 px-12 mx-auto bg-gray-400 rounded font-medium text-lg shadow-lg hover:bg-opacity-90 transition-all duration-300'
                onClick={closeHandler}
              >
                Close
              </button>
            </Modal.Footer>
          </form>
        )}
      </Modal>
    </div>
  )
}
