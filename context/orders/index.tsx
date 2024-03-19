import { APIResponse, Order, Pagination, Sort, Status } from '../../interfaces'
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
    handleSelectStatus: (status: string) => void
    handleFilterDate: ({
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

  const refreshOrders = async () => {
    setLoading(true)
    const records: APIResponse = await getRecords('order')
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
        payment_type: filters?.paymentType,
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
        payment_type: filters?.paymentType,
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

    const records: APIResponse = await filterRecords(
      {
        added_at__gte: dateFrom,
        added_at__lte: dateTo,
        payment_type: filters?.paymentType,
      },
      'order'
    )

    if (records.results) {
      setOrders(records.results)
    }
  }

  const handleFilterPaymentType = async (payment_type: string) => {
    // check if the user selected 'all' countries
    if (payment_type == 'all') {
      refreshOrders()
      return
    }

    // fetch cities for the selected payment_type
    const records: APIResponse = await filterRecords(
      {
        payment_type,
        added_at__gte: filters?.dateFrom,
        added_at__lte: filters?.dateTo,
      },
      'order'
    )

    if (records.results) {
      setOrders(records.results)
    }

    // check if there are more cities we can fetch
    setHasMore(!!records.next)

    setPagination({
      limit: records?.results?.length,
      offset: 0,
      total: records.count,
      page: 1,
    })

    setLoading(false)
  }

  useEffect(() => {
    orders.length === 0 && refreshOrders()
  })

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
        handleSelectStatus,
        handleFilterDate,
        handleFilterPaymentType,
        refreshOrders,
      }}
    >
      {children}
    </OrdersContext.Provider>
  )
}
