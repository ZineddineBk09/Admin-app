import dynamic from 'next/dynamic'
const OrdersList = dynamic(
  () =>
    import('../../../components/admin/orders/auto-cancel').then(
      (mod) => mod.OrdersPage
    ),
  {
    ssr: false,
    loading: () => <Loading />,
  }
)
import { AutoCancelledOrdersContextProvider } from '../../../context/admin/auto-cancelled-orders'
import { NextPage } from 'next'
import React from 'react'
import Loading from '../../../components/shared/loading'
import { DriversContextProvider } from '../../../context/admin/drivers'
import { AdminGuard } from '../../../components/guards/admin'

const AutoCanceledOrdersPage: NextPage = () => {
  return (
    <AdminGuard>
      <AutoCancelledOrdersContextProvider>
        <DriversContextProvider>
          <OrdersList />
        </DriversContextProvider>
      </AutoCancelledOrdersContextProvider>
    </AdminGuard>
  )
}

export default AutoCanceledOrdersPage
