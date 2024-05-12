import dynamic from 'next/dynamic'
import { OrdersContextProvider } from '../../../context/client/orders'
import { NextPage } from 'next'
import React from 'react'
import { AreasCountriesContextProvider } from '../../../context/admin/areas/countries'
import { AreasGovernoratesContextProvider } from '../../../context/admin/areas/governorates'
import { AreasCitiesContextProvider } from '../../../context/admin/areas/cities'
import { ClientsBranchesContextProvider } from '../../../context/admin/clients/branches'
import { ClientGuard } from '../../../components/guards/client'
import { ClientOrderPage } from '../../../components/client/orders'

const OrdersPage: NextPage = () => {
  return (
    <Context>
      <ClientOrderPage />
    </Context>
  )
}

const Context = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClientGuard>
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
    </ClientGuard>
  )
}

export default OrdersPage
