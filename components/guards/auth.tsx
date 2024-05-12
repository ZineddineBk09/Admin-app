import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Loading from '../shared/loading'
import React from 'react'
import { signOut, useSession } from 'next-auth/react'
import { protectedRoutes } from '../../routes'
import { useCurrentRole } from '../../hooks/current-role'

const AuthGuard = ({ children }: { children: React.ReactNode }): any => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const role = useCurrentRole()
  const path = useRouter().pathname.split('/')[2]

  console.log('session:', session)

  useEffect(() => {
    if (status === 'loading') return
    if (status === 'authenticated') {
      // stay on the same page if user is authenticated
      if (router.asPath === '/') {
        if (role === 'admin') {
          router.push('/admin/dashboard')
        } else if (role === 'client' || role === 'branch') {
          // if client redirect to client dashboard
          router.push('/client/orders/list')
        }
      }
      router.push(router.asPath)
    }
    if (status == 'unauthenticated' && protectedRoutes.includes(path)) {
      router.push('/')
    }
  }, [session, status])

  useEffect(() => {
    if (!session?.user && session?.expires) {
      signOut()
    }
  }, [session])

  if (status === 'loading') return <Loading />

  return children
}

export default AuthGuard
