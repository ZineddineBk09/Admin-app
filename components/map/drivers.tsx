import { Driver, Status } from '@/interfaces'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { faker } from '@faker-js/faker'
import { DriverInboxIcon, DriverOrdersIcon } from '../icons/drivers'
import { truncateTxt } from '@/utils'
import { Checkbox, Tooltip } from '@nextui-org/react'
import { useMapContext } from '@/context/map/MapContext'

const DriversList = () => {
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

export default DriversList

const DriverCard = ({ driver }: { driver: Driver }) => {
  const { username, image, status, orders } = driver
  return (
    <Tooltip
      className='text-md'
      content={
        <div className='w-fit flex flex-col items-start gap-y-2'>
          <div className='flex items-center gap-x-2'>
            <p className='text-black text-xs font-medium w-20'>Username</p>
            <p className='text-gray-500 text-xs'>{driver.username}</p>
          </div>
          <div className='flex items-center gap-x-2'>
            <p className='text-black text-xs font-medium w-20'>Phone</p>
            <p className='text-gray-500 text-xs'>{driver.phone}</p>
          </div>
          <div className='flex items-center gap-x-2'>
            <p className='text-black text-xs font-medium w-20'>Orders</p>
            <p className='text-gray-500 text-xs'>{driver.orders}</p>
          </div>
          <div className='flex items-center gap-x-2'>
            <p className='text-black text-xs font-medium w-20'>Status</p>
            <span
              className={`py-1 px-3 rounded-full  text-xs ${
                status === 'available'
                  ? 'bg-green-400'
                  : status === 'busy'
                  ? 'bg-orange-500'
                  : 'bg-gray-400'
              }`}
            >
              {status}
            </span>
          </div>
          <div className='flex items-center gap-x-2'>
            <p className='text-black text-xs font-medium w-20'>Location</p>
            <p className='text-gray-500 text-xs'>
              {driver?.location?.latitude}, {driver?.location?.longitude}
            </p>
          </div>
        </div>
      }
    >
      <div className='w-56 h-20 mx-auto flex items-center gap-x-5 p-2 rounded-l-full rounded-r-md bg-white shadow-[1px_1px_10px_1px_rgba(0,0,0,0.3)]'>
        {/* Image */}
        <Image
          src={image}
          alt='Driver Image'
          objectFit='cover'
          width={125}
          height={125}
          className='rounded-full m-auto'
        />

        {/* Infos */}
        <div className='h-full w-full flex flex-col text-gray-500'>
          <p className='text-sm'>{truncateTxt(username, 16)}</p>
          <div className='w-full flex items-center justify-between'>
            <div className='flex items-end gap-x-1'>
              <DriverOrdersIcon />
              <small>{orders}</small>
            </div>

            <DriverInboxIcon />
          </div>

          <div className='w-full flex items-center justify-between'>
            <div />
            <p className='mt-1 text-black font-medium tracking-wide'>
              {
                <span
                  className={`py-1 px-3 rounded-full text-xs ${
                    status === 'available'
                      ? 'bg-green-400'
                      : status === 'busy'
                      ? 'bg-orange-500'
                      : 'bg-gray-400'
                  }`}
                >
                  {status}
                </span>
              }
            </p>
          </div>
        </div>
      </div>
    </Tooltip>
  )
}
