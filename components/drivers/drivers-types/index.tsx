import { DriverType } from '@/interfaces'
import { Divider } from '@nextui-org/react'
import React from 'react'
import CopyToClipboardButton from '@/components/shared/copy-to-clipboard'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { AddDriverType } from './add-type'
import { DeleteDriverType } from './delete-type'

const DriversTypes = () => {
  const types: DriverType[] = [
    {
      id: 1296,
      name: 'Bike',
      fixed: 20,
      pricePerKm: 10,
      additional: 5,
      maxDistance: 10,
    },
    {
      id: 2351,
      name: 'Car',
      fixed: 20,
      pricePerKm: 10,
      additional: 5,
      maxDistance: 10,
    },
    {
      id: 3190,
      name: 'Van',
      fixed: 20,
      pricePerKm: 10,
      additional: 5,
      maxDistance: 10,
    },
    {
      id: 4715,
      name: 'Truck',
      fixed: 20,
      pricePerKm: 10,
      additional: 5,
      maxDistance: 10,
    },
  ]

  return (
    <div className='w-full mx-auto flex flex-col items-center gap-y-6'>
      <SearchTypes />
      <div className='w-full flex flex-col items-center gap-y-6'>
        {types?.map((type) => (
          <CountryCard key={type.id} type={type} />
        ))}
      </div>
      {/* add type button */}
      <AddDriverType />
    </div>
  )
}

const CountryCard = ({ type }: { type: DriverType }) => {
  const [showInfos, setShowInfos] = React.useState(false)
  const { id, name, fixed, maxDistance, pricePerKm, additional } = type

  const fields = [
    {
      name: 'Fixed',
      id: 'fixed',
      defaultValue: fixed,
    },
    {
      name: 'Price',
      id: 'pricePerKm',
      defaultValue: pricePerKm,
    },
    {
      name: 'Additional',
      id: 'additional',
      defaultValue: additional,
    },
    {
      name: 'Max Distance',
      id: 'maxDistance',
      defaultValue: maxDistance,
    },
  ]
  const units = [
    {
      name: 'Fixed',
      unit: 'SAR',
    },
    {
      name: 'Price',
      unit: 'SAR / km',
    },
    {
      name: 'Additional',
      unit: 'SAR / km',
    },
    {
      name: 'Max Distance',
      unit: 'km',
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
            <h1 className='text-lg font-semibold'>
              {name} <span className='ml-6 text-sm text-gray-400'>#{id}</span>
            </h1>
          </div>
        </button>
        <DeleteDriverType id={id} />
      </div>
      {showInfos && <Divider />}
      <div className='w-full flex flex-col gap-y-3 items-center lg:flex-row'>
        {showInfos && (
          <>
            {fields?.map(({ name, id, defaultValue }: any, index: number) => (
              <>
                <div key={index} className='w-full flex items-center gap-x-6'>
                  <label className='text-gray-600 text-sm w-32 lg:w-fit'>
                    {name}
                  </label>
                  <div className='flex items-center justify-between w-60 bg-gray-200 rounded-md p-2 lg:w-40 xl:w-60'>
                    <input
                      name={id}
                      id={id}
                      type='text'
                      value={defaultValue}
                      onChange={(e) => {
                        console.log(e.target.value)
                      }}
                      className='text-sm bg-transparent w-full outline-none'
                    />
                    <span className='w-20 text-right text-xs text-gray-500'>
                      {units[index].unit}
                    </span>
                  </div>
                </div>
              </>
            ))}
          </>
        )}
      </div>
    </div>
  )
}

const SearchTypes = () => {
  return (
    <div className='w-full flex items-center gap-x-6 ml-12'>
      <div className='w-72 h-10 bg-white rounded-full px-4'>
        <input
          name='type'
          id='type'
          className='w-full h-full bg-transparent'
          placeholder='Search'
        />
      </div>
    </div>
  )
}

export default DriversTypes
