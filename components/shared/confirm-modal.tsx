import { Loading, Modal, Text } from '@nextui-org/react'
import React from 'react'
import { Flex } from '../styles/flex'

export const ConfirmModal = ({
  handleConfirm,
  title,
  text,
  clickButton,
}: {
  handleConfirm: () => void
  title: string
  text: string
  clickButton: React.ReactNode
}) => {
  const [visible, setVisible] = React.useState(false)
  const [loading, setLoading] = React.useState<boolean>(false)
  const handler = () => setVisible(true)

  const closeHandler = () => {
    setVisible(false)
  }

  return (
    <div>
      <div onClick={handler}>{clickButton}</div>

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
            {title}
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
              <Text h5>{text || ''}</Text>
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
              <button
                className='h-11 px-12 bg-primary rounded font-medium text-lg shadow-lg hover:bg-opacity-90 transition-all duration-300'
                onClick={handleConfirm}
                type='submit'
              >
                Save
              </button>
            </div>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  )
}
