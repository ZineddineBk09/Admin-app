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
import { filterRecords, getRecord } from '../../../lib/api'
import { APIResponse, Branch } from '../../../interfaces'
import { useCurrentRole } from '../../../hooks/current-role'
import { generateOrdersReport } from '../../../utils'
import { UserIcon } from '@heroicons/react/24/outline'

export const ClientOrderPage = () => {
  const user = useCurrentUser()
  const role = useCurrentRole()
  const [branch, setBranch] = useState<Branch>({} as Branch)
  const [branches, setBranches] = useState<Branch[]>([] as Branch[])
  const { orders, calculateUnpaidRoyalties, refreshOrders } = useOrdersContext()
  const loading = false

  useEffect(() => {
    const getClientAccount = async () => {
      const params =
        role === 'client'
          ? {
              account_id: user?.user_id,
            }
          : {
              supervisor_id: user?.user_id,
            }

      const branch: APIResponse = await filterRecords(params, 'branch')

      setBranch(branch.results[0])
    }
    getClientAccount()
  }, [])

  useEffect(() => {
    const getClientBranches = async () => {
      const client = await getRecord(user?.user_id, 'account')

      setBranches(client.branches)
    }
    if (role == 'client') getClientBranches()
  }, [])

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
        <div className='w-full flex flex-col items-start justify-between gap-y-4 border-b border-gray-300 px-2 py-4 xl:items-center xl:flex-row xl:gap--6'>
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
          {role == 'client' && (
            <select
              name='branch'
              id='branch'
              placeholder='Select Branch'
              className='w-full h-10 bg-gray-200 rounded px-4 xl:max-w-[200px]'
              onChange={(e) => {
                refreshOrders({ client_id: e.target.value })
              }}
            >
              <option value='all'>Select Branch</option>
              {branches.map((branch) => (
                <option key={branch.id} value={branch.id}>
                  {branch?.account?.name + '-' + branch?.address?.city?.name}{' '}
                  {branch.main && '(Main)'}
                </option>
              ))}
            </select>
          )}

          <div className='h-full w-1 bg-gray-300 hidden xl:block' />

          {/* Search & dates*/}
          <SearchAndFilter branch={branch} />

          <div className='h-full w-1 bg-gray-300 hidden xl:block' />

          {/* Client */}
          <Client branch={branch} />

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
                  generateOrdersReport(
                    orders,
                    'FleetRun' +
                      '-' +
                      String(user.username as string) +
                      '-' +
                      new Date().toLocaleDateString()
                  )
                }
              >
                <span>Print</span>
                <PrintIcon />
              </button>
            </Tooltip>
          </div>
        </div>
        {loading ? (
          <Loading size='xl' className='mt-24 -mb-24'  />
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

export const SearchAndFilter = ({ branch }: { branch: Branch }) => {
  const { handleFilterDate, handleSearchOrders, refreshOrders } =
    useOrdersContext()

  return (
    <div className='w-full flex items-center gap-y-3 flex-col xl:flex-row xl:w-fit xl:gap-x-3'>
      {/* Search */}
      <input
        name='search'
        id='search'
        type='text'
        className='bg-gray-200 rounded-full px-4 py-2 w-full'
        placeholder='Search'
        onChange={(e) =>
          handleSearchOrders(branch?.account?.name + e.target.value)
        }
      />

      <DateRangePicker
        placeholder='Select Date Range'
        size='lg'
        onChange={(e: any) => {
          if (!e) {
            refreshOrders()
            return
          }
          handleFilterDate({
            dateFrom: e[0],
            dateTo: e[1],
          })
        }}
      />
    </div>
  )
}

const Client = ({ branch }: { branch: Branch }) => {
  return (
    <div className='h-full max-h-28 w-fit flex items-start gap-x-3'>
      <div className='h-full w-16 flex items-center justify-center mr-auto bg-gray-300 rounded-lg p-2'>
        <UserIcon className='text-gray-400' />
      </div>
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
