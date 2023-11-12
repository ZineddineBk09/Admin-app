import Cities from '@/components/areas/cities'
import { AreasCitiesContextProvider } from '@/context/areas/CitiesContext'
import { NextPage } from 'next'
import React from 'react'

const AreasCitiesPage: NextPage = () => {
  return (
    <AreasCitiesContextProvider>
      <Cities />
    </AreasCitiesContextProvider>
  )
}

export default AreasCitiesPage
