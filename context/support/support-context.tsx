import { SupportTeamMember } from '@/interfaces'
import React, { useEffect, useState } from 'react'

export const SupportContext = React.createContext({})

export const useSupportContext: {
  (): {
    supportTeam: SupportTeamMember[]
    loading: boolean
    refreshSupport: () => Promise<void>
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
  const support = [
    {
      id: 1,
      text: "Hi there! I am wondering if you can help me with a problem I've been having.",
    },
    {
      id: 2,
      text: "Oh, hey. I'm not sure, but I'll do my best.",
    },
    {
      id: 3,
      text: "I've been trying to install this package but it's not working and I don't know why.",
    },
    {
      id: 4,
      text: 'What package are you trying to install?',
    },
    {
      id: 5,
      text: "It's called @vue/devtools",
    },
    {
      id: 6,
      text: "Oh, I think I know what's going on. Give me a second and I'll get back to you.",
    },
    {
      id: 7,
      text: 'Okay, thank you!',
    },
    {
      id: 8,
      text: "Okay, I'm back. Are you using npm or yarn?",
    },
    {
      id: 9,
      text: "I'm using npm.",
    },
    {
      id: 10,
      text: 'Okay, try running this command: npm install -g @vue/devtools',
    },
    {
      id: 11,
      text: "Okay, I'll try that.",
    },
    {
      id: 12,
      text: 'Did that work?',
    },
    {
      id: 13,
      text: "No, it didn't. I'm still getting the same error.",
    },
    {
      id: 14,
      text: "Okay, I'm not sure what's going on. Let me do some research and I'll get back to you.",
    },
    {
      id: 15,
      text: 'Okay, thank you!',
    },
    {
      id: 16,
      text: "Okay, I'm back. Are you using npm or yarn?",
    },
    {
      id: 17,
      text: "I'm using npm.",
    },
    {
      id: 18,
      text: 'Okay, try running this command: npm install -g @vue/devtools',
    },
  ]
  const [loading, setLoading] = useState(false)

  const refreshSupport = async () => {
    setLoading(true)

    const supportTeam: SupportTeamMember[] = [
      {
        id: 1,
        name: 'John Doe',
        chats: support,
      },
      {
        id: 2,
        name: 'Jane Doe',
        chats: support,
      },
    ]

    setSupportTeam(supportTeam)

    setLoading(false)
  }

  useEffect(() => {
    refreshSupport()
  }, [])

  return (
    <SupportContext.Provider
      value={{
        supportTeam,
        loading,
        refreshSupport,
      }}
    >
      {children}
    </SupportContext.Provider>
  )
}
