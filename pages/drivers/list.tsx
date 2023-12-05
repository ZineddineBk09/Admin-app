import { DriversPage } from '@/components/drivers/list'
import { DriversContextProvider } from '@/context/driver'
import { NextPage } from 'next'
import React from 'react'

const Drivers: NextPage = () => {
  return (
    <DriversContextProvider>
      <DriversPage />
    </DriversContextProvider>
  )
}

export default Drivers
