import { Order, Sort, Status } from '../../interfaces'
import { getRecords } from '../../lib/api'
import { searchOrders } from '../../lib/search'
import { faker } from '@faker-js/faker'
import React, { useEffect, useState } from 'react'

export const OrdersContext = React.createContext({})

export const useOrdersContext: {
  (): {
    orders: Order[]
    filteredOrders: Order[]
    loading: boolean
    handleSearchOrders: (search: string) => void
    handleSortOrders: (sort: Sort) => void
    handleSelectStatus: (status: string) => void
    handleSelectDate: ({
      dateFrom,
      dateTo,
    }: {
      dateFrom: Date
      dateTo: Date
    }) => void
    handleSelectPaymentType: (paymentType: string) => void
    refreshOrders: () => Promise<void>
  }
} = () => React.useContext(OrdersContext as any)

export const OrdersContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [orders, setOrders] = useState<Order[]>([] as Order[])
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([] as Order[])
  const [loading, setLoading] = useState(false)
  const [orderStatus, setOrderStatus] = useState<Status[]>([
    { value: 'assigned', checked: true },
    { value: 'cancelled', checked: true },
    { value: 'new', checked: true },
    { value: 'done', checked: true },
  ])

  const refreshOrders = async () => {
    setLoading(true)
    // setOrders([] as Order[])
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
          duration: faker.number.int(),
          startTime: faker.date.past().getTime(),
          endTime: faker.date.future().getTime(),
          distance: faker.number.int(),
          time: faker.date.past().toLocaleTimeString(),
          driverId: faker.string.uuid(),
          driverName: faker.person.firstName(),
          city: faker.location.city(),
          paymentType: ['cash', 'visa', 'mastercard'][
            faker.number.int({ max: 2, min: 0 })
          ],
          status: orderStatus[faker.number.int({ max: 3, min: 0 })].value,
          deliveryFee: faker.number.int({ max: 100, min: 0 }),
          location:
            faker.number.int({ max: 2, min: 1 }) == 1
              ? {
                  latitude: faker.location.latitude({ max: 22, min: 21 }),
                  longitude: faker.location.longitude({
                    max: 40,
                    min: 39,
                  }),
                }
              : null,
          items: Array.from(
            { length: faker.number.int({ max: 5, min: 1 }) },
            () => ({
              id: faker.number.int({ min: 1000, max: 10000 }).toString(),
              name: faker.commerce.productName(),
              quantity: faker.number.int({ max: 5, min: 1 }),
            })
          ),
          clientPaid: faker.datatype.boolean(),
          driverPaid: faker.datatype.boolean(),
        } as Order)
    )

    setOrders(records)
    setFilteredOrders(records)

    setLoading(false)
    // setOrders(orders)
  }

  const handleSearchOrders = (search: string) => {
    if (search === '') {
      refreshOrders()
      return
    }
    // search inside orders array
    const filtered: any = searchOrders(orders, search)
    setFilteredOrders(filtered)
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

    setFilteredOrders(sortedOrders)
  }

  const handleSelectStatus = (status: string) => {
    if (status === '') {
      refreshOrders()
      return
    }
    const filteredOrders = orders.filter((driver) => driver?.status === status)
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
        new Date(order?.date).getTime() >= dateFrom.getTime() &&
        new Date(order?.date).getTime() <= dateTo.getTime()
    )
    setOrders(filteredOrders)
  }

  const handleSelectPaymentType = (paymentType: string) => {
    if (paymentType === '') {
      refreshOrders()
      return
    }
    const filtered = orders.filter(
      (order) => order?.paymentType === paymentType
    )
    setFilteredOrders(filtered)
  }

  useEffect(() => {
    refreshOrders()
  }, [])

  return (
    <OrdersContext.Provider
      value={{
        orders,
        filteredOrders,
        loading,
        handleSearchOrders,
        handleSortOrders,
        handleSelectStatus,
        handleSelectDate,
        handleSelectPaymentType,
        refreshOrders,
      }}
    >
      {children}
    </OrdersContext.Provider>
  )
}
