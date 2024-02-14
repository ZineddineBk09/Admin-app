// import Countries from '../components/areas/countries'
import dynamic from 'next/dynamic'
const Countries = dynamic(() => import('../../components/areas/countries'), {
  ssr: false,
  loading: () => <Loading />,
})
import { NextPage } from 'next'
import React from 'react'
import Loading from '../../components/shared/loading'
import { AreasCountriesContextProvider } from '../../context/areas/countries'

const AreasCountriesPage: NextPage = () => {
  return (
    <AreasCountriesContextProvider>
      <Countries />
    </AreasCountriesContextProvider>
  )
}

export default AreasCountriesPage
