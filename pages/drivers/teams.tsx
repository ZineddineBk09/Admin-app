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
import { UsersContextProvider } from '../../context/users'
import { AreasCountriesContextProvider } from '../../context/areas/countries'
import { AreasGovernoratesContextProvider } from '../../context/areas/governorates'

const DriversTeamsPage: NextPage = () => {
  return (
    <TeamsContextProvider>
      <AreasCountriesContextProvider>
        <AreasGovernoratesContextProvider>
          <AreasCitiesContextProvider>
            <UsersContextProvider>
              <DriversTeams />
            </UsersContextProvider>
          </AreasCitiesContextProvider>
        </AreasGovernoratesContextProvider>
      </AreasCountriesContextProvider>
    </TeamsContextProvider>
  )
}

export default DriversTeamsPage
