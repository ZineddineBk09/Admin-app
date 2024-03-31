// import { DriversPage as DriversList } from '../../components/drivers/list'
import dynamic from 'next/dynamic'
const DriversList = dynamic(
  () => import('../../components/drivers/list').then((mod) => mod.DriversPage),
  {
    ssr: false,
    loading: () => <Loading />,
  }
)
import { DriversContextProvider } from '../../context/drivers'
import { NextPage } from 'next'
import React from 'react'
import Loading from '../../components/shared/loading'
import { TeamsContextProvider } from '../../context/drivers/teams'
import { AreasCitiesContextProvider } from '../../context/areas/cities'

const DriversPage: NextPage = () => {
  return (
    <Context>
      <DriversList />
    </Context>
  )
}

const Context = ({ children }: { children: React.ReactNode }) => {
  return (
    <DriversContextProvider>
      <TeamsContextProvider>
        <AreasCitiesContextProvider>{children}</AreasCitiesContextProvider>
      </TeamsContextProvider>
    </DriversContextProvider>
  )
}

export default DriversPage
