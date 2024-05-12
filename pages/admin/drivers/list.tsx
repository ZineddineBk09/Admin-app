// import { DriversPage as DriversList } from '../../components/drivers/list'
import dynamic from 'next/dynamic'
const DriversList = dynamic(
  () =>
    import('../../../components/admin/drivers/list').then(
      (mod) => mod.DriversPage
    ),
  {
    ssr: false,
    loading: () => <Loading />,
  }
)
import { DriversContextProvider } from '../../../context/admin/drivers'
import { NextPage } from 'next'
import React from 'react'
import Loading from '../../../components/shared/loading'
import { TeamsContextProvider } from '../../../context/admin/drivers/teams'
import { AreasCitiesContextProvider } from '../../../context/admin/areas/cities'
import { AdminGuard } from '../../../components/guards/admin'

const DriversPage: NextPage = () => {
  return (
    <Context>
      <DriversList />
    </Context>
  )
}

const Context = ({ children }: { children: React.ReactNode }) => {
  return (
    <AdminGuard>
      <DriversContextProvider>
        <TeamsContextProvider>
          <AreasCitiesContextProvider>{children}</AreasCitiesContextProvider>
        </TeamsContextProvider>
      </DriversContextProvider>
    </AdminGuard>
  )
}

export default DriversPage
