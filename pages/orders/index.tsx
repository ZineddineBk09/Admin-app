import { OrdersPage as OrdersList } from '@/components/orders'
import { OrdersContextProvider } from '@/context/order'
import { NextPage } from 'next'
import React from 'react'

const OrdersPage: NextPage = () => {
  return (
    <OrdersContextProvider>
      <OrdersList />
    </OrdersContextProvider>
  )
}

export default OrdersPage
