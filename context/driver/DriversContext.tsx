import { driversTableRows } from '@/components/table/data'
import { Driver, Sort } from '@/interfaces'
import { searchDrivers } from '@/lib/search'
import React, { useEffect, useState } from 'react'

export const DriversContext = React.createContext({})

export const useDriversContext: any = () => React.useContext(DriversContext)

export const DriversContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [drivers, setDrivers] = useState<Driver[]>([] as Driver[])
  const [loading, setLoading] = useState(false)

  const refreshDrivers = async () => {
    // setLoading(true)
    // setDrivers([] as Driver[])
    // const records = await fetchDrivers()
    // setDrivers(records)
    // setLoading(false)
    setDrivers(driversTableRows)
  }

  const handleSearchDrivers = (search: string) => {
    if (search === '') {
      refreshDrivers()
      return
    }
    // search inside drivers array
    const filteredDrivers: any = searchDrivers(drivers, search)
    setDrivers(filteredDrivers)
  }

  const handleSortDrivers = (sort: Sort) => {
    const { column, direction } = sort


    const sortedDrivers = drivers.slice().sort((a: any, b: any) => {
      if (a[column] < b[column]) {
        return direction === 'ascending' ? -1 : 1
      }
      if (a[column] > b[column]) {
        return direction === 'ascending' ? 1 : -1
      }
      return 0
    })

    setDrivers(sortedDrivers)
  }

  const handleSelectTeam = (team: string) => {
    if (team === '') {
      refreshDrivers()
      return
    }
    const filteredDrivers = driversTableRows.filter(
      (driver) => driver.team === team
    )
    setDrivers(filteredDrivers)
  }

  const handleSelectStatus = (status: string) => {
    if (status === '') {
      refreshDrivers()
      return
    }
    const filteredDrivers = driversTableRows.filter(
      (driver) => driver.status === status
    )
    setDrivers(filteredDrivers)
  }

  useEffect(() => {
    refreshDrivers()
  }, [])

  return (
    <DriversContext.Provider
      value={{
        drivers,
        loading,
        handleSearchDrivers,
        handleSortDrivers,
        handleSelectTeam,
        handleSelectStatus,
      }}
    >
      {children}
    </DriversContext.Provider>
  )
}
