import React from 'react'
import { ChatContent } from './chat-content'
import { Chats } from './chats'

const SupportPage = () => {
  return (
    <div className='w-full flex items-start justify-between overflow-y-hidden h-[92vh]'>
      <Chats />
      <ChatContent />
    </div>
  )
}

export default SupportPage
