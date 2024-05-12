// import UserssAccess from '../../components/settings/users-access'
import dynamic from 'next/dynamic'
const UserssAccess = dynamic(
  () => import('../../../components/admin/settings/users-access'),
  {
    ssr: false,
    loading: () => <Loading />,
  }
)
import { NextPage } from 'next'
import React from 'react'
import Loading from '../../../components/shared/loading'

const UsersAccessPage: NextPage = () => {
  return <UserssAccess />
}

export default UsersAccessPage
