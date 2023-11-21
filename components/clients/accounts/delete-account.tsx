import { Button, Loading, Modal, Text, Tooltip } from '@nextui-org/react'
import React from 'react'
import { Flex } from '../../styles/flex'
import { BinIcon } from '@/components/icons/areas'

export const DeleteAccount = ({ id }: { id: string }) => {
  const [visible, setVisible] = React.useState(false)
  const handler = () => setVisible(true)
  const [loading, setLoading] = React.useState<boolean>(false)

  const closeHandler = () => {
    setVisible(false)
  }

  const handleDelete = async () => {
    setLoading(true)
    // await deleteAccount(id)
    // await deleteImage(id, 'rooms')
    // closeHandler()
    // setLoading(false)
    // refreshAccounts()
    console.log('delete room')
    setLoading(false)
    closeHandler()
  }

  return (
    <div>
      <Tooltip
        content='Delete Account'
        color={'error'}
        className='mr-6'
        onClick={handler}
      >
        <BinIcon />
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
            Delete account <span className='text-gray-400'>#{id}</span>
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
              <Text h5>Are you sure you want to delete this Account?</Text>
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
