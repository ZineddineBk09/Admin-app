import { firestore } from '@/firebase/support'
import { Chat, ChatMessage, SupportTeamMember } from '@/interfaces'
import { collection, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'

export const SupportContext = React.createContext({})

export const useSupportContext: {
  (): {
    chats: Chat[]
    supportTeamMembers: SupportTeamMember[]
    chatMessages: ChatMessage[]
    supportTeam: SupportTeamMember[]
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
  const [supportTeam, setSupportTeam] = useState<SupportTeamMember[]>(
    [] as SupportTeamMember[]
  )
  const [selectedChat, setSelectedChat] = useState<Chat>({} as Chat)
  const [chats, setChats] = useState<Chat[]>([])
  const [supportTeamMembers, setSupportTeamMembers] = useState<
    SupportTeamMember[]
  >([])
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])

  const [loading, setLoading] = useState(false)

  const handleSelectChat = (id: string) => {
    const chat = chats?.find((chat) => chat.id === id)

    if (chat) {
      setSelectedChat(chat)
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

          // set selected chat
          if (!selectedChat.id) {
            setSelectedChat({
              id: change.doc.id,
              ...change.doc.data(),
            } as Chat)
          } else {
            if (selectedChat.id === change.doc.id) {
              setSelectedChat({
                id: change.doc.id,
                ...change.doc.data(),
              } as Chat)
            }
          }
        })
      })

      return () => {
        unsub()
      }
    }
    getChats()
  }, [])

  // MESSAGES
  useEffect(() => {
    const getMessages = () => {
      const unsub = onSnapshot(
        collection(firestore, 'messages'),
        (snapshot) => {
          snapshot.docChanges().forEach((change) => {
            setChatMessages((prevMessages: any) => {
              if (change.type === 'added') {
                return [
                  ...prevMessages.filter(
                    (message: ChatMessage) => message.id !== change.doc.id
                  ),
                  {
                    id: change.doc.id,
                    ...change.doc.data(),
                  } as ChatMessage,
                ]
              } else if (change.type === 'modified') {
                return prevMessages.map((message: ChatMessage) =>
                  message.id === change.doc.id
                    ? {
                        id: change.doc.id,
                        ...change.doc.data(),
                      }
                    : message
                )
              } else if (change.type === 'removed') {
                return prevMessages.filter(
                  (message: ChatMessage) => message.id !== change.doc.id
                ) as ChatMessage[]
              }
              return prevMessages
            })
          })
        }
      )

      return () => {
        unsub()
      }
    }
    getMessages()
  }, [])

  return (
    <SupportContext.Provider
      value={{
        chats,
        supportTeamMembers,
        chatMessages,
        supportTeam,
        selectedChat,
        loading,
        handleSelectChat,
      }}
    >
      {children}
    </SupportContext.Provider>
  )
}
