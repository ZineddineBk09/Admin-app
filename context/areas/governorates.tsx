import { Governorate } from '@/interfaces'
import React, { useEffect, useState } from 'react'

export const AreasGovernoratesContext = React.createContext({})

export const useAreasGovernoratesContext: any = () =>
  React.useContext(AreasGovernoratesContext)

export const AreasGovernoratesContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [governorates, setGovernorates] = useState<Governorate[]>(
    [] as Governorate[]
  )
  const countries = ['Saudi Arabia', 'United Arab Emirates', 'Egypt']
  const [loading, setLoading] = useState(true)

  const refreshGovernorates = async () => {
    // setLoading(true)
    // setGovernorates([] as Governorate[])
    // const records = await fetchGovernorates()
    // setGovernorates(records)
    // setLoading(false)
    setGovernorates([
      {
        id: '215351',
        name: 'Riyadh',
        countryId: '215351',
        countryName: 'Saudi Arabia',
        driverFee: 25,
        orderFee: 10,
      },
      {
        id: '215352',
        name: 'Dubai',
        countryId: '215352',
        countryName: 'United Arab Emirates',
        driverFee: 25,
        orderFee: 10,
      },
      {
        id: '215353',
        name: 'Jeddah',
        countryId: '215353',
        countryName: 'Saudi Arabia',
        driverFee: 25,
        orderFee: 10,
      },
    ])
  }

  useEffect(() => {
    refreshGovernorates()
  }, [])

  return (
    <AreasGovernoratesContext.Provider
      value={{
        governorates,
        countries,
        loading,
      }}
    >
      {children}
    </AreasGovernoratesContext.Provider>
  )
}
