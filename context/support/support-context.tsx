import { SupportChat, SupportTeamMember } from '@/interfaces'
import React, { useEffect, useState } from 'react'
import { date } from 'yup'

export const SupportContext = React.createContext({})

export const useSupportContext: {
  (): {
    supportTeam: SupportTeamMember[]
    selectedMember: SupportTeamMember
    loading: boolean
    refreshSupport: () => Promise<void>
    handleSelectMember: (id: number) => void
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
  const [selectedMember, setselectedMember] = useState<SupportTeamMember>(
    {} as SupportTeamMember
  )

  const support = [
    {
      id: 1,
      text: "Hi there! I am wondering if you can help me with a problem I've been having.",
      date: '06/01/2023',
    },
    {
      id: 2,
      text: "Oh, hey. I'm not sure, but I'll do my best.",
      date: '06/01/2023',
    },
    {
      id: 3,
      text: "I've been trying to install this package but it's not working and I don't know why.",
      date: '06/01/2023',
    },
    {
      id: 4,
      text: 'What package are you trying to install?',
      date: '06/01/2023',
    },
    {
      id: 5,
      text: "It's called @vue/devtools",
      date: '06/01/2023',
    },
    {
      id: 6,
      text: "Oh, I think I know what's going on. Give me a second and I'll get back to you.",
      date: '07/01/2023',
    },
    {
      id: 7,
      text: 'Okay, thank you!',
      date: '07/01/2023',
    },
    {
      id: 8,
      text: "Okay, I'm back. Are you using npm or yarn?",
      date: '07/01/2023',
    },
    {
      id: 9,
      text: "I'm using npm.",
      date: '07/01/2023',
    },
    {
      id: 10,
      text: 'Okay, try running this command: npm install -g @vue/devtools',
      date: '07/01/2023',
    },
    {
      id: 11,
      text: "Okay, I'll try that.",
      date: '07/01/2023',
    },
    {
      id: 12,
      text: 'Did that work?',
      date: '07/01/2023',
    },
    {
      id: 13,
      text: "No, it didn't. I'm still getting the same error.",
      date: '07/01/2023',
    },
    {
      id: 14,
      text: "Okay, I'm not sure what's going on. Let me do some research and I'll get back to you.",
      date: '09/01/2023',
    },
    {
      id: 15,
      text: 'Okay, thank you!',
      date: '09/01/2023',
    },
    {
      id: 16,
      text: "Okay, I'm back. Are you using npm or yarn?",
      date: '09/01/2023',
    },
    {
      id: 17,
      text: "I'm using npm.",
      date: '09/01/2023',
    },
    {
      id: 18,
      text: 'Okay, try running this command: npm install -g @vue/devtools',
      date: '09/01/2023',
    },
  ]

  const [loading, setLoading] = useState(false)

  const refreshSupport = async () => {
    setLoading(true)

    const supportTeam: SupportTeamMember[] = [
      {
        id: 1,
        name: 'Samir Khaled',
        chats: support,
        unread: 8,
      },
      {
        id: 2,
        name: 'Ahmed Mohamed',
        chats: support,
        unread: 0,
      },
      {
        id: 3,
        name: 'Mohamed Ahmed',
        chats: support,
        unread: 10,
      },
      {
        id: 4,
        name: 'Nessrine Khaled',
        chats: support,
        unread: 1,
      },
    ]

    setSupportTeam(supportTeam)

    setLoading(false)
  }

  const handleSelectMember = (id: number) => {
    const member = supportTeam.find((member) => member.id === id)

    if (member) {
      setselectedMember(member)
    }
  }

  useEffect(() => {
    refreshSupport()
  }, [])

  useEffect(() => {
    if (supportTeam.length > 0) {
      setselectedMember(supportTeam[0])
    }
  }, [supportTeam])

  return (
    <SupportContext.Provider
      value={{
        supportTeam,
        selectedMember,
        loading,
        refreshSupport,
        handleSelectMember,
      }}
    >
      {children}
    </SupportContext.Provider>
  )
}
