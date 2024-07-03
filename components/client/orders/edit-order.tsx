import { Modal, Text, Tooltip, Loading } from '@nextui-org/react'
import { IconButton } from '../../table/admin/table.styled'
import React from 'react'
import { Flex } from '../../styles/flex'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { EditIcon } from '../../icons/table'
import { Order, Team } from '../../../interfaces'
import { getRecords, updateRecord } from '../../../lib/api'
import { ConfirmModal } from '../../shared/confirm-modal'
import { LabelField } from '../../shared/text/label'

export const EditOrder = ({ order }: { order: Order }) => {
  const [visible, setVisible] = React.useState(false)
  const handler = () => setVisible(true)
  const [error, setError] = React.useState<string>('')
  const [loading, setLoading] = React.useState<boolean>(false)

  const formik = useFormik({
    initialValues: {
      bonus: 0,
      deduction: 0,
      note: '',
    },
    validationSchema: Yup.object({
      bonus: Yup.number(),
      deduction: Yup.number(),
      note: Yup.string(),
    }),
    onSubmit: async (values) => {
      // setLoading(true)
      const response = await updateRecord(
        {
          id: order?.id,
          ...values,
        },
        'order'
      )
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
      <Tooltip content='Edit'>
        <IconButton onClick={handler}>
          <EditIcon size={20} fill='#979797' />
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
          <Loading size='xl' className='my-3'  />
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <Modal.Header css={{ justifyContent: 'center' }}>
              <Text
                id='modal-title'
                className='text-xl font-semibold capitalize'
                h4
              >
                Edit order
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
                {/* error */}
                {error && (
                  <span className='w-full text-center transition-all duration-300 bg-red-100 text-xs text-red-500 rounded p-2 mx-auto'>
                    {error}
                  </span>
                )}

                <div className='flex items-center justify-between gap-x-5'>
                  {['bonus', 'deduction'].map((item: string, index: number) => (
                    <div
                      className='w-full flex flex-col items-start gap-y-2'
                      key={index}
                    >
                      <LabelField>{item}</LabelField>
                      <div className='h-11 w-full bg-gray-200 rounded px-4 flex justify-between items-center'>
                        <input
                          id={item}
                          name={item}
                          type='text'
                          //@ts-ignore
                          value={formik.values[item]}
                          placeholder='0'
                          className='bg-transparent w-full h-full outline-none'
                          onChange={formik.handleChange}
                        />
                        <span className='text-gray-500'>SAR</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className='w-full flex flex-col items-start gap-y-2'>
                  <label className='text-gray-500'>Note</label>
                  <textarea
                    placeholder='Note'
                    name='note'
                    id='note'
                    className='w-full bg-gray-200 rounded p-4'
                    rows={4}
                  />
                </div>
              </Flex>
            </Modal.Body>
            {/* <Divider css={{ my: '$5' }} /> */}
            <Modal.Footer>
              <div className='w-full flex items-center justify-center gap-x-4'>
                <button
                  className='h-11 px-12 bg-gray-400 rounded font-medium text-lg shadow-lg hover:bg-opacity-90 transition-all duration-300'
                  onClick={closeHandler}
                >
                  Cancel
                </button>

                <ConfirmModal
                  handleConfirm={formik.handleSubmit}
                  title='Confirm'
                  text='Are you sure you want to cancel this order?'
                  clickButton={
                    <button
                      type='button'
                      className='h-11 px-12 bg-primary rounded font-medium text-lg shadow-lg hover:bg-opacity-90 transition-all duration-300'
                    >
                      Confirm
                    </button>
                  }
                />
              </div>
            </Modal.Footer>
          </form>
        )}
      </Modal>
    </div>
  )
}
