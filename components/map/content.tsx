import React from 'react'
import dynamic from 'next/dynamic'
import { DriverData } from './driver-data'
import OrdersAndDriversTabs from './tabs'
import { useMapContext } from '@/context/map'
import { OrderData } from './order-data'
const Map = dynamic(() => import('./map'), { ssr: false })

export const Content = () => {
  const { showOrders, openTab } = useMapContext()
  const { drivers, orders } = useMapContext()

  return (
    <div className='w-full grid grid-cols-1 gap-x-2 h-[100vh] lg:grid-cols-5'>
      {/* Col 1 */}
      <div
        className={`flex flex-col gap-y-2 h-full overflow-y-auto
      ${showOrders ? 'lg:col-span-4' : 'lg:col-span-5'}
      `}
      >
        {/* Map */}
        <div className='w-full h-full rounded-xl relative'>
          <Map />
        </div>

        {/* Driver | Order Infos */}
        {openTab === 1 ? (
          orders?.length > 0 ? (
            <OrderData />
          ) : (
            <NoData />
          )
        ) : drivers?.length > 0 ? (
          <DriverData />
        ) : (
          <NoData />
        )}
      </div>

      {/* Orders & Drivers */}
      <div className='w-full h-full overflow-y-auto bg-gray-200'>
        <OrdersAndDriversTabs />
      </div>
    </div>
  )
}

const NoData = () => {
  return (
    <div className='w-[80%] h-32 flex flex-col items-start justify-evenly mx-auto relative text-center '>
      <h1 className='text-center'>
        No data found, please add some drivers and orders to see the results.
      </h1>
    </div>
  )
}
