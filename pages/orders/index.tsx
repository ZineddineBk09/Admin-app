import { OrdersPage } from '@/components/orders'
import { OrdersContextProvider } from '@/context/order/OrdersContext'
import { NextPage } from 'next'
import React from 'react'

const Orders: NextPage = () => {
  return (
    <OrdersContextProvider>
      <OrdersPage />
    </OrdersContextProvider>
  )
}

export default Orders
