// import { ReportsPage as Reports } from '../../components/reports'
import dynamic from 'next/dynamic'
const Reports = dynamic(
  () =>
    import('../../components/reports/client-view').then((mod) => mod.ReportsPage),
  {
    ssr: false,
    loading: () => <Loading />,
  }
)
import { ReportsContextProvider } from '../../context/reports'
import { NextPage } from 'next'
import React from 'react'
import Loading from '../../components/shared/loading'

const ReportsPage: NextPage = () => {
  return (
    <ReportsContextProvider>
      <Reports />
    </ReportsContextProvider>
  )
}

export default ReportsPage
