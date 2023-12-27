import React from 'react'
import { ChatContent } from './chat'
import { SupportMembers } from './support-members'

const SupportPage = () => {
  return (
    <div className='w-full flex items-start justify-between overflow-y-hidden h-[92vh]'>
      <SupportMembers />
      <ChatContent />
    </div>
  )
}




export default SupportPage
