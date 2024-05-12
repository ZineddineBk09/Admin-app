import { APIResponse, Team, Currency } from '../../../interfaces'
import React, { useEffect, useState } from 'react'
import { filterRecords, getRecords } from '../../../lib/api'
import axios from '../../../lib/axios'

export const TeamsContext = React.createContext({})

export const useTeamsContext: {
  (): {
    teams: Team[]
    currencies: Currency[]
    loading: boolean
    hasMore: boolean
    isFetching: boolean
    fetchNextPage: () => Promise<void>
    refreshTeams: () => Promise<void>
    handleFilterCountry: (country: string) => Promise<void>
  }
} = () => React.useContext(TeamsContext as any)

export const TeamsContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [teams, setTeams] = useState<Team[]>([] as Team[])
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [loading, setLoading] = useState(true)

  const refreshTeams = async () => {
    setLoading(true)
    const records: APIResponse = await getRecords('team')
    
    if (records.results) {
      setTeams(records.results)
    }

    // check if there are more teams we can fetch
    setHasMore(!!records.next)

    setLoading(false)
  }

  const fetchNextPage = async () => {
    if (isFetching || !hasMore) {
      return
    }

    setIsFetching(true)

    try {
      const response = await axios.get(`/team/?limit=10&offset=${teams.length}`)
      const newTeams = response.data.results
      setTeams([...teams, ...newTeams])

      // check if there are more teams we can fetch
      setHasMore(!!response.data.next)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setIsFetching(false)
    }
  }

  const handleFilterCountry = async (country: string) => {
    // check if the user selected 'all' countries
    if (country == 'all') {
      refreshTeams()
      return
    }

    // fetch cities for the selected country
    const records: APIResponse = await filterRecords(
      { city__governorate__country__name: country },
      'team'
    )
    
    if (records.results) {
      setTeams(records.results)
    }

    // check if there are more cities we can fetch
    setHasMore(!!records.next)

    setLoading(false)
  }

  useEffect(() => {
    refreshTeams()
  }, [])

  return (
    <TeamsContext.Provider
      value={{
        teams,
        loading,
        hasMore,
        isFetching,
        fetchNextPage,
        refreshTeams,
        handleFilterCountry,
      }}
    >
      {children}
    </TeamsContext.Provider>
  )
}
