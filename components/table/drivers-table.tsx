import { Divider, Table, Tooltip } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { useDriversContext } from '@/context/driver'
import { Driver, Sort } from '@/interfaces'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { DeleteDriver } from '../drivers/list/delete-driver'
import { BinIcon } from '../icons/areas'

export const DriversTable = () => {
  const { drivers, handleSortDrivers } = useDriversContext()
  const [sorting, setSorting] = useState<Sort>({ column: '', direction: '' })

  useEffect(() => {
    if (sorting.column === '') return
    handleSortDrivers(sorting)
  }, [sorting])

  return (
    <div className='w-full mx-auto flex flex-col items-center gap-y-6'>
      <div className='w-full flex flex-col items-center gap-y-6'>
        {drivers?.map((driver: Driver) => (
          <DriverCard key={driver.id} driver={driver} />
        ))}
      </div>
      {/* add driver button */}
      {/* <AddAccount /> */}
    </div>
    // <div className='flex flex-col'>
    //   <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
    //     <div className='inline-block min-w-full py-2 sm:px-6 lg:px-8'>
    //       <div className='overflow-hidden'>
    //         <table className='min-w-full text-left text-sm font-light'>
    //           <thead className='border-b font-medium border-gray-300'>
    //             <tr>
    //               {driversTableCols?.map((col) => (
    //                 <th key={col.uid} scope='col' className='px-6 py-4'>
    //                   {col.name === 'Actions' ? '' : col.name}
    //                 </th>
    //               ))}
    //             </tr>
    //           </thead>
    //           <tbody>
    //             {drivers?.map((driver: any, index: number) => (
    //               <tr
    //                 key={driver.id}
    //                 // make table striped by adding bg-gray-50 to odd rows
    //                 className={`border-b transition duration-200 ease-in-out hover:bg-yellow-100
    //                   ${index % 2 === 0 ? ' bg-gray-200' : ''}
    //                 `}
    //               >
    //                 {driversTableCols?.map((col) => (
    //                   <td
    //                     key={col.uid}
    //                     className={`whitespace-nowrap px-6 py-4 font-medium border-gray-300 ${
    //                       col.uid !== 'isPaid' && 'border-r'
    //                     } ${col.uid === 'id' && 'border-l'}`}
    //                   >
    //                     {RenderCell({ driver: driver, columnKey: col.uid })}
    //                   </td>
    //                 ))}
    //               </tr>
    //             ))}
    //           </tbody>
    //         </table>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    // <Box
    //   css={{
    //     '& .nextui-table-container': {
    //       boxShadow: 'none',
    //       marginBottom: '10px',
    //       borderRadius: '0',
    //       border: '1px solid #CECECE',
    //     },
    //   }}
    // >
    //   <Table
    //     aria-label='Drivers table'
    //     bordered
    //     sticked
    //     striped
    //     hoverable
    //     css={{
    //       height: 'auto',
    //       minWidth: '100%',
    //       boxShadow: 'none',
    //       width: '100%',
    //       px: 5,
    //       backgroundColor: 'white',
    //     }}
    //     onSortChange={(sort: any) => {
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
    //     <Table.Header columns={driversTableCols}>
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
    //     <Table.Body items={drivers}>
    //       {(item) => (
    //         <Table.Row>
    //           {(columnKey) => (
    //             <Table.Cell>
    //               {RenderCell({ driver: item, columnKey: columnKey })}
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
  )
}

const DriverCard = ({ driver }: { driver: Driver }) => {
  const [showInfos, setShowInfos] = React.useState(false)
  const { id, username, team, phone, city, salary, vehicleType, areas } = driver
  const fields = [
    {
      name: 'Team',
      id: 'team',
      defaultValue: team,
    },
    {
      name: 'Phone Number',
      id: 'phone',
      defaultValue: phone,
    },
    {
      name: 'Salary',
      id: 'salary',
      defaultValue: salary,
    },
    {
      name: 'Vehicle Type',
      id: 'vehicleType',
      defaultValue: vehicleType,
    },
  ]

  return (
    <div className='w-full flex flex-col items-start gap-y-3 bg-white rounded-md p-4 shadow-lg'>
      <div className='w-full flex items-center justify-between'>
        <button onClick={() => setShowInfos(!showInfos)}>
          <div className='flex items-center gap-x-3'>
            <ChevronRightIcon
              className={`w-5 h-5 transform transition-all duration-300
            ${showInfos ? 'rotate-90' : 'rotate-0'}
            `}
            />
            <h1 className='text-lg font-semibold capitalize'>
              {username}{' '}
              <span className='ml-6 text-sm text-gray-400'>#{id}</span>
            </h1>
          </div>
        </button>
        <DeleteDriver id={id} />
      </div>
      {showInfos && (
        <>
          <Divider></Divider>
          <div className='w-full flex items-center gap-x-6'>
            <label className='text-gray-600 text-sm'>Username</label>
            <p className='text-sm capitalize'>{username}</p>
          </div>
          <Divider></Divider>
          <div className='w-full flex items-center gap-x-6'>
            <label className='text-gray-600 text-sm'>City</label>
            <p className='text-sm'>{city}</p>
          </div>
          <Divider></Divider>
          {fields?.map(({ name, id, defaultValue }: any, index: number) => (
            <>
              <div key={index} className='w-full flex items-center gap-x-6'>
                <label className='text-gray-600 text-sm'>{name}</label>
                <input
                  name={id}
                  id={id}
                  type='text'
                  value={defaultValue}
                  onChange={(e) => {
                    console.log(e.target.value)
                  }}
                  className='w-60 bg-gray-200 rounded-md p-2 text-sm'
                />
              </div>
              <Divider></Divider>
            </>
          ))}

          <div className='w-full flex items-start gap-x-6'>
            <label className='mt-2 text-gray-600 text-sm'>Branches</label>
            {areas.length > 0 ? (
              <div className='w-full flex items-start gap-y-2'>
                {areas?.map((area: any, index: number) => (
                  <div key={index}>
                    <div className='h-10 w-fit flex items-center gap-x-6 transition-all duration-300 hover:bg-gray-100 px-2 rounded-md'>
                      <p className='text-sm capitalize'>{area} </p>
                      <Tooltip content={'Delete "' + area + '"'} color='error'>
                        <button>
                          <BinIcon width={4} />
                        </button>
                      </Tooltip>
                      {index < areas.length - 1 && (
                        <span className='-ml-4'>,</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className='text-sm'>No areas found</p>
            )}
          </div>
          <Divider></Divider>

          <div className='w-full flex items-center gap-x-6'>
            <label className='text-gray-600 text-sm'>Contract</label>
            <div className='flex items-center gap-x-3'>
              <Btn>
                Upload New
                <input
                  type='file'
                  className='absolute inset-0 opacity-0 cursor-pointer'
                />
              </Btn>
              <Btn>Download</Btn>
              <Btn bg='primary'>Print</Btn>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

const Btn = ({
  children,
  bg = '[#B4B4B4]',
}: {
  children: any
  bg?: string
}) => {
  return (
    <button
      className={`min-w-[128px] relative font-medium text-xs shadow-md shadow-black/30 rounded-md text-center py-2 bg-${bg} px-2 transition-all duration-300 hover:bg-opacity-90 cursor-pointer`}
    >
      {children}
    </button>
  )
}
