import { useSupportContext } from '@/context/support/support-context'
import { SupportTeamMember } from '@/interfaces'
import React, { useEffect } from 'react'
import { AttachmentIcon, EmojiIcon, SendIcon } from '../icons/support'
import { Tooltip } from '@nextui-org/react'

const SupportPage = () => {
  return (
    <div className='w-full flex items-start justify-between overflow-y-hidden h-[92vh]'>
      <SupportMembers />
      <Chat />
    </div>
  )
}

const Chat = () => {
  const messagesRef: any = React.useRef(null)
  const { selectedMember } = useSupportContext()

  // get chat messages and group them by date
  const chatMessages = selectedMember?.chats?.reduce(
    (acc: any, message: any) => {
      const date = new Date(message.date)
      const dateKey = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
      if (acc[dateKey]) {
        acc[dateKey].push(message)
      } else {
        acc[dateKey] = [message]
      }
      return acc
    },
    {}
  )

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
        {chatMessages &&
          Object.keys(chatMessages).map((dateKey: any, index: number) => (
            <>
              <span className='w-28 mx-auto bg-gray-300 py-1 font-medium shadow-lg rounded-full text-center text-gray-600 text-sm md:text-base md:w-32 lg:w-36'>
                {dateKey}
              </span>
              {chatMessages[dateKey]?.map((message: any, index: number) => (
                <div
                  key={index}
                  className={`flex items-end ${
                    index % 2 === 0 ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`flex flex-col text-sm max-w-2xl mx-2  ${
                      index % 2 === 0
                        ? 'order-1 items-end'
                        : 'order-2 items-start'
                    } `}
                  >
                    <span
                      className={`w-full h-5 px-4 text-xs font-bold flex items-center rounded-t-md shadow-md text-white ${
                        index % 2 === 0
                          ? 'bg-gray-400 justify-end'
                          : 'bg-blue-600'
                      }`}
                    >
                      {index % 2 === 0 ? (
                        <>
                          Customer <div className='mx-3' />
                          12:00 PM
                        </>
                      ) : (
                        <>
                          12:00 PM <div className='mx-3' />
                          {selectedMember.name}
                        </>
                      )}
                    </span>
                    <span
                      className={`w-full px-4 py-2 rounded-b-md inline-block text-black shadow-md ${
                        index % 2 === 0 ? 'bg-gray-200' : 'bg-[#59AFFF]'
                      }`}
                    >
                      {message.text}
                    </span>
                  </div>
                </div>
              ))}
            </>
          ))}
      </div>

      {/* Message Section */}
      <div className='z-10 px-4 pt-4 mb-2 sm:mb-0 absolute bottom-4 w-full mx-auto'>
        <div className='relative flex flex-col bg-gray-300 rounded-md'>
          <input
            type='text'
            placeholder='Write your message!'
            className='w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-4 bg-transparent rounded-md pt-4 pb-6'
          />
          <div className='w-full flex items-center justify-between'>
            <div>
              <button
                type='button'
                className='inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none'
              >
                <Tooltip content='Attach a file' color='primary'>
                  <AttachmentIcon />
                </Tooltip>
              </button>
              <button
                type='button'
                className='inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none'
              >
                <Tooltip content='Add an emoji' color='warning'>
                  <EmojiIcon />
                </Tooltip>
              </button>
            </div>
            <button
              type='button'
              className='px-4 py-3 text-gray-500 focus:outline-none'
            >
              <Tooltip content='Send' color='success'>
                <SendIcon />
              </Tooltip>
            </button>
          </div>
        </div>
      </div>
      <div className='absolute bottom-0 w-full bg-gradient-to-b from-gray-400/10 to-gray-400/100 inset-x-0 h-36 -z-1' />
    </div>
  )
}

const SupportMembers = () => {
  const { supportTeam, selectedMember, handleSelectMember } =
    useSupportContext()

  return (
    <ul className='w-[300px] h-full list-none bg-gray-200 min-h-full !overflow-y-scroll'>
      {supportTeam.map(
        ({ id, name, unread }: SupportTeamMember, index: number) => (
          <li
            className='px-4 border-b border-gray-300 relative cursor-pointer'
            key={index}
            onClick={() => handleSelectMember(id)}
          >
            <div className='flex items-center justify-between relative py-3'>
              <span
                className={`${
                  selectedMember.id === id
                    ? 'text-black font-bold'
                    : 'text-gray-400 font-medium'
                }`}
              >
                {name}
              </span>
              {unread > 0 ? (
                <span className='h-6 w-6 flex items-center justify-center text-center text-white font-bold text-xs bg-red-500 rounded-full'>
                  {unread}
                </span>
              ) : (
                <span className='h-6 w-6' />
              )}
            </div>
            {selectedMember.id === id && (
              <div className='absolute w-3 h-full top-0 right-0 bg-primary transition-all duration-300' />
            )}
          </li>
        )
      )}
    </ul>
  )
}

export default SupportPage
