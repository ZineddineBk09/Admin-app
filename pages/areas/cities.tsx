// import Cities from '../components/areas/cities'
import dynamic from 'next/dynamic'
const Cities = dynamic(() => import('../../components/areas/cities'), {
  ssr: false,
  loading: () => <Loading />,
})
import { AreasCitiesContextProvider } from '../../context/areas/cities'
import { NextPage } from 'next'
import React from 'react'
import Loading from '../../components/shared/loading'
import { AreasCountriesContextProvider } from '../../context/areas/countries'
import { AreasGovernoratesContextProvider } from '../../context/areas/governorates'

const AreasCitiesPage: NextPage = () => {
  return (
    <Context>
      <Cities />
    </Context>
  )
}

const Context = ({ children }: { children: React.ReactNode }) => {
  return (
    <AreasCitiesContextProvider>
      <AreasGovernoratesContextProvider>
        <AreasCountriesContextProvider>
          {children}
        </AreasCountriesContextProvider>
      </AreasGovernoratesContextProvider>
    </AreasCitiesContextProvider>
  )
}

export default AreasCitiesPage
