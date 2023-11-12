import { Country } from '@/interfaces'
import { Divider } from '@nextui-org/react'
import React from 'react'
import { AddCountry } from './add-country'
import { DeleteCountry } from './delete-country'
import CopyToClipboardButton from '@/components/shared/copy-to-clipboard'
import { ChevronRightIcon } from '@heroicons/react/24/outline'

const Countries = () => {
  const countries: Country[] = [
    {
      id: '215351',
      name: 'Saudi Arabia',
      priceUnit: 'SAR',
      driverFee: 25,
      orderFee: 10,
    },
    {
      id: '215352',
      name: 'United Arab Emirates',
      priceUnit: 'AED',
      driverFee: 25,
      orderFee: 10,
    },
    {
      id: '215353',
      name: 'Jordan',
      priceUnit: 'JOD',
      driverFee: 25,
      orderFee: 10,
    },
  ]

  return (
    <div className='w-full mx-auto flex flex-col items-center gap-y-6'>
      <div className='w-full flex flex-col items-center gap-y-6'>
        {countries.map((country) => (
          <CountryCard key={country.id} country={country} />
        ))}
      </div>
      {/* add country button */}
      <AddCountry />
    </div>
  )
}

const CountryCard = ({ country }: { country: Country }) => {
  const [showInfos, setShowInfos] = React.useState(false)
  const { id, name, priceUnit, driverFee, orderFee } = country
  const fields = [
    {
      name: 'Price Unit',
      id: 'priceUnit',
      defaultValue: priceUnit,
    },
    {
      name: 'Driver Fees',
      id: 'driverFee',
      defaultValue: driverFee,
    },
    {
      name: 'Order Fees',
      id: 'orderFee',
      defaultValue: orderFee,
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
        <DeleteCountry id={id} />
      </div>

      {showInfos && (
        <>
          <Divider></Divider>
          {fields.map(({ name, id, defaultValue }: any, index: number) => (
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
                <CopyToClipboardButton text={defaultValue} />
              </div>
              {index !== fields.length - 1 && <Divider></Divider>}
            </>
          ))}
        </>
      )}
    </div>
  )
}

export default Countries
