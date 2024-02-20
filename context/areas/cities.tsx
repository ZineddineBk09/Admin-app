import { APIResponse, City } from '../../interfaces'
import React, { useEffect, useState } from 'react'
import { filterRecords, getRecords } from '../../lib/api'
import axios from '../../lib/axios'

export const AreasCitiesContext = React.createContext({})

export const useAreasCitiesContext: {
  (): {
    cities: City[]
    loading: boolean
    hasMore: boolean
    isFetching: boolean
    fetchNextPage: () => Promise<void>
    refreshCities: () => Promise<void>
    handleFilterCountry: (countryId: string) => void
    handleFilterGovernorate: (governorateId: string) => void
  }
} = () => React.useContext(AreasCitiesContext as any)

export const AreasCitiesContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [cities, setCities] = useState<City[]>([] as City[])
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [loading, setLoading] = useState(true)

  const refreshCities = async () => {
    setLoading(true)
    const records: APIResponse = await getRecords('city')

    if (records.results) {
      setCities(records.results)
    }

    // check if there are more cities we can fetch
    setHasMore(!!records.next)

    setLoading(false)
  }

  const handleFilterCountry = async (country: string) => {
    // check if the user selected 'all' countries
    if (country == 'all') {
      refreshCities()
      return
    }

    // fetch cities for the selected country
    const records: APIResponse = await filterRecords(
      { governorate__country__name: country },
      'city'
    )

    if (records.results) {
      setCities(records.results)
    }

    // check if there are more cities we can fetch
    setHasMore(!!records.next)

    setLoading(false)
  }

  const handleFilterGovernorate = async (governorate: string) => {
    if (governorate == 'all') {
      refreshCities()
      return
    }

    const records: APIResponse = await filterRecords(
      { governorate__name: governorate },
      'city'
    )
    
    if (records.results) {
      setCities(records.results)
    }

    setHasMore(!!records.next)

    setLoading(false)
  }

  const fetchNextPage = async () => {
    if (isFetching || !hasMore) {
      return
    }

    setIsFetching(true)

    // next url will of format: /city/?limit=10&offset=10
    try {
      const response = await axios.get(
        `/city/?limit=10&offset=${cities.length}`
      )
      const newCities = response.data.results
      setCities([...cities, ...newCities])

      // check if there are more cities we can fetch
      setHasMore(!!response.data.next)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setIsFetching(false)
    }
  }

  useEffect(() => {
    refreshCities()
  }, [])

  return (
    <AreasCitiesContext.Provider
      value={{
        cities,
        loading,
        hasMore,
        isFetching,
        fetchNextPage,
        refreshCities,
        handleFilterCountry,
        handleFilterGovernorate,
      }}
    >
      {children}
    </AreasCitiesContext.Provider>
  )
}
