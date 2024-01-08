import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id?: string
      username?: string
    }
    accessToken: string
    refreshToken?: string
  }
}
