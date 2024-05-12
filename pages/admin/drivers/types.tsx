// import DriversTypes from '../../components/drivers/drivers-types'
import dynamic from 'next/dynamic'
const DriversTypes = dynamic(
  () => import('../../../components/admin/drivers/drivers-types'),
  {
    ssr: false,
    loading: () => <Loading />,
  }
)
import { NextPage } from 'next'
import React from 'react'
import Loading from '../../../components/shared/loading'
import { DriversContextProvider } from '../../../context/admin/drivers'
import { AdminGuard } from '../../../components/guards/admin'

const DriversTypesPage: NextPage = () => {
  return (
    <AdminGuard>
      <DriversContextProvider>
        <DriversTypes />
      </DriversContextProvider>
    </AdminGuard>
  )
}

export default DriversTypesPage
