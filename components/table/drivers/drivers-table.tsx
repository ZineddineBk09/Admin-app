import { Checkbox, Divider, Tooltip } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { useDriversContext } from '../../../context/drivers'
import { Driver, Sort } from '../../../interfaces'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { DeleteDriver } from '../../drivers/list/delete-driver'
import { BinIcon } from '../../icons/areas'

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
        {drivers?.map((driver: Driver, index: number) => (
          <DriverCard key={driver?.id || index} driver={driver} />
        ))}
      </div>
    </div>
  )
}

const DriverCard = ({ driver }: { driver: Driver }) => {
  const [showInfos, setShowInfos] = React.useState(false)
  const {
    id,
    username,
    team,
    phone,
    city,
    salary,
    vehicleType,
    areas,
    isFreelance,
  } = driver
  const fields1 = [
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
  ]
  const fields2 = [
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
          <Divider />
          <div className='w-full flex items-center justify-between'>
            <div className='w-full flex items-center gap-x-6'>
              <label className='text-gray-600 text-sm'>Name</label>
              <p className='text-sm capitalize'>{username}</p>
            </div>

            {fields1?.map(({ name, id, defaultValue }: any, index: number) => (
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
                  className='w-60 h-11 bg-gray-200 rounded-md p-2 text-sm'
                />
              </div>
            ))}
          </div>
          <Divider />
          {/* Areas & City */}
          <div className='w-full grid grid-cols-3 items-center justify-between'>
            <div className='flex items-center gap-x-6 col-span-1'>
              <label className='text-gray-600 text-sm'>City</label>
              <p className='text-sm'>{city}</p>
            </div>
            {/* Areas */}
            <div className='flex items-start gap-x-6 col-span-2'>
              <label className='mt-2 text-gray-600 text-sm'>Areas</label>
              {areas?.length > 0 ? (
                <div className='w-full flex items-start gap-y-2'>
                  {areas?.map((area: any, index: number) => (
                    <div key={index}>
                      <div className='h-10 w-fit flex items-center gap-x-6 transition-all duration-300 hover:bg-gray-100 px-2 rounded-md'>
                        <p className='text-sm capitalize'>{area}</p>
                        <Tooltip
                          content={'Delete "' + area + '"'}
                          color='error'
                        >
                          <button>
                            <BinIcon width={4} />
                          </button>
                        </Tooltip>
                        {index < areas?.length - 1 && (
                          <span className='-ml-4'>,</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className='text-sm'>No areas found</p>
              )}

              <Tooltip content='Add Area'>
                <button className='h-10 w-16 flex items-center justify-center text-center text-4xl font-medium rounded-full'>
                  +
                </button>
              </Tooltip>
            </div>
          </div>
          <Divider />

          <div className='w-full flex items-center justify-between'>
            {fields2?.map(({ name, id, defaultValue }: any, index: number) => (
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
                    className='w-60 h-11 bg-gray-200 rounded-md p-2 text-sm'
                  />
                </div>
              </>
            ))}
            <Checkbox
              defaultChecked={isFreelance}
              value={isFreelance ? 'freelancer' : ''}
              color='warning'
              size='xl'
              className='rounded-[0]'
            >
              <span className='text-sm text-gray-500'>Freelancer</span>
            </Checkbox>
          </div>
          <Divider />

          <div className='w-full flex items-center gap-x-6'>
            <label className='text-gray-600 text-sm'>Contract</label>
            <div className='flex items-center gap-x-3'>
              <Btn bg='gray-400'>
                Upload New
                <input
                  type='file'
                  className='absolute inset-0 opacity-0 cursor-pointer'
                />
              </Btn>
              <Btn bg='gray-400'>Download</Btn>
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
      className={`min-w-[128px] relative font-medium shadow-md shadow-black/30 rounded-md text-center py-2 bg-${bg} cursor-pointer h-11 px-12 bg-${bg} rounded font-medium text-md hover:bg-opacity-90 transition-all duration-300`}
    >
      {children}
    </button>
  )
}
