import { ClientsReport } from '@/interfaces'
import { getRecords } from '@/lib/api'
import { searchOrders } from '@/lib/search'
import { faker } from '@faker-js/faker'
import React, { useEffect, useState } from 'react'

export const ReportsContext = React.createContext({})

export const useReportsContext: any = () => React.useContext(ReportsContext)

export const ReportsContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [reports, setReports] = useState<ClientsReport[]>([] as ClientsReport[])
  const [loading, setLoading] = useState(false)

  const refreshOrders = async () => {
    setLoading(true)
    // setReports([] as Order[])
    const records = Array.from(
      { length: 10 },
      () =>
        ({
          id: faker.number
            .int({
              max: 10000,
            })
            .toString(),
          client: faker.company.name(),
          clientName: faker.person.fullName(),
          clientPhone: faker.phone.number(),
          clientEmail: faker.internet.email(),
          paid: faker.finance.amount(),
          unpaid: faker.finance.amount(),
          branches: ['Branch 1', 'Branch 2'],
          areas: ['Area 1', 'Area 2'],
          countries: ['Country 1', 'Country 2'],
          orders: faker.datatype.number(),
          canceledOrders: faker.datatype.number(),
        } as any)
    )

    setReports(records)

    setLoading(false)
    // setReports(reports)
  }

  const handleSearchOrders = (search: string) => {
    if (search === '') {
      refreshOrders()
      return
    }
    // search inside reports array
    const filteredOrders: any = searchOrders(reports, search)
    setReports(filteredOrders)
  }

  useEffect(() => {
    refreshOrders()
  }, [])

  return (
    <ReportsContext.Provider
      value={{
        reports,
        loading,
        handleSearchOrders,
        refreshOrders,
      }}
    >
      {children}
    </ReportsContext.Provider>
  )
}
