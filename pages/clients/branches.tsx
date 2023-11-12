import Branches from '@/components/clients/branches'
import { ClientsBranchesContextProvider } from '@/context/clients/BranchesContext'
import { NextPage } from 'next'
import React from 'react'

const ClientsBranchesPage: NextPage = () => {
  return (
    <ClientsBranchesContextProvider>
      <Branches />
    </ClientsBranchesContextProvider>
  )
}

export default ClientsBranchesPage
