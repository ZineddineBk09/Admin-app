import { Account } from '@/interfaces'
import { searchAccounts } from '@/lib/search'
import React, { useEffect, useState } from 'react'

export const ClientsAccountsContext = React.createContext({})

export const useClientsAccountsContext: any = () =>
  React.useContext(ClientsAccountsContext)

export const ClientsAccountsContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [accounts, setAccounts] = useState<Account[]>([] as Account[])
  const [loading, setLoading] = useState(true)

  const refreshAccounts = async () => {
    // setLoading(true)
    // setAccounts([] as Account[])
    // const records = await fetchAccounts()
    // setAccounts(records)
    // setLoading(false)
    setAccounts([
      {
        id: '215351',
        name: 'McDonalds',
        city: 'Riyadh',
        discount: 10,
        website: 'https://www.mcdonalds.com',
        phone: '920000000',
      },
      {
        id: '215352',
        name: 'Burger King',
        city: 'Riyadh',
        discount: 10,
        website: 'https://www.burgerking.com',
        phone: '920000000',
      },
    ])
  }

  const handleSearchAccounts = (search: string) => {
    if (search === '') {
      refreshAccounts()
      return
    }
    // search inside accounts array
    const filteredAccounts: any = searchAccounts(accounts, search)
    setAccounts(filteredAccounts)
  }

  useEffect(() => {
    refreshAccounts()
  }, [])

  return (
    <ClientsAccountsContext.Provider
      value={{
        accounts,
        loading,
        handleSearchAccounts,
      }}
    >
      {children}
    </ClientsAccountsContext.Provider>
  )
}
