import { ReportsPage } from '@/components/reports'
import { ReportsContextProvider } from '@/context/report'
import { NextPage } from 'next'
import React from 'react'

const Reports: NextPage = () => {
  return (
    <ReportsContextProvider>
      <ReportsPage />
    </ReportsContextProvider>
  )
}

export default Reports
