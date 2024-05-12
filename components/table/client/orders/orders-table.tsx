import React from 'react'
import { RenderCell } from './render-orders-cell'
import { ordersTableCols } from '../data'
import { useOrdersContext } from '../../../../context/client/orders'

export const OrdersTable = () => {
  const { orders } = useOrdersContext()

  return (
    <div className='flex flex-col overflow-hidden'>
      <div className='sm:-mx-6 lg:-mx-8 overflow-x-auto'>
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
    </div>
  )
}
