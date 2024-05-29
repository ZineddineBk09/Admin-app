import React from 'react'
import { RenderCell } from './render-orders-cell'
import { ordersTableCols } from '../data'
import { useOrdersContext } from '../../../../context/client/orders'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline'

export const OrdersTable = () => {
  const { orders } = useOrdersContext()

  return (
    <div className='flex flex-col overflow-hidden items-center'>
      <div className='w-full sm:-mx-6 lg:-mx-8 overflow-x-auto'>
        <div className='inline-block min-w-full py-2 sm:px-6 lg:px-8'>
          <div className='overflow-hidden'>
            <table className='min-w-full text-left text-sm font-light'>
              <thead className='border-b font-medium border-gray-300'>
                <tr>
                  {ordersTableCols?.map((col) => (
                    <th key={col.uid} scope='col' className='px-6 py-4'>
                      {col.name === 'Actions' ? '' : col.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders?.map((order: any, index: number) => (
                  <tr
                    key={index}
                    className={`border-b transition duration-200 ease-in-out bg-gray-200 hover:bg-yellow-100 
                    `}
                  >
                    {ordersTableCols?.map((col) => (
                      <td
                        key={col.uid}
                        className={`whitespace-nowrap px-6 py-4 font-medium border-gray-300 ${
                          col.uid !== 'isPaid' && 'border-r'
                        } ${col.uid == 'id' && 'border-l'}`}
                      >
                        {RenderCell({ order: order, columnKey: col.uid })}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Pagination />
    </div>
  )
}

export function Pagination() {
  const { pagination, fetchNextPage, fetchPreviousPage } = useOrdersContext()

  return (
    <div className='flex items-center gap-8 h-12'>
      <button
        onClick={fetchPreviousPage}
        disabled={pagination.page === 1}
        className='border border-black p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed'
      >
        <ArrowLeftIcon strokeWidth={2} className='h-4 w-4' />
      </button>
      <p color='gray' className='font-normal'>
        Page <strong className='text-gray-900'>{pagination.page}</strong> of{' '}
        <strong className='text-gray-900'>
          {Math.ceil(pagination.total / pagination.limit)}
        </strong>
      </p>
      <button
        onClick={fetchNextPage}
        disabled={
          pagination.page === Math.ceil(pagination.total / pagination.limit)
        }
        className='border border-black p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed'
      >
        <ArrowRightIcon strokeWidth={2} className='h-4 w-4' />
      </button>
    </div>
  )
}
