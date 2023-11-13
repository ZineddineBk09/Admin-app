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
            const token = {
              user: {
                username,
              },
              accessToken: access,
              refreshToken: refresh,
            }
            console.log('returned token', token)
            return token
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
    async jwt({ token, user }: any) {
      console.log('jwt', token)
      console.log('user', user)
      if (user) {
        token.accessToken = user.accessToken
        token.refreshToken = user.refreshToken
        token.username = user.user.username
      }
      return token
    },
    async session({ session, token }: any) {
      console.log('session', session)
      console.log('token', token)
      session.accessToken = token.accessToken
      session.refreshToken = token.refreshToken
      session.user.username = token.username
      return session
    },
  },
  pages: {
    signIn: '/',
  },
  secret: process.env.NEXTAUTH_SECRET,
})
