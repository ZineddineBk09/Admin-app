import { Modal, Text, Tooltip, Loading } from '@nextui-org/react'
import { IconButton } from '../../../table/admin/table.styled'
import React from 'react'
import { Flex } from '../../../styles/flex'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { EditIcon } from '../../../icons/table'
import { AutoCancelledOrder, Order, Team } from '../../../../interfaces'
import { getRecords, updateRecord } from '../../../../lib/api'
import { ConfirmModal } from '../../../shared/confirm-modal'
import { LabelField } from '../../../shared/text/label'

export const AddBonus = ({ order }: { order: AutoCancelledOrder }) => {
  const [visible, setVisible] = React.useState(false)
  const handler = () => setVisible(true)
  const [error, setError] = React.useState<string>('')
  const [loading, setLoading] = React.useState<boolean>(false)

  const formik = useFormik({
    initialValues: {
      bonus: 0,
    },
    validationSchema: Yup.object({
      bonus: Yup.number(),
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
      <Tooltip content='' onClick={handler}>
        <button className='px-3 py-2 bg-green-500 text-white rounded-lg'>
          Add Bonus
        </button>
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
                  <div className='w-full flex flex-col items-start gap-y-2'>
                    <LabelField>Bonus</LabelField>
                    <div className='h-11 w-full bg-gray-200 rounded px-4 flex justify-between items-center'>
                      <input
                        id='bonus'
                        name='bonus'
                        type='text'
                        //@ts-ignore
                        value={formik.values['bonus']}
                        placeholder='0'
                        className='bg-transparent w-full h-full outline-none'
                        onChange={formik.handleChange}
                      />
                      <span className='text-gray-500'>SAR</span>
                    </div>
                  </div>
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
