import { Button, Loading, Modal, Text, Tooltip } from '@nextui-org/react'
import React from 'react'
import { Flex } from '../styles/flex'
import { DeleteIcon } from '../icons/table'
import { IconButton } from '../table/table.styled'
import { deleteRecord } from '@/lib/api'
import { useOrdersContext } from '@/context/order/OrdersContext'

export const DeleteOrder = ({
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
    console.log('closed')
  }

  const handleDelete = async () => {
    setLoading(true)
    await deleteRecord(id, 'driver')
    console.log('deleted: ', id)
    closeHandler()
    setLoading(false)
    refreshOrders()
  }

  return (
    <div>
      <Tooltip content='Delete' color='error' onClick={handler}>
        <IconButton>
          <DeleteIcon size={20} fill='#FF0080' />
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
            Delete Order
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
              <Text h5>Are you sure you want to delete this driver?</Text>
              <Text h6 color='error'>
                This action cannot be undone
              </Text>
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
