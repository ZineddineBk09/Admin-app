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

export const DriversContext = React.createContext({})

export const useDriversContext: {
  (): {
    drivers: Driver[]
    teams: DriverTeam[]
    driverTypes: DriverType[]
    loading: boolean
    handleSearchDrivers: (search: string) => void
    handleSortDrivers: (sort: Sort) => void
    handleSelectTeam: (team: string) => void
    handleSelectStatus: (status: string) => void
    refreshDrivers: () => Promise<void>
    refreshDriverTeams: () => Promise<void>
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
  const [teams, setTeams] = useState<DriverTeam[]>([] as DriverTeam[])
  const [loading, setLoading] = useState(false)

  const refreshDrivers = async () => {
    setLoading(true)
    // setDrivers([] as Driver[])
    const records = await getRecords('driver').then((res) => res.data)

    setDrivers(
      records?.map(
        (driver: any): Driver => ({
          id: driver.pk,
          username: driver.fields.username,
          firstName: driver.fields.first_name,
          lastName: driver.fields.last_name,
          email: driver.fields.email,
          team: driver.fields.team_id,
          status: ['available', 'inactive', 'busy'][
            Math.floor(Math.random() * 3)
          ],
          image: faker.image.avatar(),
          completedTasks: Math.floor(Math.random() * 100),
          inProgressTasks: Math.floor(Math.random() * 100),
          location: {
            latitude: driver.fields.latitude,
            longitude: driver.fields.longitude,
          },
          phone: driver.fields.phone_number,
          orders: Math.floor(Math.random() * 100),
          vehicleId: driver.fields.vehicle_id,
          vehicleType: driver.fields.vehicle_type,
          vehicleLicense: driver.fields.vehicle_license,
          residencyId: driver.fields.residency_id,
          isFreelance: driver.fields.is_freelancer,
          isActive: driver.fields.is_active,
          isStaff: driver.fields.is_staff,
          code: driver.fields.code,
          salary: driver.fields.salary || 0,
          areas: driver.fields.areas || ['area 1', 'area 2', 'area 3'],
          city: driver.fields.city || 'city',
        })
      )
    )
    setLoading(false)
    // setDrivers(drivers)
  }

  const refreshDriverTeams = async () => {
    const records = await getRecords('team').then((res) =>
      res.teams.map((team: any) => ({
        id: team.id,
        name: team.name,
        fixed: team.fixed,
        pricePerKm: team.price_per_km,
        additional: team.additional,
        maxDistance: team.max_distance,
        areas: team.areas,
        city: team.city,
        country: team.country,
        members: team.members,
        supervisor: {
          id: faker.number.int({ min: 1, max: 100 }),
          name: faker.person.fullName(),
        },
      }))
    )

    // const records: DriverTeam[] = Array.from({ length: 5 }, (_, i) => ({
    //   id: i,
    //   name: 'Team ' + i,
    //   members: Array.from({ length: 5 }, (_, i) => ({
    //     id: i,
    //     name: faker.person.fullName(),
    //   })),
    //   supervisor: {
    //     id: i,
    //     name: faker.person.fullName(),
    //   },
    //   fixed: faker.number.int({ min: 5, max: 100 }),
    //   pricePerKm: faker.number.int({ min: 5, max: 100 }),
    //   additional: faker.number.int({ min: 5, max: 100 }),
    //   maxDistance: faker.number.int({ min: 5, max: 100 }),
    //   areas: Array.from({ length: 3 }, (_, i) => 'area ' + i),
    //   city: faker.location.city(),
    //   country: faker.location.country(),
    // }))

    setTeams(records)
  }

  const refreshDriverTypes = async () => {
    const records = await getRecords('driver_type').then((res: APIResponse) => {
      return res.results
    })
    // check if there are records
    if (records) {
      setDriverTypes(records)
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
    const filteredDrivers = drivers.filter((driver) => driver.team === team)
    setDrivers(filteredDrivers)
  }

  const handleSelectStatus = (status: string) => {
    if (status === '') {
      refreshDrivers()
      return
    }
    const filteredDrivers = drivers.filter((driver) => driver.status === status)
    setDrivers(filteredDrivers)
  }

  useEffect(() => {
    // refreshDrivers()
    // refreshDriverTeams()
    refreshDriverTypes()
  }, [])

  return (
    <DriversContext.Provider
      value={{
        drivers,
        teams,
        driverTypes,
        loading,
        handleSearchDrivers,
        handleSortDrivers,
        handleSelectTeam,
        handleSelectStatus,
        refreshDrivers,
        refreshDriverTeams,
        refreshDriverTypes,
      }}
    >
      {children}
    </DriversContext.Provider>
  )
}
