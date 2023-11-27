import { Table } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { Box } from '../styles/box'
import { RenderCell } from './render-orders-cell'
import { ordersTableCols } from './data'
import { useOrdersContext } from '@/context/order/OrdersContext'
import { Sort } from '@/interfaces'

export const OrdersTable = () => {
  const { orders, handleSortOrders } = useOrdersContext()
  const [sorting, setSorting] = useState<Sort>({ column: '', direction: '' })

  useEffect(() => {
    if (sorting.column === '') return
    handleSortOrders(sorting)
  }, [sorting])

  return (
    <div className='flex flex-col'>
      <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
        <div className='inline-block min-w-full py-2 sm:px-6 lg:px-8'>
          <div className='overflow-hidden'>
            <table className='min-w-full text-left text-sm font-light'>
              <thead className='border-b font-medium border-gray-300'>
                <tr>
                  {ordersTableCols.map((col) => (
                    <th key={col.uid} scope='col' className='px-6 py-4'>
                      {col.name === 'Actions' ? '' : col.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.map((order: any, index: number) => (
                  <tr
                    key={order.id}
                    // make table striped by adding bg-gray-50 to odd rows
                    className={`border-b transition duration-200 ease-in-out hover:bg-yellow-100 
                      ${index % 2 === 0 ? ' bg-gray-200' : ''}
                    `}
                  >
                    {ordersTableCols.map((col) => (
                      <td
                        key={col.uid}
                        className={`whitespace-nowrap px-6 py-4 font-medium border-gray-300 ${
                          col.uid !== 'isPaid' && 'border-r'
                        } ${col.uid === 'id' && 'border-l'}`}
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

// <Box
//   css={{
//     '& .nextui-table-container': {
//       boxShadow: 'none',
//       marginBottom: '10px',
//       borderRadius: '0',
//       border: '1px solid #CECECE',
//     },

//     '& .nextui-table-header-row': {
//       backgroundColor: '#000 !important',
//       borderRadius: 0,
//       height: '50px',
//     },
//   }}
// >
//   <Table
//     aria-label='Orders table'
//     hoverable
//     striped
//     css={{
//       height: 'auto',
//       minWidth: '100%',
//       boxShadow: 'none',
//       width: '100%',
//       px: 5,
//       backgroundColor: 'white',
//     }}
//     onSortChange={(sort: any) => {
//       // because the table does not support descending sorting
//       // we need to do it manually
//       const { direction } = sorting
//       const { column } = sort
//       if (direction === 'ascending') {
//         setSorting({
//           column,
//           direction: 'descending',
//         })
//         return
//       }
//       setSorting({ column, direction: 'ascending' })
//     }}
//   >
//     <Table.Header columns={ordersTableCols}>
//       {(column) => (
//         <Table.Column
//           key={column.uid}
//           hideHeader={column.uid === 'actions'}
//           align={column.uid === 'actions' ? 'center' : 'start'}
//           allowsSorting={
//             column.uid === 'completedTasks' ||
//             column.uid === 'inProgressTasks'
//           }
//         >
//           {column.name}
//         </Table.Column>
//       )}
//     </Table.Header>
//     <Table.Body items={orders}>
//       {(item) => (
//         <Table.Row>
//           {(columnKey) => (
//             <Table.Cell>
//               {RenderCell({ order: item, columnKey: columnKey })}
//             </Table.Cell>
//           )}
//         </Table.Row>
//       )}
//     </Table.Body>
//     <Table.Pagination
//       shadow
//       noMargin
//       align='center'
//       color='warning'
//       rowsPerPage={8}
//       onPageChange={(page) => console.log({ page })}
//     />
//   </Table>
// </Box>
