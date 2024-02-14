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

const DriversPage: NextPage = () => {
  return (
    <DriversContextProvider>
      <DriversList />
    </DriversContextProvider>
  )
}

export default DriversPage
