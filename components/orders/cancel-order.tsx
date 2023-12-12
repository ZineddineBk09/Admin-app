import { Button, Input, Loading, Modal, Text, Tooltip } from '@nextui-org/react'
import React from 'react'
import { Flex } from '../styles/flex'
import { IconButton } from '../table/table.styled'
import { deleteRecord } from '@/lib/api'
import { useOrdersContext } from '@/context/order'
import { CancelIcon } from '../icons/orders'

export const CancelOrder = ({
  id,
  refresh,
}: {
  id: string
  refresh?: () => void
}) => {
  const [visible, setVisible] = React.useState(false)
  const handler = () => setVisible(true)
  const [error, setError] = React.useState<string>('')
  const [loading, setLoading] = React.useState<boolean>(false)
  const { refreshOrders } = useOrdersContext()

  const closeHandler = () => {
    setVisible(false)
  }

  const handleDelete = async () => {
    setLoading(true)
    await deleteRecord(id, 'driver')
    closeHandler()
    setLoading(false)
    refreshOrders()
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
        width='400px'
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

              {/* Reason & Note */}
              <Input
                bordered
                clearable
                fullWidth
                size='lg'
                placeholder='Reason for cancellation'
                name='reason'
                id='reason'
                // value={formik.values.reason}
                // onChange={formik.handleChange}
                //   // status={
                //     formik.touched.reason && formik.errors.reason
                //       ? 'error'
                //       : 'default'
                //   }
                // 
              />
              <Input
                bordered
                clearable
                fullWidth
                size='lg'
                placeholder='Note'
                name='note'
                id='note'
                // value={formik.values.note}
                // onChange={formik.handleChange}
                //   // status={
                //     formik.touched.note && formik.errors.note ? 'error' : 'default'
                //   }
              />
            </Flex>
          </Modal.Body>
        )}
        <Modal.Footer>
          {!loading && (
            <Flex justify={'end'}>
              <Button
                auto
                className='bg-red-500 hover:bg-red-600'
                onClick={() => {
                  handleDelete()
                }}
                
              >
                Delete
              </Button>
            </Flex>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  )
}
