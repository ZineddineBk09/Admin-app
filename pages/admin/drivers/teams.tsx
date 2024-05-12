import dynamic from 'next/dynamic'
const DriversTeams = dynamic(
  () => import('../../../components/admin/drivers/teams'),
  {
    ssr: false,
    loading: () => <Loading />,
  }
)
import { NextPage } from 'next'
import React from 'react'
import Loading from '../../../components/shared/loading'
import { TeamsContextProvider } from '../../../context/admin/drivers/teams'
import { AreasCitiesContextProvider } from '../../../context/admin/areas/cities'
import { AreasCountriesContextProvider } from '../../../context/admin/areas/countries'
import { AreasGovernoratesContextProvider } from '../../../context/admin/areas/governorates'
import { AdminGuard } from '../../../components/guards/admin'

const DriversTeamsPage: NextPage = () => {
  return (
    <Context>
      <DriversTeams />
    </Context>
  )
}

const Context = ({ children }: { children: React.ReactNode }) => {
  return (
    <AdminGuard>
      <TeamsContextProvider>
        <AreasCountriesContextProvider>
          <AreasGovernoratesContextProvider>
            <AreasCitiesContextProvider>{children}</AreasCitiesContextProvider>
          </AreasGovernoratesContextProvider>
        </AreasCountriesContextProvider>
      </TeamsContextProvider>
    </AdminGuard>
  )
}

export default DriversTeamsPage
