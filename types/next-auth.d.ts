import NextAuth, { DefaultSession } from 'next-auth'

export type ExtendedUser = DefaultSession['user'] & {
  user_id: string
  username: string
  role: string
}

declare module 'next-auth' {
  interface Session {
    user: ExtendedUser
    accessToken: string
    refreshToken?: string
    error?: string
  }
}
