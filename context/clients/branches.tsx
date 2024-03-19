import { APIResponse, Branch } from '../../interfaces'
import React, { useEffect, useState } from 'react'
import { filterRecords, getRecords } from '../../lib/api'
import axios from '../../lib/axios'

export const ClientsBranchesContext = React.createContext({})

export const useClientsBranchesContext: {
  (): {
    branches: Branch[]
    loading: boolean
    hasMore: boolean
    isFetching: boolean
    fetchNextPage: () => Promise<void>
    refreshBranches: () => Promise<void>
    handleFilterClient: (client: string) => void
    handleFilterCountry: (country: string) => void
  }
} = () => React.useContext(ClientsBranchesContext as any)

export const ClientsBranchesContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [branches, setBranches] = useState<Branch[]>([] as Branch[])
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [loading, setLoading] = useState(true)

  const refreshBranches = async () => {
    setLoading(true)
    const records: APIResponse = await getRecords('branch')

    if (records.results) {
      setBranches(records.results)
    }

    // check if there are more branches we can fetch
    setHasMore(!!records.next)

    setLoading(false)
  }

  const handleFilterClient = async (client: string) => {
    // check if the user selected 'all' clients
    if (client == 'all') {
      refreshBranches()
      return
    }

    // fetch branches for the selected client
    const records: APIResponse = await filterRecords(
      { account__name: client },
      'branch'
    )

    if (records.results) {
      setBranches(records.results)
    }

    // check if there are more branches we can fetch
    setHasMore(!!records.next)

    setLoading(false)
  }

  const handleFilterCountry = async (country: string) => {
    if (country == 'all') {
      refreshBranches()
      return
    }

    const records: APIResponse = await filterRecords(
      { address_country__name: country },
      'branch'
    )

    if (records.results) {
      setBranches(records.results)
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
        `/branch/?limit=10&offset=${branches.length}`
      )
      const newBranches = response.data.results
      setBranches([...branches, ...newBranches])

      // check if there are more branches we can fetch
      setHasMore(!!response.data.next)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setIsFetching(false)
    }
  }

  useEffect(() => {
   branches.length === 0 && refreshBranches()
  }, [])

  return (
    <ClientsBranchesContext.Provider
      value={{
        branches,
        loading,
        hasMore,
        isFetching,
        fetchNextPage,
        refreshBranches,
        handleFilterClient,
        handleFilterCountry,
      }}
    >
      {children}
    </ClientsBranchesContext.Provider>
  )
}
