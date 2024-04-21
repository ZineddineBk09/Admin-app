import dynamic from 'next/dynamic'
const DriversTeams = dynamic(() => import('../../components/drivers/teams'), {
  ssr: false,
  loading: () => <Loading />,
})
import { NextPage } from 'next'
import React from 'react'
import Loading from '../../components/shared/loading'
import { TeamsContextProvider } from '../../context/drivers/teams'
import { AreasCitiesContextProvider } from '../../context/areas/cities'
import { AreasCountriesContextProvider } from '../../context/areas/countries'
import { AreasGovernoratesContextProvider } from '../../context/areas/governorates'

const DriversTeamsPage: NextPage = () => {
  return (
    <Context>
      <DriversTeams />
    </Context>
  )
}

const Context = ({ children }: { children: React.ReactNode }) => {
  return (
    <TeamsContextProvider>
      <AreasCountriesContextProvider>
        <AreasGovernoratesContextProvider>
          <AreasCitiesContextProvider>{children}</AreasCitiesContextProvider>
        </AreasGovernoratesContextProvider>
      </AreasCountriesContextProvider>
    </TeamsContextProvider>
  )
}

export default DriversTeamsPage
