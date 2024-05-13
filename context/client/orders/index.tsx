import exportFromJSON from 'export-from-json'
import { useCurrentUser } from '../../../hooks/current-user'
import { APIResponse, Order, Pagination, Sort } from '../../../interfaces'
import { filterRecords, searchRecords } from '../../../lib/api'
import axios from '../../../lib/axios'
import React, { useEffect, useState } from 'react'
import { useCurrentRole } from '../../../hooks/current-role'

export const OrdersContext = React.createContext({})

export const useOrdersContext: {
  (): {
    orders: Order[]
    filteredOrders: Order[]
    loading: boolean
    hasMore: boolean
    isFetching: boolean
    pagination: Pagination
    filters: {
      paymentType: string
      dateFrom: Date
      dateTo: Date
    }
    setFilters: React.Dispatch<
      React.SetStateAction<{
        paymentType: string
        dateFrom: Date
        dateTo: Date
      }>
    >
    fetchNextPage: () => Promise<void>
    fetchPreviousPage: () => Promise<void>
    handleSearchOrders: (search: string) => void
    handleSortOrders: (sort: Sort) => void
    handleFilterDate: ({
      dateFrom,
      dateTo,
    }: {
      dateFrom: Date
      dateTo: Date
    }) => void
    refreshOrders: (extraParams?: any) => Promise<void>
    calculateUnpaidRoyalties: (orders: Order[]) => string
  }
} = () => React.useContext(OrdersContext as any)

export const OrdersContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const user = useCurrentUser()
  const role = useCurrentRole()
  const [orders, setOrders] = useState<Order[]>([] as Order[])
  const [pagination, setPagination] = useState<Pagination>({
    limit: 10,
    offset: 0,
    total: 0,
    page: 1,
  })
  const [filters, setFilters] = useState<{
    paymentType: string
    dateFrom: Date
    dateTo: Date
  }>({
    paymentType: '',
    dateFrom: new Date(),
    dateTo: new Date(),
  })
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([] as Order[])
  const [loading, setLoading] = useState(false)

  const refreshOrders = async (extraParams?: any) => {
    setLoading(true)
    const params =
      role === 'client'
        ? {
            client__account_id: user?.user_id,
          }
        : {
            client__supervisor_id: user?.user_id,
          }
    const records: APIResponse = await filterRecords(
      { ...params, ...extraParams },
      'order'
    )

    // const records: APIResponse = await getRecords('order')
    if (records.results) {
      setOrders(records.results)
    }

    // check if there are more orders we can fetch
    setHasMore(!!records.next)

    setPagination({
      limit: records?.results?.length,
      offset: 0,
      total: records.count,
      page: 1,
    })

    setLoading(false)
  }

  const fetchNextPage = async () => {
    if (isFetching || !hasMore) {
      return
    }

    setIsFetching(true)

    // next url will of format: /order/?limit=10&offset=10
    try {
      const url = `/order/?limit=${pagination.limit}&offset=${
        pagination.offset + pagination.limit
      }`
      const params = {
        added_at__gte: filters?.dateFrom,
        added_at__lte: filters?.dateTo,
      }

      const response = await axios.get(url, {
        params,
      })
      const newOrders = response.data.results
      setOrders(newOrders as Order[])

      // check if there are more orders we can fetch
      setHasMore(!!response.data.next)

      setPagination({
        ...pagination,
        offset: pagination.offset + pagination.limit,
        page: pagination.page + 1,
      })
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setIsFetching(false)
    }
  }

  const fetchPreviousPage = async () => {
    if (isFetching || pagination.offset === 0) {
      return
    }

    setIsFetching(true)

    // next url will of format: /order/?limit=10&offset=10
    try {
      const url = `/order/?limit=${pagination.limit}&offset=${
        pagination.offset - pagination.limit
      }`
      const params = {
        added_at__gte: filters?.dateFrom,
        added_at__lte: filters?.dateTo,
      }

      const response = await axios.get(url, {
        params,
      })
      const newOrders = response.data.results
      setOrders(newOrders as Order[])

      // check if there are more orders we can fetch
      setHasMore(!!response.data.next)

      setPagination({
        ...pagination,
        offset: pagination.offset - pagination.limit,
        page: pagination.page - 1,
      })
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setIsFetching(false)
    }
  }

  const handleSearchOrders = async (search: string) => {
    if (search === '') {
      refreshOrders()
      return
    }
    // search inside orders array
    const filtered: APIResponse = await searchRecords(search, 'order')

    if (filtered.results) {
      setOrders(filtered.results)
    }
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

  const handleFilterDate = async ({
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

    const params =
      role === 'client'
        ? {
            client__account_id: user?.user_id,
          }
        : {
            client__supervisor_id: user?.user_id,
          }

    const records: APIResponse = await filterRecords(
      {
        added_at__gte: dateFrom,
        added_at__lte: dateTo,
        ...params,
      },
      'order'
    )

    if (records.results) {
      setOrders(records.results)
    }
  }

  const calculateUnpaidRoyalties = (orders: Order[]) => {
    /**order status:
    | 'new'
    | 'searching_drivers'
    | 'searching'
    | 'prompting_driver'
    | 'assigned'
    | 'failed'
    | 'order_failed'
    | 'client_reached'
    | 'transitioning'
    | 'delivering'
    | 'driver_reached'
    | 'customer_reached'
    | 'paid'
    | 'settled'
    | 'cancelled'
    | 'acquired'
    | 'deposited' */
    // unpaid royalties ==> sum of value of orders with status 'paid'
    const unpaidRoyalties = orders
      .filter(
        (order) => order.status === 'paid' || order.status === 'searching'
      )
      .reduce((acc, order) => acc + order.total_order_value, 0)

    // return number in dollars
    return unpaidRoyalties.toFixed(2)
  }

  useEffect(() => {
    orders.length === 0 && refreshOrders()
  }, [])

  return (
    <OrdersContext.Provider
      value={{
        orders,
        filteredOrders,
        loading,
        hasMore,
        isFetching,
        pagination,
        filters,
        setFilters,
        fetchNextPage,
        fetchPreviousPage,
        handleSearchOrders,
        handleSortOrders,
        handleFilterDate,
        refreshOrders,
        calculateUnpaidRoyalties,
      }}
    >
      {children}
    </OrdersContext.Provider>
  )
}
