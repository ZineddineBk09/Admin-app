import DriversTeams from '@/components/drivers/teams'
import { DriversContextProvider } from '@/context/driver'
import { NextPage } from 'next'
import React from 'react'

const Drivers: NextPage = () => {
  return (
    <DriversContextProvider>
      <DriversTeams />
    </DriversContextProvider>
  )
}

export default Drivers
