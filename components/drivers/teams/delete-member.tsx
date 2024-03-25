import { Button, Loading, Modal, Text, Tooltip } from '@nextui-org/react'
import React from 'react'
import toast from 'react-hot-toast'
import { BinIcon } from '../../icons/areas'
import { Flex } from '../../styles/flex'
import { deleteRecord, partialUpdateRecord } from '../../../lib/api'
import { useTeamsContext } from '../../../context/drivers/teams'
import { AccountMinimal } from '../../../interfaces'

export const DeleteMember = ({
  id,
  memberId,
  memberName,
  refresh,
}: {
  id: string
  memberId: string
  memberName: string
  refresh: () => void
}) => {
  const [visible, setVisible] = React.useState(false)
  const handler = () => setVisible(true)
  const [loading, setLoading] = React.useState<boolean>(false)
  const { teams } = useTeamsContext()

  const closeHandler = () => setVisible(false)

  const handleDelete = async () => {
    setLoading(true)
    const team = teams.find((team) => team.id === id)
    await partialUpdateRecord(
      {
        id,
        accounts: team?.accounts
          .filter((account: AccountMinimal) => account.id !== memberId)
          .map((account: AccountMinimal) => account.id),
      },
      'team'
    )
      .then((res) => {
        if (res) {
          toast.success('Member deleted successfully')
          handler()
          refresh()
        }
      })
      .catch((err) => {
        toast.error('Error deleting member!')
      })
  }

  return (
    <div>
      <Tooltip
        content={'Delete Member "' + memberName + '"'}
        color={'error'}
        className='mr-6'
        onClick={handler}
      >
        <BinIcon width={4} />
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
            Delete Member <span className='text-gray-400'>#{memberId}</span>
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
              <Text h5>Are you sure you want to remove this member?</Text>
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
