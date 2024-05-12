// import Support from '../../components/support'
const Support = dynamic(() => import('../../../components/admin/support'), {
  ssr: false,
  loading: () => <Loading />,
})
import Loading from '../../../components/shared/loading'
import { SupportContextProvider } from '../../../context/admin/support/support-context'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import React from 'react'
import { AdminGuard } from '../../../components/guards/admin'

const SupportPage: NextPage = () => {
  return (
    <AdminGuard>
      <SupportContextProvider>
        <Support />
      </SupportContextProvider>
    </AdminGuard>
  )
}

export default SupportPage
