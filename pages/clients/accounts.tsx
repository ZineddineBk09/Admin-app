// import Accounts from '../../components/clients/accounts'
import dynamic from 'next/dynamic'
const Accounts = dynamic(() => import('../../components/clients/accounts'), {
  ssr: false,
  loading: () => <Loading />,
})

import { ClientsAccountsContextProvider } from '../../context/clients/accounts'
import { NextPage } from 'next'
import React from 'react'
import Loading from '../../components/shared/loading'

const ClientsAccountsPage: NextPage = () => {
  return (
    <ClientsAccountsContextProvider>
      <Accounts />
    </ClientsAccountsContextProvider>
  )
}

export default ClientsAccountsPage
