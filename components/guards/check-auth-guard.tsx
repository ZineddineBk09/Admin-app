import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Loading from '@/components/shared/loading'
import React from 'react'
import { useSession } from 'next-auth/react'

const CheckAuthGuard = ({ children }: { children: React.ReactNode }): any => {
  const { data: session, status } = useSession()
  console.log(session, status)

  const router = useRouter()
  const path = useRouter().pathname.split('/')[1]
  const protectedRoutes = [
    'dashboard',
    'settings',
    'clients',
    'drivers',
    'customers',
    'areas',
    'pricing',
  ]

  useEffect(() => {
    if (status === 'loading') return
    if (status === 'authenticated') {
      // stay on the same page if user is authenticated
      if (router.asPath === '/') router.push('/dashboard')
      router.push(router.asPath)
    }
    if (status == 'unauthenticated' && protectedRoutes.includes(path)) {
      router.push('/')
    }
  }, [session, status])

  if (status === 'loading') return <Loading />

  return children
}

export default CheckAuthGuard
