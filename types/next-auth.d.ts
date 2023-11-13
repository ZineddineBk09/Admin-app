import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: any
    accessToken: string
    refreshToken?: string
  }
}
