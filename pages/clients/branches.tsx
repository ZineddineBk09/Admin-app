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
import { UsersContextProvider } from '../../context/users'
import { ClientsAccountsContextProvider } from '../../context/clients/accounts'
import { AreasGovernoratesContextProvider } from '../../context/areas/governorates'
import { AreasCitiesContextProvider } from '../../context/areas/cities'
import { AreasCountriesContextProvider } from '../../context/areas/countries'

const ClientsBranchesPage: NextPage = () => {
  return (
    <Context>
      <Branches />
    </Context>
  )
}

const Context = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClientsBranchesContextProvider>
      <ClientsAccountsContextProvider>
        <UsersContextProvider>
          <AreasCountriesContextProvider>
            <AreasGovernoratesContextProvider>
              <AreasCitiesContextProvider>
                {children}
              </AreasCitiesContextProvider>
            </AreasGovernoratesContextProvider>
          </AreasCountriesContextProvider>
        </UsersContextProvider>
      </ClientsAccountsContextProvider>
    </ClientsBranchesContextProvider>
  )
}

export default ClientsBranchesPage
