import { DriversPage as DriversList } from '@/components/drivers/list'
import { DriversContextProvider } from '@/context/driver'
import { NextPage } from 'next'
import React from 'react'

const DriversPage: NextPage = () => {
  return (
    <DriversContextProvider>
      <DriversList />
    </DriversContextProvider>
  )
}

export default DriversPage
