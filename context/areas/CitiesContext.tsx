import { City } from '@/interfaces'
import React, { useEffect, useState } from 'react'

export const AreasCitiesContext = React.createContext({})

export const useAreasCitiesContext: any = () =>
  React.useContext(AreasCitiesContext)

export const AreasCitiesContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [cities, setCities] = useState<City[]>([] as City[])
  const countries = ['Saudi Arabia', 'United Arab Emirates', 'Egypt']
  const [loading, setLoading] = useState(true)

  const refreshCities = async () => {
    // setLoading(true)
    // setCities([] as City[])
    // const records = await fetchCities()
    // setCities(records)
    // setLoading(false)
    setCities([
      {
        id: '215351',
        name: 'البجيري - Al Bujairi',
        governorateId: '215351',
        governorateName: 'Riyadh',
        driverFee: 25,
        orderFee: 10,
      },
      {
        id: '215352',
        name: 'الروضة - Ar Rawdah',
        governorateId: '215352',
        governorateName: 'Jeddah',
        driverFee: 25,
        orderFee: 10,
      },
      {
        id: '215353',
        name: 'الروضة - Ar Rawdah',
        governorateId: '215353',
        governorateName: 'Riyadh',
        driverFee: 25,
        orderFee: 10,
      },
    ])
  }

  useEffect(() => {
    refreshCities()
  }, [])

  return (
    <AreasCitiesContext.Provider
      value={{
        cities,
        countries,
        loading,
      }}
    >
      {children}
    </AreasCitiesContext.Provider>
  )
}
