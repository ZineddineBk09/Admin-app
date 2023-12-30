import { ReportsPage as Reports } from '@/components/reports'
import { ReportsContextProvider } from '@/context/report'
import { NextPage } from 'next'
import React from 'react'

const ReportsPage: NextPage = () => {
  return (
    <ReportsContextProvider>
      <Reports />
    </ReportsContextProvider>
  )
}

export default ReportsPage
