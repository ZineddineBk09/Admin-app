import { ClientsReport } from '../../../interfaces'
import { searchReports } from '../../../lib/search'
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

  const refreshReports = async () => {
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
          orders: faker.number.int({
            max: 10000,
          }),
          canceledOrders: faker.number.int({
            max: 100,
          }),
        } as any)
    )

    setReports(records)

    setLoading(false)
    // setReports(reports)
  }

  const handleSearchReports = (search: string) => {
    if (search === '') {
      refreshReports()
      return
    }
    // search inside reports array
    const filteredReports: any = searchReports(reports, search)
    setReports(filteredReports)
  }

  useEffect(() => {
    refreshReports()
  }, [])

  return (
    <ReportsContext.Provider
      value={{
        reports,
        loading,
        handleSearchReports,
        refreshReports,
      }}
    >
      {children}
    </ReportsContext.Provider>
  )
}
