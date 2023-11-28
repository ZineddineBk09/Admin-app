import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useMapContext } from '@/context/map/MapContext'

export const DriverData = () => {
  const { drivers, selectedDriver, showDrivers } = useMapContext()
  const [driver, setDriver] = useState<any>(null)

  useEffect(() => {
    if (selectedDriver) {
      const driver = drivers.find((d: any) => d.id === selectedDriver)
      setDriver(driver)
    } else {
      setDriver(drivers[0])
    }
  }, [selectedDriver])

  if (!showDrivers) return null
  return (
    <div className='w-[80%] flex items-start justify-evenly mx-auto h-fit relative p-4'>
      {/* Image & Status */}
      <div className='flex flex-col items-center gap-y-3'>
        <Image
          src={driver?.image}
          alt={driver?.username}
          width={120}
          height={120}
          className='rounded-full'
        />
        <span
          className={`py-2 px-6 rounded-full font-medium ${
            driver?.status === 'Available'
              ? 'bg-green-400'
              : driver?.status === 'Busy'
              ? 'bg-orange-500'
              : 'bg-gray-400'
          }`}
        >
          {driver?.status}
        </span>
      </div>

      {/* Personal Infos */}
      <div className='flex flex-col gap-y-2 ml-4 items-start'>
        <div className='flex flex-col items-end'>
          <p className='text-xl text-gray-600 font-medium'>
            {driver?.username}
          </p>
          <span className='text-sm'>#{driver?.id}</span>
        </div>

        <p className='text-[#59AFFF] font-medium my-3'>
          <span className='mr-2'>call:</span>
          {driver?.phone}
        </p>
        <div className='w-full flex items-center justify-between gap-x-3'>
          <span className='text-sm text-gray-500 font-medium'>
            Delivered Orders
          </span>
          <span className='text-md font-medium'>{driver?.completedTasks}</span>
        </div>
        <div className='w-full flex items-center justify-between gap-x-3'>
          <span className='text-sm text-gray-500 font-medium'>
            Canceled Orders
          </span>
          <span className='text-md font-medium'>{driver?.inProgressTasks}</span>
        </div>
        <div className='w-full  flex items-center justify-between gap-x-3'>
          <span className='text-sm text-gray-500 font-medium'>Warnings</span>
          <span className='text-md font-medium'>{driver?.warnings}</span>
        </div>
        <div className='w-full  flex items-center justify-between gap-x-3'>
          <span className='text-sm text-gray-500 font-medium'>
            Active Hours
          </span>
          <span className='text-md font-medium'>{driver?.activeHours}</span>
        </div>
      </div>

      {/* Buttons */}
      <div className='h-full flex flex-col justify-center gap-y-5'>
        <button className='h-11 px-12 bg-gray-400 rounded font-medium text-lg shadow-lg hover:bg-opacity-90 transition-all duration-300'>
          Attach Order
        </button>
        <button className='h-11 px-12 bg-gray-400 rounded font-medium text-lg shadow-lg hover:bg-opacity-90 transition-all duration-300'>
          Warning
        </button>
        <button className='h-11 px-12 bg-red-500 rounded font-medium text-lg shadow-lg hover:bg-opacity-90 transition-all duration-300'>
          Inactivate
        </button>
      </div>
    </div>
  )
}

export const OrderData = () => {
  const { orders, selectedOrder, showOrders } = useMapContext()
  const [driver, setDriver] = useState<any>(null)

  useEffect(() => {
    if (selectedOrder) {
      const driver = orders.find((d: any) => d.id === selectedOrder)
      setDriver(driver)
    } else {
      setDriver(orders[0])
    }
  }, [selectedOrder])

  if (!showOrders) return null
  return (
    <div className='w-[80%] flex items-start justify-evenly mx-auto h-fit relative p-4'>
      {/* Image & Status */}
      <div className='flex flex-col items-center gap-y-3'>
        <Image
          src={driver?.image}
          alt={driver?.username}
          width={120}
          height={120}
          className='rounded-full'
        />
        <span
          className={`py-2 px-6 rounded-full font-medium ${
            driver?.status === 'Available'
              ? 'bg-green-400'
              : driver?.status === 'Busy'
              ? 'bg-orange-500'
              : 'bg-gray-400'
          }`}
        >
          {driver?.status}
        </span>
      </div>

      {/* Personal Infos */}
      <div className='flex flex-col gap-y-2 ml-4 items-start'>
        <div className='flex flex-col items-end'>
          <p className='text-xl text-gray-600 font-medium'>
            {driver?.username}
          </p>
          <span className='text-sm'>#{driver?.id}</span>
        </div>

        <p className='text-[#59AFFF] font-medium my-3'>
          <span className='mr-2'>call:</span>
          {driver?.phone}
        </p>
        <div className='w-full flex items-center justify-between gap-x-3'>
          <span className='text-sm text-gray-500 font-medium'>
            Delivered Orders
          </span>
          <span className='text-md font-medium'>{driver?.completedTasks}</span>
        </div>
        <div className='w-full flex items-center justify-between gap-x-3'>
          <span className='text-sm text-gray-500 font-medium'>
            Canceled Orders
          </span>
          <span className='text-md font-medium'>{driver?.inProgressTasks}</span>
        </div>
        <div className='w-full  flex items-center justify-between gap-x-3'>
          <span className='text-sm text-gray-500 font-medium'>Warnings</span>
          <span className='text-md font-medium'>{driver?.warnings}</span>
        </div>
        <div className='w-full  flex items-center justify-between gap-x-3'>
          <span className='text-sm text-gray-500 font-medium'>
            Active Hours
          </span>
          <span className='text-md font-medium'>{driver?.activeHours}</span>
        </div>
      </div>

      {/* Buttons */}
      <div className='h-full flex flex-col justify-center gap-y-5'>
        <button className='h-11 px-12 bg-gray-400 rounded font-medium text-lg shadow-lg hover:bg-opacity-90 transition-all duration-300'>
          Attach Order
        </button>
        <button className='h-11 px-12 bg-gray-400 rounded font-medium text-lg shadow-lg hover:bg-opacity-90 transition-all duration-300'>
          Warning
        </button>
        <button className='h-11 px-12 bg-red-500 rounded font-medium text-lg shadow-lg hover:bg-opacity-90 transition-all duration-300'>
          Inactivate
        </button>
      </div>
    </div>
  )
}
