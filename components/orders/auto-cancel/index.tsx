import { Text, Loading, Input } from '@nextui-org/react'
import React, { useState } from 'react'
import { Flex } from '../../styles/flex'
import { OrdersTable } from '../../table/orders/auto-cancel-orders-table'
import { Team } from '../../../interfaces'
import { getRecords } from '../../../lib/api'
import { useAutoCancelledOrdersContext } from '../../../context/auto-cancelled-orders'

export const OrdersPage = () => {
  const { enabled, autoCancelledOrders, loading } =
    useAutoCancelledOrdersContext()
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
        {/* <AutoCancelSwitch /> */}
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
        <Loading size='xl' className='mt-24 -mb-24' color='warning' />
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
  // get unique teams
  const [teams, setTeams] = React.useState<Team[]>([])

  React.useEffect(() => {
    const fetchTeams = async () => {
      await getRecords('team')
        .then((res: { teams: Team[] }) => setTeams(res.teams))
        .catch((err: any) => {
          setTeams([])
          console.log('Error in fetching teams: ', err)
        })
    }
    fetchTeams()
  }, [autoCancelledOrders])

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

const AutoCancelSwitch = () => {
  const { enabled, handleEnableAutoCancelledOrders } =
    useAutoCancelledOrdersContext()
  const [value, setValue] = useState(10)

  return (
    <div className='max-w-md relative flex flex-col items-start justify-center overflow-hidden gap-y-3'>
      <div className='flex'>
        <span className='mr-2 font-bold text-gray-900'>Auto Cancel Orders</span>
        <label className='inline-flex relative items-center mr-5 cursor-pointer'>
          <input
            type='checkbox'
            className='sr-only peer'
            checked={enabled}
            readOnly
          />
          <div
            onClick={handleEnableAutoCancelledOrders}
            className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-primary-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"
          />
        </label>
      </div>
      <p className='text-gray-500'>
        if this options is enabled, orders will be automatically cancelled after{' '}
        <b>{value} minutes</b>, and it will applied to all clients orders.
      </p>
      <div className='flex items-center justify-between gap-x-3'>
        <Input
          type='number'
          min={1}
          disabled={!enabled}
          value={value}
          onChange={(e) => setValue(parseInt(e.target.value))}
        />
        <button
          className={`px-4 py-2 bg-primary text-gray-700 rounded-lg ${
            !enabled && 'opacity-50 cursor-not-allowed'
          }`}
          disabled={!enabled}
        >
          Save
        </button>
      </div>
    </div>
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
