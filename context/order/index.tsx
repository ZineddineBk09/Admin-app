import { Order, Sort } from '@/interfaces'
import { getRecords } from '@/lib/api'
import { searchOrders } from '@/lib/search'
import { faker } from '@faker-js/faker'
import React, { useEffect, useState } from 'react'

export const OrdersContext = React.createContext({})

export const useOrdersContext: any = () => React.useContext(OrdersContext)

export const OrdersContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [orders, setOrders] = useState<Order[]>([] as Order[])
  const [loading, setLoading] = useState(false)

  const refreshOrders = async () => {
    setLoading(true)
    // setOrders([] as Order[])
    const records = Array.from(
      { length: 10 },
      () =>
        ({
          id: faker.number
            .int({
              max: 10000,
            })
            .toString(),
          date: faker.date.past().toLocaleDateString(),
          time: new Date().toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
          }),
          client: faker.number
            .int({
              max: 10000,
            })
            .toString(),
          clientName: faker.company.name(),
          driver: faker.string.uuid(),
          driverName: faker.person.fullName(),
          distance: faker.number.int({
            max: 100,
            min: 1,
          }),
          city: faker.location.city(),
          value: faker.number.int({
            max: 1000,
            min: 50,
          }),
          deliveryFee: 25,
          status: ['done', 'canceled', 'delivering'][
            faker.number.int({ min: 0, max: 2 })
          ],
          isPaid: faker.datatype.boolean(),
          location: {
            latitude: faker.location.latitude(),
            longitude: faker.location.longitude(),
          },
          address: faker.location.streetAddress(),
          phone: faker.phone.number(),
          items: [
            {
              id: faker.number.int().toString(),
              name: faker.commerce.productName(),
              quantity: faker.number.int({ min: 1, max: 10 }),
            },
          ],
        } as Order)
    )

    setOrders(records)

    setLoading(false)
    // setOrders(orders)
  }

  const handleSearchOrders = (search: string) => {
    if (search === '') {
      refreshOrders()
      return
    }
    // search inside orders array
    const filteredOrders: any = searchOrders(orders, search)
    setOrders(filteredOrders)
  }

  const handleSortOrders = (sort: Sort) => {
    const { column, direction } = sort

    const sortedOrders = orders.slice().sort((a: any, b: any) => {
      if (a[column] < b[column]) {
        return direction === 'ascending' ? -1 : 1
      }
      if (a[column] > b[column]) {
        return direction === 'ascending' ? 1 : -1
      }
      return 0
    })

    setOrders(sortedOrders)
  }

  const handleSelectStatus = (status: string) => {
    if (status === '') {
      refreshOrders()
      return
    }
    console.log('status: ', status)
    const filteredOrders = orders.filter((driver) => driver.status === status)
    setOrders(filteredOrders)
  }

  const handleSelectDate = ({
    dateFrom,
    dateTo,
  }: {
    dateFrom: Date
    dateTo: Date
  }) => {
    if (dateFrom === null || dateTo === null) {
      refreshOrders()
      return
    }
    const filteredOrders = orders.filter(
      (order) =>
        new Date(order.date).getTime() >= dateFrom.getTime() &&
        new Date(order.date).getTime() <= dateTo.getTime()
    )
    setOrders(filteredOrders)
  }

  useEffect(() => {
    refreshOrders()
  }, [])

  return (
    <OrdersContext.Provider
      value={{
        orders,
        loading,
        handleSearchOrders,
        handleSortOrders,
        handleSelectStatus,
        refreshOrders,
      }}
    >
      {children}
    </OrdersContext.Provider>
  )
}
