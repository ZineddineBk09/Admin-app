import dynamic from 'next/dynamic'
const Governorates = dynamic(
  () => import('../../components/areas/governorates'),
  {
    ssr: false,
    loading: () => <Loading />,
  }
)
import { AreasGovernoratesContextProvider } from '../../context/areas/governorates'
import { NextPage } from 'next'
import React from 'react'
import Loading from '../../components/shared/loading'
import { AreasCountriesContextProvider } from '../../context/areas/countries'

const AreasGovernoratesPage: NextPage = () => {
  return (
    <AreasGovernoratesContextProvider>
      <AreasCountriesContextProvider>
        <Governorates />
      </AreasCountriesContextProvider>
    </AreasGovernoratesContextProvider>
  )
}

export default AreasGovernoratesPage
