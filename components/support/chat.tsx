import React, { useEffect } from 'react'
import { useSupportContext } from '@/context/support/support-context'
import { ChatMessage } from '@/interfaces'
import { AttachmentIcon, SendIcon } from '../icons/support'
import { Tooltip } from '@nextui-org/react'
import { useFormik } from 'formik'
import { useSession } from 'next-auth/react'
import Emojis from './emoji-picker'
import { addMessage } from '@/lib/api/support'

export const ChatContent = () => {
  const messagesRef: any = React.useRef(null)
  const { selectedChat, chatMessages } = useSupportContext()
  //get deferent dates from chatMessages (array of objects categorized by day)
  const dates = chatMessages?.reduce((acc: any, message: ChatMessage) => {
    const date = new Date(message.timestamp.seconds * 1000).toLocaleDateString(
      'en-US',
      {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
      }
    )
    if (!acc[date]) {
      acc[date] = []
    }
    acc[date].push(message)
    return acc
  }, {})

  useEffect(() => {
    messagesRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <div className='w-[800px] flex-1 justify-between flex flex-col h-full bg-chat-bg bg-gray-400 relative'>
      <div
        id='messages'
        ref={messagesRef}
        className='flex flex-col space-y-4 p-3 overflow-y-auto pb-36'
      >
        {/* Render chat messages based on date */}
        {dates &&
          Object.keys(dates).map((dateKey: any, index: number) => (
            <>
              <span
                className='w-28 mx-auto bg-gray-300 py-1 font-medium shadow-lg rounded-full text-center text-gray-600 text-xs md:text-base md:w-32 lg:w-36'
                key={index}
              >
                {dateKey}
              </span>

              {dates[dateKey].map((message: ChatMessage, index: number) => (
                <div
                  key={index}
                  className={`flex items-end ${
                    message.type === 'customer'
                      ? 'justify-end'
                      : 'justify-start'
                  }`}
                >
                  <div
                    className={`flex flex-col text-sm max-w-2xl mx-2  ${
                      message.type === 'customer'
                        ? 'order-1 items-end'
                        : 'order-2 items-start'
                    } `}
                  >
                    <span
                      className={`w-full h-5 px-4 text-xs font-bold flex items-center justify-between rounded-t-md shadow-md text-white capitalize gap-x-4 ${
                        message.type === 'customer'
                          ? 'bg-gray-400 justify-end'
                          : 'bg-blue-600'
                      }`}
                    >
                      {message.type === 'customer' ? (
                        <>
                          <span>{selectedChat.customerName}</span>
                          {new Date(
                            message.timestamp.seconds * 1000
                          ).toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </>
                      ) : (
                        <>
                          {new Date(
                            message.timestamp.seconds * 1000
                          ).toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}{' '}
                          <span>{message.senderId}</span>
                        </>
                      )}
                    </span>
                    <span
                      className={`w-full px-4 py-2 rounded-b-md inline-block text-black shadow-md ${
                        message.type === 'customer'
                          ? 'bg-gray-200'
                          : 'bg-[#59AFFF]'
                      }`}
                    >
                      {message.content}
                    </span>
                  </div>
                </div>
              ))}
            </>
          ))}
      </div>

      {/* Message Section */}
      <div className='z-10 px-4 pt-4 mb-2 sm:mb-0 absolute bottom-4 w-full mx-auto'>
        <ChatForm />
      </div>
      <div className='absolute bottom-0 w-full bg-gradient-to-b from-gray-400/10 to-gray-400/100 inset-x-0 h-36 -z-1' />
    </div>
  )
}

const ChatForm = () => {
  const { data: session } = useSession()
  const { selectedChat } = useSupportContext()
  const [file, setFile] = React.useState<File>()
  const [fileUrl, setFileUrl] = React.useState<string>()

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: async (values) => {
      await addMessage({
        content: values.message,
        chatId: selectedChat.id,
        senderId: session?.user?.username,
      }).then((id: string) => {
        formik.resetForm()
      })
    },
  })

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    setFileUrl(URL.createObjectURL(e.target.files[0]))
    setFile(e.target.files[0])
  }

  return (
    <form
      className='relative flex flex-col bg-gray-300 rounded-md'
      onSubmit={formik.handleSubmit}
    >
      <input
        id='message'
        name='message'
        value={formik.values.message}
        type='text'
        placeholder='Write your message!'
        className='w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-4 bg-transparent rounded-md pt-4 pb-6'
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <div className='w-full flex items-center justify-between'>
        <div>
          <button
            type='button'
            className='relative inline-flex items-center justify-center rounded-full h-10 w-fit mx-3 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 hover:cursor-pointer focus:outline-none'
          >
            <Tooltip content='Attach a file' color='primary'>
              <input
                id='image'
                type='file'
                name='image'
                accept='image/*'
                onChange={handleChangeFile}
                className='absolute inset-0 outline-none border-none opacity-0 z-10 hover:cursor-pointer'
                title=''
              />
              {fileUrl ? (
                <div className='w-64 h-10 flex items-center justify-between p-2'>
                  <img
                    src={fileUrl}
                    alt='attached file'
                    className='w-8 h-8 rounded-full'
                  />
                  <span className='text-xs font-bold'>1 file attached</span>
                </div>
              ) : (
                <AttachmentIcon />
              )}
            </Tooltip>
          </button>
          <button
            type='button'
            className='relative inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none'
          >
            <Emojis
              onSelectEmojis={(emoji: any) =>
                formik.setFieldValue('message', formik.values.message + emoji)
              }
            />
          </button>
        </div>
        <button
          type='submit'
          className='px-4 py-3 text-gray-500 focus:outline-none'
        >
          <Tooltip content='Send' color='success'>
            <SendIcon />
          </Tooltip>
        </button>
      </div>
    </form>
  )
}
