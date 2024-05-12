// import UsersAccess from '../../components/settings/users-access'
import dynamic from 'next/dynamic'
const UsersAccess = dynamic(
  () => import('../../../components/admin/settings/users-access'),
  {
    ssr: false,
    loading: () => <Loading />,
  }
)
import { NextPage } from 'next'
import React from 'react'
import Loading from '../../../components/shared/loading'
import { AdminGuard } from '../../../components/guards/admin'

const UsersAccessPage: NextPage = () => {
  return (
    <AdminGuard>
      <UsersAccess />
    </AdminGuard>
  )
}

export default UsersAccessPage
