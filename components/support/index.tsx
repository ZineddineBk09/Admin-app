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
        {selectedMember?.chats?.map((message: any, index: number) => (
          <div
            key={index}
            className={`flex items-end ${
              index % 2 === 0 ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`flex flex-col text-sm max-w-2xl mx-2 ${
                index % 2 === 0 ? 'order-1 items-end' : 'order-2 items-start'
              } `}
            >
              <span className='text-xs'>12:00pm</span>
              <span
                className={`px-4 py-2 rounded-md inline-block text-black shadow-md ${
                  index % 2 === 0 ? 'bg-gray-200' : 'bg-[#59AFFF]'
                }`}
              >
                {message.text}
              </span>
            </div>
          </div>
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
      <div className='absolute bottom-0 w-full bg-gradient-to-b from-gray-400/10 to-gray-400/100 inset-x-0 h-36 -z-1'/>
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
