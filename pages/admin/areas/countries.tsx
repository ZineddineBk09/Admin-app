import dynamic from 'next/dynamic'
const Countries = dynamic(
  () => import('../../../components/admin/areas/countries'),
  {
    ssr: false,
    loading: () => <Loading />,
  }
)
import { NextPage } from 'next'
import React from 'react'
import Loading from '../../../components/shared/loading'
import { AreasCountriesContextProvider } from '../../../context/admin/areas/countries'
import { AdminGuard } from '../../../components/guards/admin'

const AreasCountriesPage: NextPage = () => {
  return (
    <AdminGuard>
      <AreasCountriesContextProvider>
        <Countries />
      </AreasCountriesContextProvider>
    </AdminGuard>
  )
}

export default AreasCountriesPage
