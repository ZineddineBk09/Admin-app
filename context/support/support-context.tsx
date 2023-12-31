import { firestore } from '@/firebase/support'
import { Chat, ChatMessage, SupportTeamMember } from '@/interfaces'
import { fetchChatMessages } from '@/lib/api/support'
import { collection, collectionGroup, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'

export const SupportContext = React.createContext({})

export const useSupportContext: {
  (): {
    chats: Chat[]
    chatMessages: ChatMessage[]
    selectedChat: Chat
    loading: boolean
    handleSelectChat: (id: string) => void
  }
} = () => React.useContext(SupportContext as any)

export const SupportContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [selectedChat, setSelectedChat] = useState<Chat>({} as Chat)
  const [chats, setChats] = useState<Chat[]>([])
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [loading, setLoading] = useState(false)

  const handleSelectChat = async (id: string) => {
    const chat = chats?.find((chat) => chat.id === id)

    if (chat) {
      setLoading(true)
      // track adding new messages in chat messages subcollection
      const unsub = onSnapshot(
        collectionGroup(firestore, 'messages'),
        async (snapshot: any) => {
          const messages: any[] = await fetchChatMessages(id)
          setChatMessages(messages)
          setLoading(false)
        }
      )
      setSelectedChat(chat)
      setLoading(false)
      return unsub
    }
  }

  // CHATS
  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(collection(firestore, 'chats'), (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          setChats((prevChats: any) => {
            if (change.type === 'added') {
              return [
                ...prevChats.filter((chat: Chat) => chat.id !== change.doc.id),
                {
                  id: change.doc.id,
                  ...change.doc.data(),
                } as Chat,
              ]
            } else if (change.type === 'modified') {
              return prevChats.map((chat: Chat) =>
                chat.id === change.doc.id
                  ? {
                      id: change.doc.id,
                      ...change.doc.data(),
                    }
                  : chat
              )
            } else if (change.type === 'removed') {
              return prevChats.filter(
                (chat: Chat) => chat.id !== change.doc.id
              ) as Chat[]
            }
            return prevChats
          })

          // set selected chat if it's not set
          if (!selectedChat.id) {
            handleSelectChat(change.doc.id)
          }
        })
      })

      return () => {
        unsub()
      }
    }
    getChats()
  }, [])

  return (
    <SupportContext.Provider
      value={{
        chats,
        chatMessages,
        selectedChat,
        loading,
        handleSelectChat,
      }}
    >
      {children}
    </SupportContext.Provider>
  )
}
