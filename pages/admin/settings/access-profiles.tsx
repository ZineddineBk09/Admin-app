// import Profiles from '../../components/settings/access-profiles'
const Profiles = dynamic(
  () => import('../../../components/admin/settings/access-profiles'),
  {
    ssr: false,
    loading: () => <Loading />,
  }
)
import Loading from '../../../components/shared/loading'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import React from 'react'
import { AdminGuard } from '../../../components/guards/admin'

const AccessProfilesPage: NextPage = () => {
  return (
    <AdminGuard>
      <Profiles />
    </AdminGuard>
  )
}

export default AccessProfilesPage
