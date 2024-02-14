import { APIResponse, Governorate } from '../../interfaces'
import React, { useEffect, useState } from 'react'
import { filterRecords, getRecords } from '../../lib/api'
import axios from '../../lib/axios'

export const AreasGovernoratesContext = React.createContext({})

export const useAreasGovernoratesContext: {
  (): {
    governorates: Governorate[]
    loading: boolean
    hasMore: boolean
    isFetching: boolean
    fetchNextPage: () => Promise<void>
    refreshGovernorates: () => Promise<void>
    handleFilter: (countryId: string) => void
  }
} = () => React.useContext(AreasGovernoratesContext as any)

export const AreasGovernoratesContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [governorates, setGovernorates] = useState<Governorate[]>(
    [] as Governorate[]
  )
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [loading, setLoading] = useState(true)

  const refreshGovernorates = async () => {
    setLoading(true)
    const records: APIResponse = await getRecords('governorate')
    setGovernorates(records.results)
    setLoading(false)
  }

  const handleFilter = async (country: string) => {
    // check if the user selected 'all' countries
    if (country == 'all') {
      refreshGovernorates()
      return
    }

    // fetch governorates for the selected country
    const records: APIResponse = await filterRecords(
      { country__name: country },
      'governorate'
    )
    setGovernorates(records.results)

    // check if there are more governorates we can fetch
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
        `/governorate/?limit=10&offset=${governorates.length}`
      )
      const newGovernorates = response.data.results
      setGovernorates([...governorates, ...newGovernorates])

      // check if there are more governorates we can fetch
      setHasMore(!!response.data.next)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setIsFetching(false)
    }
  }

  useEffect(() => {
    refreshGovernorates()
  }, [])

  return (
    <AreasGovernoratesContext.Provider
      value={{
        governorates,
        loading,
        hasMore,
        isFetching,
        fetchNextPage,
        refreshGovernorates,
        handleFilter,
      }}
    >
      {children}
    </AreasGovernoratesContext.Provider>
  )
}
