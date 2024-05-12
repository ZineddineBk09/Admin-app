// import Branches from '../../components/clients/branches'
import dynamic from 'next/dynamic'
const Branches = dynamic(
  () => import('../../../components/admin/clients/branches'),
  {
    ssr: false,
    loading: () => <Loading />,
  }
)
import { ClientsBranchesContextProvider } from '../../../context/admin/clients/branches'
import { NextPage } from 'next'
import React from 'react'
import Loading from '../../../components/shared/loading'
import { UsersContextProvider } from '../../../context/admin/users'
import { ClientsAccountsContextProvider } from '../../../context/admin/clients/accounts'
import { AreasGovernoratesContextProvider } from '../../../context/admin/areas/governorates'
import { AreasCitiesContextProvider } from '../../../context/admin/areas/cities'
import { AreasCountriesContextProvider } from '../../../context/admin/areas/countries'
import { AdminGuard } from '../../../components/guards/admin'

const ClientsBranchesPage: NextPage = () => {
  return (
    <Context>
      <Branches />
    </Context>
  )
}

const Context = ({ children }: { children: React.ReactNode }) => {
  return (
    <AdminGuard>
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
    </AdminGuard>
  )
}

export default ClientsBranchesPage
