import React, { useState, useRef, useEffect } from 'react'
import { Loading, Modal, Text, Tooltip } from '@nextui-org/react'
import { Flex } from '../../styles/flex'
import { AttachmentIcon } from '../../../components/icons/support'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { FaUpload, FaRegFile } from 'react-icons/fa'
import { truncateTxt } from '../../../utils'
import { uploadFiles } from '../../../lib/api/support'
import { useSupportContext } from '../../../context/support/support-context'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'

const DragDropModal = () => {
  const dropContainer = useRef<any>(null)
  const fileRef = useRef<any>()
  const [dragging, setDragging] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState<boolean>(false)
  const { selectedChat } = useSupportContext()
  const { data: session } = useSession()

  const handleDropFiles = (
    e: React.DragEvent<HTMLDivElement> | any,
    type: string
  ) => {
    let filesArr: File[] = []
    if (type === 'inputFile') {
      filesArr = Array.from(e.dataTransfer.files)
    } else {
      e.preventDefault()
      e.stopPropagation()
      setDragging(false)
      filesArr = Array.from(e.dataTransfer.files)
    }
    if (filesArr && filesArr?.length) {
      setFiles([...files, ...filesArr])
    }
  }

  const handleDropFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files?.length === 0) return

    setFiles([...files, ...Array.from(e.target.files!)])
  }

  const removeFile = (index: number) => {
    const newFiles = [...files]
    newFiles.splice(index, 1)
    setFiles(newFiles)
  }

  useEffect(() => {
    function handleDragOver(e: any) {
      e.preventDefault()
      e.stopPropagation()
      setDragging(true)
    }

    function handleDragLeave(e: any) {
      e.preventDefault()
      e.stopPropagation()
      setDragging(false)
    }

    if (fileRef.current) {
      dropContainer.current.addEventListener('dragover', handleDragOver)
      dropContainer.current.addEventListener('drop', handleDropFiles)
      dropContainer.current.addEventListener('dragleave', handleDragLeave)
    }
    return () => {
      if (dropContainer.current) {
        dropContainer.current.removeEventListener('dragover', handleDragOver)
        dropContainer.current.removeEventListener('drop', handleDropFiles)
        dropContainer.current.removeEventListener('dragleave', handleDragLeave)
      }
    }
  }, [files])

  const handleUploadFiles = async () => {
    setVisible(false)
    setFiles([])
    await uploadFiles(files, selectedChat.id, session?.user.username)
      .then((res) => {
        if (res) {
          console.log('res', res)
          toast.success('Files uploaded successfully')
        }
      })
      .catch((err) => {
        console.log('upload files err: ', err)
        toast.error('Error uploading files')
      })
  }

  const closeHandler = () => {
    setVisible(false)
  }

  const handler = () => setVisible(true)

  return (
    <div>
      <Tooltip content='Attach a file' color='primary'>
        <button onClick={handler} type='button'>
          <AttachmentIcon />
        </button>
      </Tooltip>

      <Modal
        closeButton
        aria-labelledby='modal-title'
        width='600px'
        open={visible}
        onClose={closeHandler}
        className='rounded-md'
      >
        <Modal.Header>
          <Text id='modal-title' className='text-xl font-semibold uppercase' h4>
            {loading ? 'Uploading...' : 'Upload Files'}
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
              {/* Container Drop */}
              <div
                className={`${
                  dragging
                    ? 'border border-[#2B92EC] bg-[#EDF2FF]'
                    : 'border-dashed border-[#e0e0e0]'
                } flex items-center justify-center mx-auto text-center border-2 rounded-md mt-4 py-5`}
                ref={dropContainer}
              >
                <div className='flex-1 flex flex-col'>
                  <div className='mx-auto text-gray-400 mb-2'>
                    <FaUpload size={18} />
                  </div>
                  <div className='text-[12px] font-normal text-gray-500'>
                    <input
                      className='opacity-0 hidden'
                      multiple
                      id='file'
                      type='file'
                      name='file'
                      accept='.jpg, .jpeg, .png, .gif, .pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .txt, .zip, .rar'
                      ref={fileRef}
                      onChange={handleDropFile}
                    />
                    <span
                      className='text-primary cursor-pointer'
                      onClick={() => {
                        fileRef.current.click()
                      }}
                    >
                      Click to upload
                    </span>{' '}
                    or drag and drop
                  </div>
                  <div className='text-[11px] font-normal text-gray-500 px-20'>
                    Files must be less than 2MB (jpg, jpeg, png, gif, pdf, doc,
                    docx, xls, xlsx, ppt, pptx, txt, zip, rar)
                  </div>
                </div>
              </div>

              {files?.length > 0 && (
                <div className='mt-4 max-h-[200px] grid grid-cols-2 gap-y-4 gap-x-4 overflow-y-auto'>
                  {files?.map((file: File, index: number) => (
                    <div
                      className='w-full px-3 py-3.5 rounded-md bg-slate-200 space-y-3'
                      key={index}
                    >
                      <div className='flex justify-between'>
                        <div className='w-[70%] flex justify-start items-center space-x-2'>
                          <div className='text-primary text-[37px] cursor-pointer'>
                            <FaRegFile />
                          </div>
                          <div className=' space-y-1'>
                            <div className='text-xs font-medium text-gray-500'>
                              {truncateTxt(file.name, 28)}
                            </div>
                            <div className='text-[10px] font-medium text-gray-400'>{`${Math.floor(
                              file.size / 1024
                            )} KB`}</div>
                          </div>
                        </div>
                        <div className='flex-1 flex justify-end'>
                          <button
                            className='space-y-1'
                            onClick={() => removeFile(index)}
                            type='button'
                          >
                            <div className='text-gray-400 text-[17px] cursor-pointer'>
                              <XMarkIcon />
                            </div>
                            <div className='text-[10px] font-medium text-gray-400'>
                              Done
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
                className={`h-11 px-12 bg-primary rounded font-medium text-lg shadow-lg hover:bg-opacity-90 transition-all duration-300 ${
                  files?.length === 0 && 'opacity-50 cursor-not-allowed'
                }`}
                onClick={handleUploadFiles}
                type='button'
                disabled={files?.length === 0}
              >
                Send
              </button>
            </div>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default DragDropModal
