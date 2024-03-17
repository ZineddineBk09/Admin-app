import { APIResponse, Order, Sort, Status } from '../../interfaces'
import { filterRecords, getRecords } from '../../lib/api'
import axios from '../../lib/axios'
import { searchOrders } from '../../lib/search'
import React, { useEffect, useState } from 'react'

export const OrdersContext = React.createContext({})

export const useOrdersContext: {
  (): {
    orders: Order[]
    filteredOrders: Order[]
    loading: boolean
    hasMore: boolean
    isFetching: boolean
    fetchNextPage: () => Promise<void>
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
    handleFilterPaymentType: (paymentType: string) => void
    refreshOrders: () => Promise<void>
  }
} = () => React.useContext(OrdersContext as any)

export const OrdersContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [orders, setOrders] = useState<Order[]>([] as Order[])
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [isFetching, setIsFetching] = useState<boolean>(false)
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
    const records: APIResponse = await getRecords('order')
    if (records.results) {
      setOrders(records.results)
    }

    // check if there are more drivers we can fetch
    setHasMore(!!records.next)

    setLoading(false)
  }

  const fetchNextPage = async () => {
    if (isFetching || !hasMore) {
      return
    }

    setIsFetching(true)

    // next url will of format: /order/?limit=10&offset=10
    try {
      const response = await axios.get(
        `/order/?limit=10&offset=${orders.length}`
      )
      const newDrivers = response.data.results
      setOrders([...orders, ...newDrivers])

      // check if there are more orders we can fetch
      setHasMore(!!response.data.next)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setIsFetching(false)
    }
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
        new Date(order?.added_at).getTime() >= dateFrom.getTime() &&
        new Date(order?.added_at).getTime() <= dateTo.getTime()
    )
    setOrders(filteredOrders)
  }

  const handleFilterPaymentType = async (payment_type: string) => {
    // check if the user selected 'all' countries
    if (payment_type == 'all') {
      refreshOrders()
      return
    }

    // fetch cities for the selected payment_type
    const records: APIResponse = await filterRecords({ payment_type }, 'order')

    if (records.results) {
      setOrders(records.results)
    }

    // check if there are more cities we can fetch
    setHasMore(!!records.next)

    setLoading(false)
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
        hasMore,
        isFetching,
        fetchNextPage,
        handleSearchOrders,
        handleSortOrders,
        handleSelectStatus,
        handleSelectDate,
        handleFilterPaymentType,
        refreshOrders,
      }}
    >
      {children}
    </OrdersContext.Provider>
  )
}
