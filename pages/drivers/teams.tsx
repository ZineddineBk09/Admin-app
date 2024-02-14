// import DriversTeams from '../../components/drivers/teams'
import dynamic from 'next/dynamic'
const DriversTeams = dynamic(() => import('../../components/drivers/teams'), {
  ssr: false,
  loading: () => <Loading />,
})
import { DriversContextProvider } from '../../context/drivers'
import { NextPage } from 'next'
import React from 'react'
import Loading from '../../components/shared/loading'

const DriversTeamsPage: NextPage = () => {
  return (
    <DriversContextProvider>
      <DriversTeams />
    </DriversContextProvider>
  )
}

export default DriversTeamsPage
