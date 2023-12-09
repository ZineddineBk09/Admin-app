import Governorates from '@/components/areas/governorates'
import { AreasGovernoratesContextProvider } from '@/context/areas/governorates'
import { NextPage } from 'next'
import React from 'react'

const AreasGovernoratesPage: NextPage = () => {
  return (
    <AreasGovernoratesContextProvider>
      <Governorates />
    </AreasGovernoratesContextProvider>
  )
}

export default AreasGovernoratesPage
