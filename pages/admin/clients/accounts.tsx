// import Accounts from '../../components/clients/accounts'
import dynamic from 'next/dynamic'
const Accounts = dynamic(
  () => import('../../../components/admin/clients/accounts'),
  {
    ssr: false,
    loading: () => <Loading />,
  }
)

import { ClientsAccountsContextProvider } from '../../../context/admin/clients/accounts'
import { NextPage } from 'next'
import React from 'react'
import Loading from '../../../components/shared/loading'
import { AdminGuard } from '../../../components/guards/admin'

const ClientsAccountsPage: NextPage = () => {
  return (
    <AdminGuard>
      <ClientsAccountsContextProvider>
        <Accounts />
      </ClientsAccountsContextProvider>
    </AdminGuard>
  )
}

export default ClientsAccountsPage
