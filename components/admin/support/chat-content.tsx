import React, { useEffect, useMemo } from 'react'
import { useSupportContext } from '../../../context/admin/support/support-context'
import { ChatMessage } from '../../../interfaces'
import { SendIcon } from '../../icons/support'
import { Tooltip } from '@nextui-org/react'
import { useFormik } from 'formik'
import { useSession } from 'next-auth/react'
import Emojis from './emoji-picker'
import { addMessage } from '../../../lib/api/support'
import DragComponent from './files-upload/drag-files'
import { DocumentTextIcon } from '@heroicons/react/24/outline'
import { truncateTxt } from '../../../utils'

const renderMessage = (message: string) => {
  const regex = /(https?:\/\/[^\s]+)|(www\.[^\s]+)|(ftp:\/\/[^\s]+)/g
  const matches = message.match(regex)

  if (matches) {
    // Split the message into parts
    const parts = message.split(regex)

    // Process each part and add JSX elements
    const jsxElements = parts?.map((part, index) => {
      if (index % 2 === 1) {
        // Odd indices represent links
        if (part?.includes('firebasestorage.googleapis.com')) {
          // If it's a Firebase Storage file link
          const fileName = part
            ?.split('support%2F')[1]
            ?.split('?alt')[0]
            ?.replaceAll('%20', '') // Extract file name from the URL

          return (
            <>
              <a
                rel='noreferrer'
                href={part}
                target='_blank'
                className='w-fit bg-[#357dc0] px-4 py-2 rounded-md flex items-center gap-x-4 text-white'
              >
                <DocumentTextIcon className='w-16' />
                <span className='font-medium'>
                  {truncateTxt(fileName?.split('.')[0], 40) +
                    '.' +
                    fileName?.split('.')[1]}
                </span>
              </a>
            </>
          )
        } else {
          // Regular link
          return (
            <a
              key={index}
              rel='noreferrer'
              href={part}
              target='_blank'
              className='text-blue-700 hover:underline'
            >
              {part}
            </a>
          )
        }
      } else {
        // Even indices represent regular text
        return <span key={index}>{part}</span>
      }
    })

    return jsxElements
  }

  // If no links found, return the original message
  return message
}

export const ChatContent = () => {
  const messagesRef: any = React.useRef(null)
  const { loading, chatMessages, selectedChat } = useSupportContext()

  const dates = useMemo(() => {
    if (!chatMessages) return {}

    // Group messages by date
    return chatMessages.reduce((acc: any, message: any) => {
      const date = new Date(
        message.timestamp.seconds * 1000
      ).toLocaleDateString('en-US', {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
      })

      acc[date] = acc[date] ? [...acc[date], message] : [message]
      return acc
    }, {})
  }, [chatMessages])

  useEffect(() => {
    // scroll to bottom of messages container
    messagesRef.current?.scrollTo({
      top: messagesRef.current?.scrollHeight,
      behavior: 'smooth',
    })
  }, [chatMessages])

  return (
    <div className='w-[800px] flex-1 justify-between flex flex-col h-full bg-chat-bg bg-gray-400 relative'>
      <div
        id='messages'
        ref={messagesRef}
        className='flex flex-col space-y-4 p-3 overflow-y-auto pb-36'
      >
        {/* Render chat messages based on date */}
        {loading ? (
          <div className='w-full flex items-center justify-center'>
            <span className='text-gray-600'>Loading...</span>
          </div>
        ) : (
          dates &&
          Object.keys(dates)?.map((dateKey: any, index1: number) => (
            <>
              <span
                className='w-28 mx-auto bg-gray-300 py-1 font-medium shadow-lg rounded-full text-center text-gray-600 text-xs md:text-base md:w-32 lg:w-36'
                key={index1}
              >
                {dateKey}
              </span>

              {dates[dateKey]?.map((message: ChatMessage, index2: number) => (
                <div
                  key={index2}
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
                      className={`w-full pt-1 px-4 text-xs font-bold flex items-center justify-between rounded-t-md shadow-md text-white capitalize gap-x-4 ${
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
                      id={
                        index2 === dates[dateKey]?.length - 1
                          ? 'last-message'
                          : index2.toString()
                      }
                      className={`w-full px-4 py-2 rounded-b-md inline-block shadow-md ${
                        message.type === 'customer'
                          ? 'bg-gray-200'
                          : 'bg-[#59AFFF]'
                      }`}
                    >
                      {renderMessage(message.content)}
                    </span>
                  </div>
                </div>
              ))}
            </>
          ))
        )}
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
  const { selectedChat, handleSelectChat } = useSupportContext()

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: async (values) => {
      if (!values.message || values.message?.length <= 0) return
      await addMessage(selectedChat.id, {
        content: values.message,
        senderId: session?.user?.username,
        type: 'support',
      }).then(() => {
        // handleSelectChat(selectedChat.id)
        formik.setFieldValue('message', '')
      })
    },
  })

  if (!selectedChat.id) return null
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
          <div className='relative inline-flex items-center justify-center rounded-full h-10 w-fit mx-3 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 hover:cursor-pointer focus:outline-none'>
            <DragComponent />
          </div>
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
          <Tooltip content='Send' color='primary'>
            <SendIcon />
          </Tooltip>
        </button>
      </div>
    </form>
  )
}
