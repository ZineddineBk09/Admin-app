import { Button, Loading, Modal, Text, Tooltip } from '@nextui-org/react'
import React from 'react'
import { Flex } from '../../../styles/flex'
import { BinIcon } from '../../../../components/icons/areas'
import { deleteRecord } from '../../../../lib/api'
import toast from 'react-hot-toast'
import { useTeamsContext } from '../../../../context/admin/drivers/teams'

export const DeleteDriverTeam = ({ id }: { id: string }) => {
  const [visible, setVisible] = React.useState(false)
  const handler = () => setVisible(true)
  const [loading, setLoading] = React.useState<boolean>(false)
  const { refreshTeams } = useTeamsContext()

  const closeHandler = () => setVisible(false)

  const handleDelete = async () => {
    setLoading(true)
    await deleteRecord(id, 'team')
      .then((res: any) => {
        setLoading(false)
        closeHandler()
        toast.success('Team deleted successfully')
        refreshTeams()
      })
      .catch((err) => {
        toast.error('Error deleting team!')
      })
  }

  return (
    <div>
      <Tooltip
        content='Delete Team'
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
            Delete Team <span className='text-gray-400'>#{id}</span>
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
              <Text h5>Are you sure you want to delete this team?</Text>
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
