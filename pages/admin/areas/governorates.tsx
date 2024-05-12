import dynamic from 'next/dynamic'
const Governorates = dynamic(
  () => import('../../../components/admin/areas/governorates'),
  {
    ssr: false,
    loading: () => <Loading />,
  }
)
import { AreasGovernoratesContextProvider } from '../../../context/admin/areas/governorates'
import { NextPage } from 'next'
import React from 'react'
import Loading from '../../../components/shared/loading'
import { AreasCountriesContextProvider } from '../../../context/admin/areas/countries'
import { AdminGuard } from '../../../components/guards/admin'

const AreasGovernoratesPage: NextPage = () => {
  return (
    <AdminGuard>
      <AreasGovernoratesContextProvider>
        <AreasCountriesContextProvider>
          <Governorates />
        </AreasCountriesContextProvider>
      </AreasGovernoratesContextProvider>
    </AdminGuard>
  )
}

export default AreasGovernoratesPage
