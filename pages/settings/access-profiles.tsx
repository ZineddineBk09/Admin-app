// import Profiles from '../../components/settings/access-profiles'
const Profiles = dynamic(
  () => import('../../components/settings/access-profiles'),
  {
    ssr: false,
    loading: () => <Loading />,
  }
)
import Loading from '../../components/shared/loading'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import React from 'react'

const AccessProfilesPage: NextPage = () => {
  return <Profiles />
}

export default AccessProfilesPage
