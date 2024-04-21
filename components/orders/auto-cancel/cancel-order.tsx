import { Loading, Modal, Text, Tooltip } from '@nextui-org/react'
import React from 'react'
import { Flex } from '../../styles/flex'
import { IconButton } from '../../table/table.styled'
import { deleteRecord } from '../../../lib/api'
import { useOrdersContext } from '../../../context/orders'
import { CancelIcon } from '../../icons/orders'
import { ConfirmModal } from '../../shared/confirm-modal'

export const CancelOrder = ({
  id,
  refresh,
}: {
  id: string | number
  refresh?: () => void
}) => {
  const [visible, setVisible] = React.useState(false)
  const handler = () => setVisible(true)
  const [error, setError] = React.useState<string>('')
  const [loading, setLoading] = React.useState<boolean>(false)
  const { refreshOrders } = useOrdersContext()

  const closeHandler = () => setVisible(false)

  const handleDelete = async () => {
    setLoading(true)
    await deleteRecord(id, 'driver')
    closeHandler()
    setLoading(false)
    refreshOrders()
  }

  return (
    <div>
      <Tooltip content='' color='error' onClick={handler}>
        <button className='px-3 py-2 bg-red-500 text-white rounded-lg'>
          Cancel Order
        </button>
      </Tooltip>
      <Modal
        closeButton
        aria-labelledby='modal-title'
        width='550px'
        open={visible}
        onClose={closeHandler}
        className='rounded-md'
      >
        <Modal.Header>
          <Text id='modal-title' className='text-xl font-semibold uppercase' h4>
            Cancel Order
          </Text>
        </Modal.Header>
        {loading ? (
          <Loading size='xl' className='my-3' color='warning' />
        ) : (
          <Modal.Body>
            <Flex
              direction='column'
              css={{
                flexWrap: 'wrap',
                gap: '$6',
                '@lg': { flexWrap: 'nowrap', gap: '$12' },
              }}
            >
              <Text h5 className='w-full text-center'>
                Are you sure you want to{' '}
                <span className='text-red-500 font-semibold'>cancel</span> this
                order #{id}?
              </Text>

              <div className='w-full flex flex-col items-start gap-y-2'>
                <label className='text-gray-500'>Reason</label>
                <input
                  type='text'
                  placeholder='Reason for cancellation'
                  name='reason'
                  id='reason'
                  className='w-full h-11 bg-gray-200 rounded px-4'
                />
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
        )}
        <Modal.Footer>
          {!loading && (
            <div className='w-full flex items-center justify-center gap-x-4'>
              <button
                className='h-11 px-12 bg-gray-400 rounded font-medium text-lg shadow-lg hover:bg-opacity-90 transition-all duration-300'
                onClick={closeHandler}
              >
                Cancel
              </button>

              <ConfirmModal
                handleConfirm={handleDelete}
                title='Confirm'
                text='Are you sure you want to cancel this order?'
                clickButton={
                  <button className='h-11 px-12 bg-red-500 rounded font-medium text-lg shadow-lg hover:bg-opacity-90 transition-all duration-300'>
                    Confirm
                  </button>
                }
              />
            </div>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  )
}
