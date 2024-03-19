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
import { AreasCountriesContextProvider } from '../../context/areas/countries'
import { AreasGovernoratesContextProvider } from '../../context/areas/governorates'
import { AreasCitiesContextProvider } from '../../context/areas/cities'
import { ClientsBranchesContextProvider } from '../../context/clients/branches'

const OrdersPage: NextPage = () => {
  return (
    <Context>
      <OrdersList />
    </Context>
  )
}

const Context = ({ children }: { children: React.ReactNode }) => {
  return (
    <OrdersContextProvider>
      <AreasCountriesContextProvider>
        <AreasGovernoratesContextProvider>
          <AreasCitiesContextProvider>
            <ClientsBranchesContextProvider>
              {children}
            </ClientsBranchesContextProvider>
          </AreasCitiesContextProvider>
        </AreasGovernoratesContextProvider>
      </AreasCountriesContextProvider>
    </OrdersContextProvider>
  )
}

export default OrdersPage
