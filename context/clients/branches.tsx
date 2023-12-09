import { Branch } from '@/interfaces'
import { searchBranches } from '@/lib/search'
import React, { useEffect, useState } from 'react'
import { faker } from '@faker-js/faker'

export const ClientsBranchesContext = React.createContext({})

export const useClientsBranchesContext: any = () =>
  React.useContext(ClientsBranchesContext)

export const ClientsBranchesContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [branches, setBranches] = useState<Branch[]>([] as Branch[])
  const [countries, setCountries] = useState<string[]>([] as string[])
  const [clientAccounts, setClientAccounts] = useState<string[]>([] as string[])
  const [loading, setLoading] = useState(true)

  const refreshBranches = async () => {
    // setLoading(true)
    // setBranches([] as Branch[])
    // const records = await fetchBranches()
    // setBranches(records)
    // setLoading(false)
    const rows: Branch[] = []

    for (let i = 0; i < 5; i++) {
      rows.push({
        id: faker.number.bigInt().toString(),
        name: faker.company.name(),
        country: faker.location.country(),
        governorate: faker.location.state(),
        city: faker.location.city(),
        customOrderFee: faker.number.float(),
        customDriverFee: faker.number.float(),
        phone: faker.phone.number(),
        supervisor: faker.person.firstName(),
        clientAccount: faker.company.name(),
        location: {
          latitude: faker.location.latitude({ max: 22, min: 21 }),
          longitude: faker.location.longitude({
            max: 40,
            min: 39,
          }),
        },
      })
    }
    setBranches(rows)
    setCountries(
      rows
        .map((branch: Branch) => branch.country)
        .filter((v, i, a) => a.indexOf(v) === i)
    )
    setClientAccounts(
      rows
        .map((branch: Branch) => branch.clientAccount)
        .filter((v, i, a) => a.indexOf(v) === i)
    )
  }

  const handleSearchBranches = (search: string) => {
    if (search === '') {
      refreshBranches()
      return
    }
    // search inside branches array
    const filteredBranches: any = searchBranches(branches, search)
    setBranches(filteredBranches)
  }

  useEffect(() => {
    refreshBranches()
  }, [])

  return (
    <ClientsBranchesContext.Provider
      value={{
        branches,
        countries,
        clientAccounts,
        loading,
        handleSearchBranches,
      }}
    >
      {children}
    </ClientsBranchesContext.Provider>
  )
}
