import { Loading, Modal, Text, Tooltip } from '@nextui-org/react'
import React from 'react'
import { Flex } from '../styles/flex'
import { ConfirmModal } from '../shared/confirm-modal'
import toast from 'react-hot-toast'
import { cancelRecord } from '../../lib/api'

export const InactivateDriver = ({
  id,
  refresh,
}: {
  id: string
  refresh?: () => void
}) => {
  const [visible, setVisible] = React.useState(false)
  const handler = () => setVisible(true)
  const [loading, setLoading] = React.useState<boolean>(false)
  const [note, setNote] = React.useState('')

  const closeHandler = () => setVisible(false)

  const handleInactivate = async () => {
    setLoading(true)
    try {
      const response = await cancelRecord(id, 'driver', note, 'inactivate')
        .then(() => {
          toast.success('Driver inactivated')
          closeHandler()
          setLoading(false)
        })
        .catch((error) => {
          toast.error('Failed to inactivate driver')
          console.log(error)
          setLoading(false)
        })
    } catch (error) {
      toast.error('Failed to inactivate driver')
      throw error
    }
  }

  return (
    <div>
      <Tooltip content='Inactivate' color='error' onClick={handler}>
        <button className='w-full h-11 px-12 bg-red-500 rounded font-medium text-lg shadow-lg hover:bg-opacity-90 transition-all duration-300'>
          Inactivate
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
            Inactivate Driver
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
                handleConfirm={handleInactivate}
                title='Confirm'
                text='Are you sure you want to inactivate this driver?'
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
