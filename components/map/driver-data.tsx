import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useMapContext } from '../../context/map'
import { MapDriver } from '../../interfaces'
import toast from 'react-hot-toast'
import { cancelRecord } from '../../lib/api'
import { InactivateDriver } from './inactivate-driver'

export const DriverData = () => {
  const { drivers, selectedDriver, statusColor } = useMapContext()
  const [driver, setDriver] = useState<MapDriver>(drivers[0])

  useEffect(() => {
    if (selectedDriver) {
      const driver = drivers.find(
        (d: MapDriver) => d.id === selectedDriver
      ) as MapDriver
      setDriver(driver)
    } else {
      setDriver(drivers[0])
    }
  }, [selectedDriver])

  return (
    <div className='w-[80%] flex items-start justify-evenly mx-auto h-fit relative p-4'>
      {/* Image & Status */}
      <div className='flex flex-col items-center gap-y-3'>
        <Image
          src={driver?.image}
          alt={driver?.user.username}
          width={120}
          height={120}
          className='rounded-full'
        />
        <span
          className={`py-2 px-6 rounded-full font-medium ${statusColor(
            driver.status
          )}`}
        >
          {driver?.status}
        </span>
      </div>

      {/* Personal Infos */}
      <div className='flex flex-col gap-y-2 ml-4 items-start'>
        <div className='flex flex-col items-end'>
          <p className='text-xl text-gray-600 font-medium'>
            {driver?.user.username}
          </p>
          <span className='text-sm'>#{driver?.id}</span>
        </div>

        <p className='text-[#59AFFF] font-medium my-3'>
          <span className='mr-2'>call:</span>
          {driver?.phone_number}
        </p>
        <div className='w-full flex items-center justify-between gap-x-3'>
          <span className='text-sm text-gray-500 font-medium'>
            Delivered Orders
          </span>
          <span className='text-md font-medium'>100</span>
        </div>
        <div className='w-full flex items-center justify-between gap-x-3'>
          <span className='text-sm text-gray-500 font-medium'>
            Canceled Orders
          </span>
          <span className='text-md font-medium'>100</span>
        </div>
        <div className='w-full  flex items-center justify-between gap-x-3'>
          <span className='text-sm text-gray-500 font-medium'>Warnings</span>
          <span className='text-md font-medium'>4</span>
        </div>
        <div className='w-full  flex items-center justify-between gap-x-3'>
          <span className='text-sm text-gray-500 font-medium'>
            Active Hours
          </span>
          <span className='text-md font-medium'>240</span>
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
        <InactivateDriver id={driver.id} />
      </div>
    </div>
  )
}
