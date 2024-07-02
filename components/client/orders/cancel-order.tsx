import { Loading, Modal, Text, Tooltip } from '@nextui-org/react'
import React from 'react'
import { Flex } from '../../styles/flex'
import { IconButton } from '../../table/admin/table.styled'
import { useOrdersContext } from '../../../context/admin/orders'
import { CancelIcon } from '../../icons/orders'
import { ConfirmModal } from '../../shared/confirm-modal'
import toast from 'react-hot-toast'
import { cancelRecord } from '../../../lib/api'

export const CancelOrder = ({
  id,
  refresh,
}: {
  id: string | number
  refresh?: () => void
}) => {
  const [visible, setVisible] = React.useState(false)
  const handler = () => setVisible(true)
  const [loading, setLoading] = React.useState<boolean>(false)
  const { refreshOrders } = useOrdersContext()
  const [note, setNote] = React.useState('')

  const closeHandler = () => setVisible(false)

  const handleCancel = async () => {
    // setLoading(true)
    //   .put(`/order/${id}/?transition=cancel`, {
    //     transition_description_field: note,
    //   })
    //   .then(() => {
    //     toast.success('Order cancelled successfully')
    //     closeHandler()
    //     setLoading(false)
    //     refreshOrders()
    //   })
    //   .catch((error) => {
    //     toast.error('Failed to cancel order')
    //     console.log(error)
    //     setLoading(false)
    //   })
    //use cancelRecord function
    setLoading(true)
    try {
      const response = await cancelRecord(id, 'order', note, 'cancel_order')
        .then(() => {
          toast.success('Order cancelled successfully')
          closeHandler()
          setLoading(false)
          refreshOrders()
        })
        .catch((error) => {
          toast.error('Failed to cancel order')
          console.log(error)
          setLoading(false)
        })
    } catch (error) {
      toast.error('Failed to cancel order')
      throw error
    }
  }

  return (
    <div>
      <Tooltip content='Cancel' color='error' onClick={handler}>
        <IconButton>
          <CancelIcon />
        </IconButton>
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

              {/* <div className='w-full flex flex-col items-start gap-y-2'>
                <label className='text-gray-500'>Reason</label>
                <input
                  type='text'
                  placeholder='Reason for cancellation'
                  name='reason'
                  id='reason'
                  className='w-full h-11 bg-gray-200 rounded px-4'
                />
              </div> */}

              <div className='w-full flex flex-col items-start gap-y-2'>
                <label className='text-gray-500'>Note</label>
                <textarea
                  placeholder='Note'
                  name='note'
                  id='note'
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
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
                handleConfirm={handleCancel}
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
