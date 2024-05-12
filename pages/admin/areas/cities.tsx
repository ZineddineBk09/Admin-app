// import Cities from '../components/areas/cities'
import dynamic from 'next/dynamic'
const Cities = dynamic(() => import('../../../components/admin/areas/cities'), {
  ssr: false,
  loading: () => <Loading />,
})
import { AreasCitiesContextProvider } from '../../../context/admin/areas/cities'
import { NextPage } from 'next'
import React from 'react'
import Loading from '../../../components/shared/loading'
import { AreasCountriesContextProvider } from '../../../context/admin/areas/countries'
import { AreasGovernoratesContextProvider } from '../../../context/admin/areas/governorates'
import { AdminGuard } from '../../../components/guards/admin'

const AreasCitiesPage: NextPage = () => {
  return (
    <Context>
      <Cities />
    </Context>
  )
}

const Context = ({ children }: { children: React.ReactNode }) => {
  return (
    <AdminGuard>
      <AreasCitiesContextProvider>
        <AreasGovernoratesContextProvider>
          <AreasCountriesContextProvider>
            {children}
          </AreasCountriesContextProvider>
        </AreasGovernoratesContextProvider>
      </AreasCitiesContextProvider>
    </AdminGuard>
  )
}

export default AreasCitiesPage
