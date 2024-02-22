// import Branches from '../../components/clients/branches'
import dynamic from 'next/dynamic'
const Branches = dynamic(() => import('../../components/clients/branches'), {
  ssr: false,
  loading: () => <Loading />,
})
import { ClientsBranchesContextProvider } from '../../context/clients/branches'
import { NextPage } from 'next'
import React from 'react'
import Loading from '../../components/shared/loading'

const ClientsBranchesPage: NextPage = () => {
  return (
    <ClientsBranchesContextProvider>
      <Branches />
    </ClientsBranchesContextProvider>
  )
}

export default ClientsBranchesPage
