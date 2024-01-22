import { AutoCancelledOrder, Sort } from '@/interfaces'
import { searchAutoCancelledOrders } from '@/lib/search'
import { faker } from '@faker-js/faker'
import React, { useEffect, useState } from 'react'

export const AutoCancelledOrdersContext = React.createContext({})

export const useAutoCancelledOrdersContext: {
  (): {
    enabled: boolean

    autoCancelledOrders: AutoCancelledOrder[]
    loading: boolean
    handleSearchAutoCancelledOrders: (search: string) => void
    handleSortAutoCancelledOrders: (sort: Sort) => void
    refreshAutoCancelledOrders: () => Promise<void>
    handleEnableAutoCancelledOrders: () => void
  }
} = () => React.useContext(AutoCancelledOrdersContext as any)

export const AutoCancelledOrdersContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [enabled, setEnabled] = useState<boolean>(false)
  const [autoCancelledOrders, setAutoCancelledOrders] = useState<
    AutoCancelledOrder[]
  >([] as AutoCancelledOrder[])
  const [loading, setLoading] = useState(false)

  const refreshAutoCancelledOrders = async () => {
    setLoading(true)
    // setAutoCancelledOrders([] as Order[])
    const records = Array.from(
      { length: 10 },
      () =>
        ({
          id: faker.number.int({ min: 1000, max: 10000 }).toString(),
          date: faker.date.past().toLocaleDateString(),
          value: faker.number.int({ max: 1000, min: 0 }),
          client: {
            name: faker.company.name(),
            id: faker.string.uuid(),
            image: faker.image.url(),
            address: faker.location.streetAddress(),
            phone: faker.phone.number(),
          },
          customer: {
            id: faker.string.uuid(),
            name: faker.person.firstName(),
            image: faker.image.avatar(),
            address: faker.location.streetAddress(),
            phone: faker.phone.number(),
          },
          deliveryFee: faker.number.int({ max: 100, min: 0 }),
          distance: faker.number.int(),
          time: faker.date.past().toLocaleTimeString(),
          city: faker.location.city(),
          timeLeft: faker.number.int({ max: 100, min: 0 }),
          location: {
            latitude: faker.location.latitude({ max: 22, min: 21 }),
            longitude: faker.location.longitude({
              max: 40,
              min: 39,
            }),
          },
          paymentType: ['cash', 'visa', 'mastercard'][faker.number.int({ max: 2, min: 0 })],
          items: Array.from(
            { length: faker.number.int({ max: 5, min: 1 }) },
            () => ({
              id: faker.number.int({ min: 1000, max: 10000 }).toString(),
              name: faker.commerce.productName(),
              quantity: faker.number.int({ max: 5, min: 1 }),
            })
          ),
        } as unknown as AutoCancelledOrder)
    )

    setAutoCancelledOrders(records)

    setLoading(false)
    // setAutoCancelledOrders(autoCancelledOrders)
  }

  const handleSearchAutoCancelledOrders = (search: string) => {
    if (search === '') {
      refreshAutoCancelledOrders()
      return
    }
    // search inside autoCancelledOrders array
    const filteredAutoCancelledOrders: any = searchAutoCancelledOrders(
      autoCancelledOrders,
      search
    )
    setAutoCancelledOrders(filteredAutoCancelledOrders)
  }

  const handleSortAutoCancelledOrders = (sort: Sort) => {
    const { column, direction } = sort

    const sortedAutoCancelledOrders = autoCancelledOrders
      .slice()
      .sort((a: any, b: any) => {
        if (a[column] < b[column]) {
          return direction === 'ascending' ? -1 : 1
        }
        if (a[column] > b[column]) {
          return direction === 'ascending' ? 1 : -1
        }
        return 0
      })

    setAutoCancelledOrders(sortedAutoCancelledOrders)
  }

  const handleEnableAutoCancelledOrders = () => {
    setEnabled(!enabled)
  }

  useEffect(() => {
    refreshAutoCancelledOrders()
  }, [])

  return (
    <AutoCancelledOrdersContext.Provider
      value={{
        enabled,
        autoCancelledOrders,
        loading,
        handleSearchAutoCancelledOrders,
        handleSortAutoCancelledOrders,
        refreshAutoCancelledOrders,
        handleEnableAutoCancelledOrders,
      }}
    >
      {children}
    </AutoCancelledOrdersContext.Provider>
  )
}
