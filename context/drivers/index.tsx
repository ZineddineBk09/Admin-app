import React, { useEffect, useState } from 'react'
import {
  APIResponse,
  Driver,
  DriverTeam,
  DriverType,
  Sort,
} from '../../interfaces'
import { getRecords } from '../../lib/api'
import { searchDrivers } from '../../lib/search'
import { faker } from '@faker-js/faker'
import axios from '../../lib/axios'

export const DriversContext = React.createContext({})

export const useDriversContext: {
  (): {
    drivers: Driver[]
    driverTypes: DriverType[]
    loading: boolean
    vehicleTypes: string[]
    hasMore: boolean
    isFetching: boolean
    fetchNextPage: () => Promise<void>
    handleSearchDrivers: (search: string) => void
    handleSortDrivers: (sort: Sort) => void
    handleSelectTeam: (team: string) => void
    handleSelectStatus: (status: string) => void
    refreshDrivers: () => Promise<void>
    refreshDriverTypes: () => Promise<void>
  }
} = () => React.useContext(DriversContext as any)

export const DriversContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [drivers, setDrivers] = useState<Driver[]>([] as Driver[])
  const [driverTypes, setDriverTypes] = useState<DriverType[]>(
    [] as DriverType[]
  )
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const vehicleTypes = [
    'car',
    'van',
    'motor',
    'taxi',
    'helicopter',
    'truck',
    'bicycle',
    'ship',
    'scooter',
  ]

  const refreshDrivers = async () => {
    setLoading(true)
    const records: APIResponse = await getRecords('driver')
    if (records.results) {
      setDrivers(records.results)
    }

    // check if there are more drivers we can fetch
    setHasMore(!!records.next)

    setLoading(false)
  }

  const refreshDriverTypes = async () => {
    const records = await getRecords('driver_type')

    // check if there are records
    if (records.results) {
      setDriverTypes(records.results)
    }
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
    const filteredDrivers = drivers.filter((driver) => driver?.team.id === team)
    setDrivers(filteredDrivers)
  }

  const handleSelectStatus = (status: string) => {
    if (status === '') {
      refreshDrivers()
      return
    }
    const filteredDrivers = drivers.filter(
      (driver) => driver?.status === status
    )
    setDrivers(filteredDrivers)
  }

  const fetchNextPage = async () => {
    if (isFetching || !hasMore) {
      return
    }

    setIsFetching(true)

    // next url will of format: /driver/?limit=10&offset=10
    try {
      const response = await axios.get(
        `/driver/?limit=10&offset=${drivers.length}`
      )
      const newDrivers = response.data.results
      setDrivers([...drivers, ...newDrivers])

      // check if there are more drivers we can fetch
      setHasMore(!!response.data.next)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setIsFetching(false)
    }
  }

  useEffect(() => {
    drivers.length === 0 && refreshDrivers()
    // refreshDriverTeams()
    driverTypes.length === 0 && refreshDriverTypes()
  }, [])

  return (
    <DriversContext.Provider
      value={{
        drivers,
        driverTypes,
        loading,
        vehicleTypes,
        hasMore,
        isFetching,
        fetchNextPage,
        handleSearchDrivers,
        handleSortDrivers,
        handleSelectTeam,
        handleSelectStatus,
        refreshDrivers,
        refreshDriverTypes,
      }}
    >
      {children}
    </DriversContext.Provider>
  )
}
