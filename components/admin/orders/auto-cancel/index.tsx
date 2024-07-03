import { Text, Loading, Input } from '@nextui-org/react'
import React, { useState } from 'react'
import { Flex } from '../../../styles/flex'
import { OrdersTable } from '../../../table/admin/orders/auto-cancel-orders-table'
import { useAutoCancelledOrdersContext } from '../../../../context/admin/auto-cancelled-orders'

export const OrdersPage = () => {
  const { autoCancelledOrders, loading } = useAutoCancelledOrdersContext()
  const [openTab, setOpenTab] = React.useState(0)

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
      <div className='w-full h-full px-4 flex flex-col items-start gap-y-4 justify-between xl:flex-row xl:items-end xl:gap-y-0'>
        <Tabs
          tabs={[
            {
              title: 'Pending Auto-Cancellation',
              count: autoCancelledOrders?.length || 0,
            },
            {
              title: 'Unassigned Orders',
              count: autoCancelledOrders?.length || 0,
            },
          ]}
          openTab={openTab}
          setOpenTab={setOpenTab}
        />
        <SearchAndFilter />
      </div>

      {loading ? (
        <Loading size='xl' className='mt-24 -mb-24'  />
      ) : autoCancelledOrders?.length > 0 ? (
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

const SearchAndFilter = () => {
  const { autoCancelledOrders, handleSearchAutoCancelledOrders } =
    useAutoCancelledOrdersContext()

  return (
    <input
      name='search'
      id='search'
      type='text'
      className='bg-gray-200 rounded-lg px-4 py-2'
      placeholder='Search'
      onChange={(e) => handleSearchAutoCancelledOrders(e.target.value)}
    />
  )
}


const Tabs = ({
  tabs,
  openTab,
  setOpenTab,
}: {
  tabs?: {
    title: string
    count: number
  }[]
  openTab: number
  setOpenTab: React.Dispatch<React.SetStateAction<number>>
}) => {
  return (
    <ul
      className='mx-auto flex -mb-3 list-none flex-wrap flex-row'
      role='tablist'
    >
      {tabs?.map((tab: any, index: number) => (
        <li className='flex-auto text-center' key={index}>
          <button
            className={
              'text-sm font-bold uppercase px-4 py-4 block leading-normal ' +
              (openTab === index ? 'bg-primary' : 'bg-gray-200') +
              (index === 0 ? ' rounded-l-xl' : '') +
              (index === tabs?.length - 1 ? ' rounded-r-xl' : '')
            }
            onClick={(e) => {
              e.preventDefault()
              setOpenTab(index)
            }}
            data-toggle='tab'
            role='tablist'
          >
            {tab.title} ({tab.count})
          </button>
        </li>
      ))}
    </ul>
  )
}
