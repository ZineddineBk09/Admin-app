import React from 'react'
import dynamic from 'next/dynamic'
import { DriverData, OrderData } from './drivers'
import OrdersList from './orders'
import { useMapContext } from '@/context/map/MapContext'
const Map = dynamic(() => import('./map'), { ssr: false })

export const Content = () => {
  const { showOrders, openTab} = useMapContext()
  const { drivers, orders } = useMapContext()

  return (
    <div className='w-full grid grid-cols-1 gap-x-2 h-[100vh] lg:grid-cols-4'>
      {/* Col 1 */}
      <div
        className={`flex flex-col gap-y-2 h-full overflow-y-auto
      ${showOrders ? 'lg:col-span-3' : 'lg:col-span-4'}
      `}
      >
        {/* Map */}
        <div className='w-full h-full rounded-xl relative'>
          <Map drivers={drivers} />
        </div>

        {/* Driver & Order Infos */}
        {/* {openTab === 1 ? <OrderData /> : <DriverData />} */}
        <DriverData />
      </div>

      {/* Orders & Drivers */}
      <div className='w-full h-full overflow-y-auto bg-gray-200'>
        <OrdersList />
      </div>
    </div>
  )
}
