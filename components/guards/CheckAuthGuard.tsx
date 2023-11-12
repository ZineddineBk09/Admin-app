import { useRouter } from 'next/router'
import { useAuthContext } from '@/context/AuthContext'
import { useEffect } from 'react'
import Loading from '@/components/shared/Loading'
import React from 'react'

const CheckAuthGuard = ({ children }: { children: React.ReactNode }): any => {
  const { user } = useAuthContext() as any
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
    if (user.uid == null && protectedRoutes.includes(path)) router.push('/')
    else if (
      (user.uid != null || user.email != null) &&
      !protectedRoutes.includes(path)
    ) {
      console.log('User is logged in')
      router.push('/dashboard')
    }
  }, [user])

  if (!user) return <Loading />

  // if user account not yet approved
  if (!user.status && user.uid != null && user.email != null) return <div />

  return children
}

export default CheckAuthGuard
