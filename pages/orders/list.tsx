// import { OrdersPage as OrdersList } from '../../components/orders'
import dynamic from 'next/dynamic'
const OrdersList = dynamic(
  () => import('../../components/orders/list').then((mod) => mod.OrdersPage),
  {
    ssr: false,
    loading: () => <Loading />,
  }
)
import { OrdersContextProvider } from '../../context/orders'
import { NextPage } from 'next'
import React from 'react'
import Loading from '../../components/shared/loading'

const OrdersPage: NextPage = () => {
  return (
    <OrdersContextProvider>
      <OrdersList />
    </OrdersContextProvider>
  )
}

export default OrdersPage
