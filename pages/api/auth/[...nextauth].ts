import axios from 'axios'
import NextAuth from 'next-auth'
import { RequestInternal } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

async function refreshAccessToken(token: any) {
  console.log('Refreshing access token')
  try {
    const url = process.env.NEXT_PUBLIC_API_URL + '/token/refresh'

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        refresh: token.refreshToken,
      }),
    })

    const refreshedTokens = await response.json()

    if (!response.ok) {
      throw refreshedTokens
    }

    console.log('Refreshed access token')
    console.log(refreshedTokens)

    return {
      ...token,
      accessToken: refreshedTokens.data.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.data.expires,
      refreshToken: refreshedTokens.data.refresh_token ?? token, // Fall back to old refresh token
    }
  } catch (error) {
    console.log(error)

    return {
      ...token,
      error: 'RefreshAccessTokenError',
    }
  }
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'fleetrun-auth',
      id: 'fleetrun-auth',
      credentials: {
        username: {
          type: 'text',
        },
        password: {
          type: 'password',
        },
      },

      async authorize(
        credentials: Record<'username' | 'password', string> | undefined,
        req: Pick<RequestInternal, 'method' | 'body' | 'query' | 'headers'>
      ): Promise<any> {
        try {
          const { username, password } = credentials!
          const response = await axios.post(
            process.env.NEXT_PUBLIC_API_URL + '/login',
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

            return token
          } else {
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
      console.log('JWT callback')
      console.log('token:', token)

      if (user) {
        console.log('user', user)
        token.accessToken = user.accessToken
        token.refreshToken = user.refreshToken
        token.username = user.user.username
      }

      return token
    },
    async session({ session, token }: any) {
      console.log('Session callback')
      session.accessToken = token.accessToken
      session.refreshToken = token.refreshToken
      session.user.username = token.username
      session.iat = token.iat
      session.exp = token.exp

      console.log(
        'Valid till: ' + new Date(session.exp * 1000).toLocaleString()
      )

      console.log(session)
      return session
    },
  },
  pages: {
    signIn: '/',
  },
  secret: process.env.NEXTAUTH_SECRET,
})


