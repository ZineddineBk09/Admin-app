import { APIResponse, Country, Currency } from '../../interfaces'
import React, { useEffect, useState } from 'react'
import { filterRecords, getRecords } from '../../lib/api'
import axios from '../../lib/axios'

export const AreasCountriesContext = React.createContext({})

export const useAreasCountriesContext: {
  (): {
    countries: Country[]
    currencies: Currency[]
    loading: boolean
    hasMore: boolean
    isFetching: boolean
    fetchNextPage: () => Promise<void>
    refreshCountries: () => Promise<void>
    refreshCurrencies: () => Promise<void>
  }
} = () => React.useContext(AreasCountriesContext as any)

export const AreasCountriesContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [countries, setCountries] = useState<Country[]>([] as Country[])
  const [currencies, setCurrencies] = useState<Currency[]>([] as Currency[])
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [loading, setLoading] = useState(true)

  const refreshCountries = async () => {
    setLoading(true)
    const records: APIResponse = await getRecords('country')

    if (records.results) {
      setCountries(records.results)
    }

    // check if there are more cities we can fetch
    setHasMore(!!records.next)

    setLoading(false)
  }

  const refreshCurrencies = async () => {
    setLoading(true)
    const records: APIResponse = await getRecords('currency')

    if (records.results) {
      setCurrencies(records.results)
    }

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
        `/country/?limit=10&offset=${countries.length}`
      )
      const newCountries = response.data.results
      setCountries([...countries, ...newCountries])

      // check if there are more countries we can fetch
      setHasMore(!!response.data.next)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setIsFetching(false)
    }
  }

  useEffect(() => {
    countries.length === 0 && refreshCountries()
    currencies.length === 0 && refreshCurrencies()
  })

  return (
    <AreasCountriesContext.Provider
      value={{
        countries,
        currencies,
        loading,
        hasMore,
        isFetching,
        fetchNextPage,
        refreshCountries,
        refreshCurrencies,
      }}
    >
      {children}
    </AreasCountriesContext.Provider>
  )
}
