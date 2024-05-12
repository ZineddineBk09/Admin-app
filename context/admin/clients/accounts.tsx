import { APIResponse, Account } from '../../../interfaces'
import React, { useEffect, useState } from 'react'
import { getRecords } from '../../../lib/api'
import axios from '../../../lib/axios'

export const ClientsAccountsContext = React.createContext({})

export const useClientsAccountsContext: {
  (): {
    accounts: Account[]
    loading: boolean
    hasMore: boolean
    isFetching: boolean
    fetchNextPage: () => Promise<void>
    refreshAccounts: () => Promise<void>
  }
} = () => React.useContext(ClientsAccountsContext as any)

export const ClientsAccountsContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [accounts, setAccounts] = useState<Account[]>([] as Account[])
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [loading, setLoading] = useState(true)

  const refreshAccounts = async () => {
    setLoading(true)
    const records: APIResponse = await getRecords('account')

    if (records.results) {
      setAccounts(records.results)
    }

    // check if there are more accounts we can fetch
    setHasMore(!!records.next)

    setLoading(false)
  }

  const fetchNextPage = async () => {
    if (isFetching || !hasMore) {
      return
    }

    setIsFetching(true)

    // next url will of format: /account/?limit=10&offset=10
    try {
      const response = await axios.get(
        `/account/?limit=10&offset=${accounts.length}`
      )
      const newAccounts = response.data.results
      setAccounts([...accounts, ...newAccounts])

      // check if there are more accounts we can fetch
      setHasMore(!!response.data.next)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setIsFetching(false)
    }
  }

  useEffect(() => {
    accounts.length === 0 && refreshAccounts()
  }, [])

  return (
    <ClientsAccountsContext.Provider
      value={{
        accounts,
        loading,
        hasMore,
        isFetching,
        fetchNextPage,
        refreshAccounts,
      }}
    >
      {children}
    </ClientsAccountsContext.Provider>
  )
}
