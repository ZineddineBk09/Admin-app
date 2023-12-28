import React, { useState, useRef, useEffect } from 'react'
import { Loading, Modal, Text, Tooltip } from '@nextui-org/react'
import { Flex } from '../../styles/flex'
import { AttachmentIcon } from '@/components/icons/support'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { FaUpload, FaRegFile } from 'react-icons/fa'
import { truncateTxt } from '@/utils'

function DragDrop() {
  const dropContainer = useRef<any>(null)
  const [dragging, setDragging] = useState(false)
  const fileRef = useRef<any>(null)
  const [files, setFiles] = useState<File[]>([])
  const [filesUrl, setFilesUrl] = useState<string[]>()

  const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files?.length == 0) return

    setFilesUrl(
      Array.from(e.target.files!).map((file) => URL.createObjectURL(file))
    )
    setFiles(Array.from(e.target.files!))
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement> | any, type: string) {
    let filesArr: File[] = []
    if (type === 'inputFile') {
      filesArr = Array.from(e.dataTransfer.files)
    } else {
      e.preventDefault()
      e.stopPropagation()
      setDragging(false)
      filesArr = Array.from(e.dataTransfer.files)
    }
    if (filesArr && filesArr.length) {
      setFiles(filesArr)
      setFilesUrl(filesArr.map((file: File) => URL.createObjectURL(file)))
      console.log('files:', filesArr)
      console.log('filesUrl:', filesUrl)
    }
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

    dropContainer.current.addEventListener('dragover', handleDragOver)
    dropContainer.current.addEventListener('drop', handleDrop)
    dropContainer.current.addEventListener('dragleave', handleDragLeave)

    return () => {
      if (dropContainer.current) {
        dropContainer.current.removeEventListener('dragover', handleDragOver)
        dropContainer.current.removeEventListener('drop', handleDrop)
        dropContainer.current.removeEventListener('dragleave', handleDragLeave)
      }
    }
  }, [files])

  return (
    <>
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
              onChange={handleUploadFile}
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
            Files must be less than 2MB (jpg, jpeg, png, gif, pdf, doc, docx,
            xls, xlsx, ppt, pptx, txt, zip, rar)
          </div>
        </div>
      </div>

      {files?.length > 0 && (
        <div className='mt-4 grid grid-cols-2 gap-y-4 gap-x-4'>
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
                    <div className='text-gray-500 text-[17px] cursor-pointer'>
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
    </>
  )
}

const DragDropModal = () => {
  const [visible, setVisible] = React.useState(false)
  const [loading, setLoading] = React.useState<boolean>(false)
  const handler = () => setVisible(true)

  const closeHandler = () => {
    setVisible(false)
  }

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
            Upload Files
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
              <DragDrop />
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
                onClick={() => console.log('save')}
                type='submit'
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
