import { DriversPage } from '@/components/drivers'
import { DriversContextProvider } from '@/context/driver/DriversContext'
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
