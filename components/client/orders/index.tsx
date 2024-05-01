import { Loading, Text, Tooltip } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { Flex } from '../../styles/flex'
import { OrdersTable } from '../../table/client/orders/orders-table'
import { PrintIcon } from '../../icons/table'
import Image from 'next/image'
import DateRangePicker from 'rsuite/DateRangePicker'
import { signOut } from 'next-auth/react'
import { useCurrentUser } from '../../../hooks/current-user'
import { useOrdersContext } from '../../../context/client/orders'
import { AddOrder } from './add-order'
import { filterRecords } from '../../../lib/api'
import { APIResponse, Branch } from '../../../interfaces'
import { useCurrentRole } from '../../../hooks/current-role'

export const ClientOrderPage = () => {
  const role = useCurrentRole()
  const { orders, calculateUnpaidRoyalties, reportOrders } = useOrdersContext()
  const loading = false

  return (
    <>
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
        className='relative w-full bg-white rounded-lg shadow-lg overflow-x-auto'
      >
        <div className='w-full flex flex-col items-start justify-between gap-y-4 border-b border-gray-300 px-2 py-4 xl:items-center xl:flex-row xl:gap-x-6'>
          {/* Logo */}
          <div className='relative w-full h-40 flex items-center gap-x-6 xl:h-10 xl:w-20'>
            <Image
              src='/images/logo.png'
              alt='Company'
              layout='fill'
              className='object-contain w-full h-fit'
            />
          </div>

          {/* Select Branch */}
          {role !== 'branch' && (
            <input
              type='text'
              name='branch'
              id='branch'
              placeholder='Select Branch'
              className='w-full h-10 py-4 bg-gray-200 rounded px-4 xl:max-w-[200px]'
            />
          )}

          <div className='h-full w-1 bg-gray-300 hidden xl:block' />

          {/* Search & dates*/}
          <SearchAndFilter />

          <div className='h-full w-1 bg-gray-300 hidden xl:block' />

          {/* Client */}
          <Client />

          <div className='h-full w-1 bg-gray-300 hidden xl:block' />

          {/* Royalties */}
          <div className='h-full flex flex-col items-start xl:justify-between'>
            <p className='text-gray-600 text-sm'>Unpaid Royalties</p>
            <h1 className='text-3xl font-bold xl:text-4xl'>
              {calculateUnpaidRoyalties(orders)}{' '}
              <small className='text-xs text-gray-400'>SAR</small>
            </h1>
          </div>

          {/* Export */}
          <div className='w-fit flex flex-col items-end'>
            <Tooltip content='Export'>
              <button
                className='flex items-center gap-x-2 ml-auto'
                onClick={() =>
                  //Fleetrun - Branch Name - Date
                  reportOrders()
                }
              >
                <span>Print</span>
                <PrintIcon />
              </button>
            </Tooltip>
          </div>
        </div>
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

        <AddOrder />
      </Flex>
    </>
  )
}

export const SearchAndFilter = () => {
  const { handleFilterDate, handleSearchOrders } = useOrdersContext()

  return (
    <div className='w-full flex items-center gap-y-3 flex-col xl:flex-row xl:w-fit xl:gap-x-3'>
      {/* Search */}
      <input
        name='search'
        id='search'
        type='text'
        className='bg-gray-200 rounded-full px-4 py-2 w-full'
        placeholder='Search'
        onChange={(e) => handleSearchOrders(e.target.value)}
      />

      <DateRangePicker
        placeholder='Select Date Range'
        size='lg'
        onChange={(e: any) =>
          handleFilterDate({
            dateFrom: e[0],
            dateTo: e[1],
          })
        }
      />
    </div>
  )
}

const Client = () => {
  const [branch, setBranch] = useState<Branch>({} as Branch)
  const user = useCurrentUser()
  useEffect(() => {
    const getBranch = async () => {
      const branch: APIResponse = await filterRecords(
        {
          supervisor_id: user.user_id,
        },
        'branch'
      )

      console.log(branch.results[0])
      setBranch(branch.results[0])
    }
    getBranch()
  }, [])

  return (
    <div className='h-full max-h-28 w-fit flex items-start gap-x-3'>
      <div className='h-full w-16 bg-gray-300 rounded-lg' />
      <div className='h-full flex flex-col items-start justify-between'>
        <p className='text-xl font-semibold capitalize'>
          {branch?.account?.name + '-' + branch?.address?.city?.name}
        </p>
        <button
          className='h-10 w-32 bg-red-500 rounded font-medium text-lg shadow-lg hover:bg-opacity-90 transition-all duration-300'
          onClick={() => {
            signOut({ callbackUrl: `/` })
          }}
        >
          Sign Out
        </button>
      </div>
    </div>
  )
}
