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

const AreasCitiesPage: NextPage = () => {
  return (
    <AreasCitiesContextProvider>
      <Cities />
    </AreasCitiesContextProvider>
  )
}

export default AreasCitiesPage
