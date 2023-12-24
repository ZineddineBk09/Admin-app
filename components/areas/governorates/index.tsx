import { Governorate } from '@/interfaces'
import { Divider } from '@nextui-org/react'
import React from 'react'
import { AddGovernorate } from './add-governorate'
import { DeleteGovernorate } from './delete-governorate'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { useAreasGovernoratesContext } from '@/context/areas/governorates'

const Governorates = () => {
  const { governorates } = useAreasGovernoratesContext()

  return (
    <div className='w-full mx-auto flex flex-col items-center gap-y-6'>
      <SearchGovernorate />
      <div className='w-full flex flex-col items-center gap-y-6'>
        {governorates?.map((governorate: Governorate, index: number) => (
          <GovernorateCard key={index} governorate={governorate} />
        ))}
      </div>
      {/* add governorate button */}
      <AddGovernorate />
    </div>
  )
}

const GovernorateCard = ({ governorate }: { governorate: Governorate }) => {
  const [showInfos, setShowInfos] = React.useState(false)
  const { id, name, price, orderFee, countryName, additional } = governorate
  const fields = [
    {
      name: 'Order Fees',
      id: 'orderFee',
      defaultValue: orderFee,
      unit: 'SAR / Order',
    },
    {
      name: 'Price',
      id: 'price',
      defaultValue: price,
      unit: 'SAR',
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
          <Divider />
          <div className='flex items-center gap-x-6'>
            <label className='text-gray-500 capitalize'>Coutry</label>
            <p className='font-medium'>{countryName}</p>
          </div>
          <Divider />

          <div className='flex items-center gap-x-6'>
            <label className='text-gray-500 capitalize'>Order Fees</label>
            <div className='h-11 max-w-xs bg-gray-200 rounded px-4 flex justify-between items-center'>
              <input
                id='orderFee'
                name='orderFee'
                type='text'
                //@ts-ignore
                value={orderFee}
                placeholder='0'
                className='bg-transparent w-full h-full outline-none'
                onChange={(e) => {
                  console.log(e.target.value)
                }}
              />
              <span className='text-gray-500 w-32'>SAR / order</span>
            </div>
          </div>
          <Divider />
          <div className='w-full flex items-center justify-between'>
            <div className='flex items-center gap-x-6'>
              <label className='text-gray-500 capitalize'>Price</label>
              <div className='h-11 max-w-xs bg-gray-200 rounded px-4 flex justify-between items-center'>
                <input
                  id='price'
                  name='price'
                  type='text'
                  //@ts-ignore
                  value={price}
                  placeholder='0'
                  className='bg-transparent w-full h-full outline-none'
                  onChange={(e) => {
                    console.log(e.target.value)
                  }}
                />
                <span className='text-gray-500 w-24'>SAR / km</span>
              </div>
            </div>
            <div className='flex items-center gap-x-6'>
              <label className='text-gray-500 capitalize'>Additional</label>
              <div className='h-11 max-w-xs bg-gray-200 rounded px-4 flex justify-between items-center'>
                <input
                  id='additional'
                  name='additional'
                  type='text'
                  //@ts-ignore
                  value={additional}
                  placeholder='0'
                  className='bg-transparent w-full h-full outline-none'
                  onChange={(e) => {
                    console.log(e.target.value)
                  }}
                />
                <span className='text-gray-500 w-24'>SAR / km</span>
              </div>
            </div>
            <div />
          </div>
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
          {countries?.map((country: string, index: number) => (
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
