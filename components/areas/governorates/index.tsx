import { Governorate } from '@/interfaces'
import { Divider } from '@nextui-org/react'
import React from 'react'
import { AddGovernorate } from './add-governorate'
import { DeleteGovernorate } from './delete-governorate'
import CopyToClipboardButton from '@/components/shared/copy-to-clipboard'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { useAreasGovernoratesContext } from '@/context/areas/GovernoratesContext'

const Governorates = () => {
  const { governorates } = useAreasGovernoratesContext()

  return (
    <div className='w-full mx-auto flex flex-col items-center gap-y-6'>
      <SearchGovernorate />
      <div className='w-full flex flex-col items-center gap-y-6'>
        {governorates.map((governorate: Governorate) => (
          <GovernorateCard key={governorate.id} governorate={governorate} />
        ))}
      </div>
      {/* add governorate button */}
      <AddGovernorate />
    </div>
  )
}

const GovernorateCard = ({ governorate }: { governorate: Governorate }) => {
  const [showInfos, setShowInfos] = React.useState(false)
  const { id, name, driverFee, orderFee } = governorate
  const fields = [
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
        <DeleteGovernorate id={id} />
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

const SearchGovernorate = () => {
  const { countries } = useAreasGovernoratesContext()
  return (
    <div className='w-full flex items-center gap-x-6 ml-12'>
      <label className='text-sm'>Select Country</label>
      <div className='w-72 h-10 bg-white rounded-full px-4'>
        <select
          name='country'
          id='country'
          className='w-full h-full bg-transparent '
        >
          <option value=''>All</option>
          {countries.map((country: string, index: number) => (
            <option key={index} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default Governorates
