import Accounts from '@/components/clients/accounts'
import { ClientsAccountsContextProvider } from '@/context/clients/accounts'
import { NextPage } from 'next'
import React from 'react'

const ClientsAccountsPage: NextPage = () => {
  return (
    <ClientsAccountsContextProvider>
      <Accounts />
    </ClientsAccountsContextProvider>
  )
}

export default ClientsAccountsPage
