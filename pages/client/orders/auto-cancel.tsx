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
import { ClientGuard } from '../../../components/guards/client'

const AutoCanceledOrdersPage: NextPage = () => {
  return (
    <ClientGuard>
      <AutoCancelledOrdersContextProvider>
        <DriversContextProvider>
          <OrdersList />
        </DriversContextProvider>
      </AutoCancelledOrdersContextProvider>
    </ClientGuard>
  )
}

export default AutoCanceledOrdersPage
