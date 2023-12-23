import { useMapContext } from '@/context/map'
import React from 'react'

const SelectLocation = () => {
  const { orders, selectedOrder } = useMapContext()
  const selectedOrderData = orders.find((order) => order.id === selectedOrder)

  if (selectedOrderData.location) return null
  return (
    <div className='w-fit flex flex-col items-start gap-y-5 absolute bottom-0 left-4 z-10 pb-4'>
      <div className='flex items-center gap-x-5 bg-white py-2 px-3 rounded'>
        {['latitude', 'longitude'].map((item: string, index: number) => (
          <div className='flex items-center gap-x-3' key={index}>
            <label className='text-gray-600 capitalize'>{item}</label>
            <input
              id={item}
              name={item}
              type='text'
              placeholder='0'
              className='h-9 max-w-[130px] bg-gray-200 rounded px-4'
              onChange={(e) => {
                console.log(e.target.value)
              }}
            />
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className='flex items-center gap-x-5'>
        <button className='h-11 px-5 bg-primary rounded font-medium text-lg shadow-lg hover:bg-opacity-90 transition-all duration-300'>
          Confirm Location
        </button>
        <button className='h-11 px-8 bg-red-500 rounded font-medium text-lg shadow-lg hover:bg-opacity-90 transition-all duration-300'>
          Cancel
        </button>
      </div>
    </div>
  )
}

export default SelectLocation
