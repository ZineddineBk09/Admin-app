import { Driver, Sort } from '@/interfaces'
import { getRecords } from '@/lib/api'
import { searchDrivers } from '@/lib/search'
import { faker } from '@faker-js/faker'
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
    setLoading(true)
    // setDrivers([] as Driver[])
    const records = await getRecords('driver').then((res) =>
      res.data.map((driver: any) => driver[0])
    )
    console.log('records: ', records)
    setDrivers(
      records.map((driver: any) => ({
        id: driver.pk,
        username: driver.fields.username,
        firstName: driver.fields.first_name,
        lastName: driver.fields.last_name,
        email: driver.fields.email,
        team: ['team 01', 'team 02', 'team 03', 'team 04'][
          Math.floor(Math.random() * 4)
        ],
        status: ['available', 'inactive', 'busy'][
          Math.floor(Math.random() * 3)
        ],
        image: faker.image.avatar(),
        completedTasks: Math.floor(Math.random() * 100),
        inProgressTasks: Math.floor(Math.random() * 100),
        location: {
          latitude: 0,
          longitude: 0,
        },
        phone: driver.fields.phone_number,
        orders: Math.floor(Math.random() * 100),
      }))
    )
    setLoading(false)
    // setDrivers(drivers)
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
    const filteredDrivers = drivers.filter(
      (driver) => driver.team === team
    )
    setDrivers(filteredDrivers)
  }

  const handleSelectStatus = (status: string) => {
    if (status === '') {
      refreshDrivers()
      return
    }
    console.log('status: ', status)
    const filteredDrivers = drivers.filter(
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
        refreshDrivers,
      }}
    >
      {children}
    </DriversContext.Provider>
  )
}
