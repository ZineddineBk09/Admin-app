// import DriversTypes from '../../components/drivers/drivers-types'
import dynamic from 'next/dynamic'
const DriversTypes = dynamic(
  () => import('../../components/drivers/drivers-types'),
  {
    ssr: false,
    loading: () => <Loading />,
  }
)
import { NextPage } from 'next'
import React from 'react'
import Loading from '../../components/shared/loading'
import { DriversContextProvider } from '../../context/drivers'

const DriversTypesPage: NextPage = () => {
  return (
    <DriversContextProvider>
      <DriversTypes />
    </DriversContextProvider>
  )
}

export default DriversTypesPage
