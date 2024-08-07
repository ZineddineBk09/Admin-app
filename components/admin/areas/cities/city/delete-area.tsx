import { Button, Loading, Modal, Text, Tooltip } from '@nextui-org/react'
import React from 'react'
import toast from 'react-hot-toast'
import { BinIcon } from '../../../../icons/areas'
import { Flex } from '../../../../styles/flex'
import { deleteRecord } from '../../../../../lib/api'
import { useAreasCitiesContext } from '../../../../../context/admin/areas/cities'

export const DeleteArea = ({
  areaId,
  areaName,
}: {
  areaId: number
  areaName: string
}) => {
  const [visible, setVisible] = React.useState(false)
  const handler = () => setVisible(true)
  const [loading, setLoading] = React.useState<boolean>(false)
  const { refreshCities, cities } = useAreasCitiesContext()

  const closeHandler = () => setVisible(false)

  const handleDelete = async () => {
    setLoading(true)
    await deleteRecord(areaId, 'geofence')
      .then((res: any) => {
        setLoading(false)
        closeHandler()
        toast.success('Area deleted successfully')
        refreshCities()
      })
      .catch((err) => {
        toast.error('Error deleting area!')
      })
  }

  return (
    <div>
      <Tooltip
        content={'Delete Area "' + areaName + '"'}
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
            Delete Area <span className='text-gray-400'>#{areaId}</span>
          </Text>
        </Modal.Header>
        {loading ? (
          <Loading size='xl' className='my-3'  />
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
              <Text h5>Are you sure you want to remove this area?</Text>
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
