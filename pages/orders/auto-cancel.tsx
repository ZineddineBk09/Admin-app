import dynamic from 'next/dynamic'
const OrdersList = dynamic(
  () =>
    import('../../components/orders/auto-cancel').then((mod) => mod.OrdersPage),
  {
    ssr: false,
    loading: () => <Loading />,
  }
)
import { AutoCancelledOrdersContextProvider } from '../../context/auto-cancelled-orders'
import { NextPage } from 'next'
import React from 'react'
import Loading from '../../components/shared/loading'
import { DriversContextProvider } from '../../context/drivers'

const AutoCanceledOrdersPage: NextPage = () => {
  return (
    <AutoCancelledOrdersContextProvider>
      <DriversContextProvider>
        <OrdersList />
      </DriversContextProvider>
    </AutoCancelledOrdersContextProvider>
  )
}

export default AutoCanceledOrdersPage
