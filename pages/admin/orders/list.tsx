// import { OrdersPage as OrdersList } from '../../components/orders'
import dynamic from 'next/dynamic'
const OrdersList = dynamic(
  () =>
    import('../../../components/admin/orders/list').then(
      (mod) => mod.OrdersPage
    ),
  {
    ssr: false,
    loading: () => <Loading />,
  }
)
import { OrdersContextProvider } from '../../../context/admin/orders'
import { NextPage } from 'next'
import React from 'react'
import Loading from '../../../components/shared/loading'
import { AreasCountriesContextProvider } from '../../../context/admin/areas/countries'
import { AreasGovernoratesContextProvider } from '../../../context/admin/areas/governorates'
import { AreasCitiesContextProvider } from '../../../context/admin/areas/cities'
import { ClientsBranchesContextProvider } from '../../../context/admin/clients/branches'
import { AdminGuard } from '../../../components/guards/admin'

const OrdersPage: NextPage = () => {
  return (
    <Context>
      <OrdersList />
    </Context>
  )
}

const Context = ({ children }: { children: React.ReactNode }) => {
  return (
    <AdminGuard>
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
    </AdminGuard>
  )
}

export default OrdersPage
