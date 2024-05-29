import axios from 'axios'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { jwtDecode } from 'jwt-decode'
import { ExtendedUser } from '../../../types/next-auth'

interface DecodedToken {
  token_type: string
  exp: number
  iat: number
  jti: string
  user_id: number
  username: string
  role: string
}

async function refreshAccessToken(token: any) {
  try {
    console.log('-------- REFRESHING TOKEN ----------')
    const response = await axios.post(
      (process.env.NEXT_PUBLIC_BASE_URL + 'token/refresh') as string,
      { refresh: token.refreshToken }
    )

    if (!response.data) {
      throw new Error('No refresh token found')
    }

    const {
      refresh,
      access,
    }: {
      refresh: string
      access: string
    } = response.data
    if (refresh && access) {
      const decoded: DecodedToken = jwtDecode(access) as DecodedToken
      const user = {
        user_id: decoded.user_id,
        username: decoded.username,
        role: decoded.role,
      }

      return {
        user,
        accessToken: access,
        refreshToken: refresh ?? token.refreshToken, // Fallback to the old refresh token
        expires: decoded.exp * 1000,
      }
    } else {
      throw new Error('Invalid credentials')
    }
  } catch (error: any) {
    console.log('Error refreshing token', error)
    return { error: 'RefreshAccessTokenError' }
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

      async authorize(credentials: any, req: any): Promise<any> {
        try {
          const { username, password } = credentials

          if (!username || !password) return null

          const response = await axios.post(
            (process.env.NEXT_PUBLIC_BASE_URL + 'login') as string,
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
            const decoded: DecodedToken = jwtDecode(access) as DecodedToken
            const user = {
              user_id: decoded.user_id,
              username: decoded.username,
              role: decoded.role,
            }

            return {
              ...user,
              access,
              refresh,
              exp: decoded.exp * 1000,
              iat: decoded.iat * 1000,
              jti: decoded.jti,
            }
          } else {
            throw new Error('Invalid credentials')
          }
        } catch (error: any) {
          console.log('Error logging in', error)
          return null
        }
      },
    }),
  ],
  // append the user to the session
  callbacks: {
    async jwt({ token, user, account }: any) {
      // Initial sign in
      if (user && account) {
        const roles = ['admin', 'client', 'branch']
        // if user does not have a role "admin" or "client" return null
        if (!roles.includes(user?.role)) {
          return null
        }

        return {
          user: {
            user_id: user.user_id,
            username: user.username,
            role: user.role,
          },
          accessToken: user.access,
          refreshToken: user.refresh,
          expires: user.exp,
        }
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < token.expires) {
        console.log(
          'Time left for token to expire in mins:',
          (((token.expires - Date.now()) / 3600000) * 60).toFixed(2) + ' mins'
        )
        return token
      }

      // Access token has expired, try to refresh it
      try {
        const refreshedToken = await refreshAccessToken(token)
        // signout if the refresh token is invalid
        if (
          refreshedToken.error === 'RefreshAccessTokenError' ||
          !refreshedToken
        ) {
          return null
        }
        return refreshedToken
      } catch (error: any) {
        // Return null to stop the session from being created
        return null
      }
    },
    async session({ session, token }) {
      session.user = token?.user as ExtendedUser
      session.accessToken = token?.accessToken as string
      session.refreshToken = token?.refreshToken as string
      return session
    },
  },
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/',
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
})
