import { Text, Loading } from '@nextui-org/react'
import React from 'react'
import { Flex } from '../../styles/flex'
import { OrdersTable } from '../../table/orders/orders-table'
const AddOrder = dynamic(() =>
  import('./add-order').then((mod) => mod.AddOrder)
)
import { useOrdersContext } from '../../../context/orders'
import { Team } from '../../../interfaces'
import dynamic from 'next/dynamic'

export const OrdersPage = () => {
  const { orders, loading } = useOrdersContext()

  return (
    <Flex
      css={{
        mt: '$5',
        '@sm': {
          mt: '$10',
        },
        gap: '$6',
      }}
      justify={'center'}
      direction={'column'}
      className='relative w-full bg-white rounded-lg shadow-lg py-6 px-2 overflow-x-auto'
    >
      <div className='w-full flex justify-between px-6'>
        <h1 className='font-semibold text-2xl'>Orders</h1>
        <AddOrder />
      </div>

      <SearchAndFilter />

      {loading ? (
        <Loading size='xl' className='mt-24 -mb-24' color='warning' />
      ) : orders?.length > 0 ? (
        <OrdersTable />
      ) : (
        <Flex
          css={{
            gap: '$6',
            mt: '$6',
            '@sm': { mt: '$10' },
          }}
          direction={'column'}
          align={'center'}
        >
          <Text h3>No orders found</Text>
        </Flex>
      )}
    </Flex>
  )
}

export const SearchAndFilter = () => {
  const {
    orders,
    handleSearchOrders,
    handleFilterPaymentType,
    filters,
    setFilters,
    handleFilterDate,
  } = useOrdersContext()

  return (
    <div className='w-full grid grid-cols-1 gap-6 lg:grid-cols-4 px-6'>
      {/* Search */}
      <input
        name='search'
        id='search'
        type='text'
        className='bg-gray-200 rounded-full px-4 py-2'
        placeholder='Search'
        onChange={(e) => handleSearchOrders(e.target.value)}
      />

      {/* Date From */}
      <div className='h-10 flex items-center gap-x-4 bg-gray-200 rounded px-4 relative lg:mx-auto lg:max-w-xs'>
        <span className='text-gray-400'>Date From</span>
        <input
          type='date'
          name='dateFrom'
          id='dateFrom'
          className='w-fit h-full bg-transparent'
          onChange={(e) => {
            setFilters({
              ...filters,
              dateFrom: new Date(e.target.value),
            })
            handleFilterDate({
              dateFrom: new Date(e.target.value),
              dateTo: filters.dateTo,
            })
          }}
        />
      </div>
      {/* Date To */}
      <div className='h-10 flex items-center gap-x-4 bg-gray-200 rounded px-4 relative lg:mx-auto lg:max-w-xs'>
        <span className='text-gray-400'>Date To</span>
        <input
          type='date'
          name='dateTo'
          id='dateTo'
          className='w-fit h-full bg-transparent'
          onChange={(e) => {
            setFilters({
              ...filters,
              dateTo: new Date(e.target.value),
            })
            handleFilterDate({
              dateFrom: filters.dateFrom,
              dateTo: new Date(e.target.value),
            })
          }}
        />
      </div>
      {/* Payment type: visa or cash */}
      <div className='h-10 flex items-center gap-x-4 bg-gray-200 rounded px-4 relative lg:mx-auto lg:max-w-xs'>
        <span className='text-gray-400'>Payment type</span>
        <select
          name='paymentType'
          id='paymentType'
          className='h-full bg-transparent'
          value={filters.paymentType}
          onChange={(e) => {
            setFilters({
              ...filters,
              paymentType: e.target.value,
            })
            handleFilterPaymentType(e.target.value)
          }}
        >
          <option value='all'>All</option>
          <option value='visa'>Visa</option>
          <option value='mastercard'>Mastercard</option>
          <option value='cash'>Cash</option>
        </select>
      </div>
    </div>
  )
}
