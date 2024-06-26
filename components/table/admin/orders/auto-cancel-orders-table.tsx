import React, { useEffect, useState } from 'react'
import { RenderCell } from './render-auto-cancel-orders-cell'
import { autoCancelOrdersTableCols } from '../data'
import { Sort } from '../../../../interfaces'
import { useAutoCancelledOrdersContext } from '../../../../context/admin/auto-cancelled-orders'

export const OrdersTable = () => {
  const { autoCancelledOrders, handleSortAutoCancelledOrders } =
    useAutoCancelledOrdersContext()
  const [sorting, setSorting] = useState<Sort>({ column: '', direction: '' })

  useEffect(() => {
    if (sorting.column === '') return
    handleSortAutoCancelledOrders(sorting)
  }, [sorting])

  return (
    <div className='flex flex-col'>
      <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
        <div className='inline-block min-w-full py-2 sm:px-6 lg:px-8'>
          <div className='overflow-hidden'>
            <table className='min-w-full text-left text-sm font-light'>
              <thead className='border-b font-medium border-gray-300'>
                <tr>
                  {autoCancelOrdersTableCols?.map((col) => (
                    <th key={col.uid} scope='col' className='px-6 py-4'>
                      {col.name === 'Actions' ? '' : col.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {autoCancelledOrders?.map((order: any, index: number) => (
                  <tr
                    key={index}
                    // make table striped by adding bg-gray-50 to odd rows
                    className={`border-b transition duration-200 ease-in-out hover:bg-yellow-100 
                      ${index % 2 === 0 ? ' bg-gray-200' : ''}
                    `}
                  >
                    {autoCancelOrdersTableCols?.map((col) => (
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
    </div>
  )
}
