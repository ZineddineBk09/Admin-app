import { useSupportContext } from '@/context/support/support-context'
import { Chat } from '@/interfaces'
import React from 'react'

export const SupportMembers = () => {
  const { chats, selectedChat, handleSelectChat } = useSupportContext()

  return (
    <ul className='w-[300px] h-full list-none bg-gray-200 min-h-full !overflow-y-scroll'>
      {chats?.map(({ id, customerName, unread }: Chat, index: number) => (
        <li
          className='px-4 border-b border-gray-300 relative cursor-pointer'
          key={index}
          onClick={() => handleSelectChat(id)}
        >
          <div className='flex items-center justify-between relative py-3'>
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
              <span className='h-6 w-6 flex items-center justify-center text-center text-white font-bold text-xs bg-red-500 rounded-full'>
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
