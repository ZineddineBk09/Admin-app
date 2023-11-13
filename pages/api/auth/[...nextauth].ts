import axios from 'axios'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'fleetrun-auth',
      id: 'fleetrun-auth',

      async authorize({
        username,
        password,
      }: {
        username: string
        password: string
      }) {
        try {
          const response = await axios.post(
            process.env.NEXT_PUBLIC_API_URL + '/token',
            { username, password }
          )
          const {
            refresh,
            access,
          }: {
            refresh: string
            access: string
          } = response.data

          if (refresh && access) {
            return {
              user: {
                username,
              },
              accessToken: access,
            }
          } else {
            console.log('Invalid credentials')
            throw new Error('Invalid credentials')
          }
        } catch (error: any) {
          throw new Error(error.message)
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }: any) {
      session.accessToken = token.access
      return session
    },
    async jwt({ token, user }: any) {
      if (user) {
        token.access = user.accessToken
      }
      return token
    },
  },
  pages: {
    signIn: '/',
  },
  secret: process.env.NEXTAUTH_SECRET,
})
