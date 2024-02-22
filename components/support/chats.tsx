import { useSupportContext } from '../../context/support/support-context'
import { Chat } from '../../interfaces'
import React, { useEffect } from 'react'

export const Chats = () => {
  const { chats } = useSupportContext()
  const [openedChats, setOpenedChats] = React.useState<Chat[]>([])
  const [closedChats, setClosedChats] = React.useState<Chat[]>([])

  useEffect(() => {
    // filter chats based on status: opened, and closed
    const opened = chats?.filter((chat: Chat) => chat.status === 'opened')
    const closed = chats?.filter((chat: Chat) => chat.status === 'closed')

    // set opened chats
    setOpenedChats(opened)

    // set closed chats
    setClosedChats(closed)
  }, [chats])

  return (
    <div className='w-[300px] h-full'>
      {/* Opened chats */}
      <div className='w-full'>
        {RenderChats(openedChats)}
      </div>

      {/* Closed chats */}
      <div className='w-full mt-8'>
        <h3 className='text-gray-500 text-sm font-medium px-4 mb-4'>
          Closed Chats
        </h3>
        {RenderChats(closedChats)}
      </div>
    </div>
  )
}

const RenderChats = (chats: Chat[]) => {
  const { selectedChat, handleSelectChat } = useSupportContext()

  return (
    <ul className='w-full list-none bg-gray-200 !overflow-y-scroll'>
      {chats?.map(({ id, customerName, unread }: Chat, index: number) => (
        <li
          className='px-4 border-b border-gray-300 relative cursor-pointer'
          key={index}
          onClick={() => handleSelectChat(id)}
        >
          <div className='flex items-center justify-between relative py-3 capitalize'>
            <span
              className={`${
                selectedChat.id === id
                  ? 'text-black font-bold'
                  : 'text-gray-400 font-medium'
              }`}
            >
              {customerName}
            </span>
            {unread > 0 ? (
              <span className='w-fit h-6 flex items-center justify-center text-center text-white font-bold text-xs bg-red-500 rounded-full px-2 pt-1'>
                {unread}
              </span>
            ) : (
              <span className='h-6 w-6' />
            )}
          </div>
          {selectedChat.id === id && (
            <div className='absolute w-3 h-full top-0 right-0 bg-primary transition-all duration-300' />
          )}
        </li>
      ))}
    </ul>
  )
}
