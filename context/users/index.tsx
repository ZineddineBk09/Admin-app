import { APIResponse, User, Currency } from '../../interfaces'
import React, { useEffect, useState } from 'react'
import { filterRecords, getRecords } from '../../lib/api'
import axios from '../../lib/axios'

export const UsersContext = React.createContext({})

export const useUsersContext: {
  (): {
    users: User[]
    loading: boolean
    hasMore: boolean
    isFetching: boolean
    fetchNextPage: () => Promise<void>
    refreshUsers: () => Promise<void>
  }
} = () => React.useContext(UsersContext as any)

export const UsersContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [users, setUsers] = useState<User[]>([] as User[])
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [loading, setLoading] = useState(true)

  const refreshUsers = async () => {
    setLoading(true)
    const records: APIResponse = await getRecords('user')
    console.log('response', records)
    setUsers(records.results)

    // check if there are more users we can fetch
    setHasMore(!!records.next)

    setLoading(false)
  }

  const fetchNextPage = async () => {
    if (isFetching || !hasMore) {
      return
    }

    setIsFetching(true)

    try {
      const response = await axios.get(`/user/?limit=10&offset=${users.length}`)

      const newUsers = response.data.results
      setUsers([...users, ...newUsers])

      // check if there are more users we can fetch
      setHasMore(!!response.data.next)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setIsFetching(false)
    }
  }

  useEffect(() => {
    refreshUsers()
  }, [])

  return (
    <UsersContext.Provider
      value={{
        users,
        loading,
        hasMore,
        isFetching,
        fetchNextPage,
        refreshUsers,
      }}
    >
      {children}
    </UsersContext.Provider>
  )
}
