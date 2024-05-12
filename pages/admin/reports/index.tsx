// import { ReportsPage as Reports } from '../../components/reports'
import dynamic from 'next/dynamic'
const Reports = dynamic(
  () =>
    import('../../../components/admin/reports').then(
      (mod: any) => mod.ReportsPage
    ),
  {
    ssr: false,
    loading: () => <Loading />,
  }
)
import { ReportsContextProvider } from '../../../context/admin/reports'
import { NextPage } from 'next'
import React from 'react'
import Loading from '../../../components/shared/loading'
import { AdminGuard } from '../../../components/guards/admin'

const ReportsPage: NextPage = () => {
  return (
    <AdminGuard>
      <ReportsContextProvider>
        <Reports />
      </ReportsContextProvider>
    </AdminGuard>
  )
}

export default ReportsPage
