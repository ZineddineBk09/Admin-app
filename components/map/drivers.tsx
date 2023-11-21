import { Driver, Status } from '@/interfaces'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { faker } from '@faker-js/faker'
import { DriverInboxIcon, DriverOrdersIcon } from '../icons/drivers'
import { truncateTxt } from '@/utils'
import { Checkbox, Tooltip } from '@nextui-org/react'
import { useMapContext } from '@/context/MapContext'

const DriversList = () => {
  const [driverStatus, setDriverStatus] = useState<Status[]>([
    { value: 'Available', checked: true },
    { value: 'Busy', checked: true },
    { value: 'Inactive', checked: true },
  ])
  const [drivers, setDrivers] = useState<Driver[]>([] as Driver[])
  const { showDrivers } = useMapContext()

  const fetchDrivers = () => {
    const arr = []
    for (let i = 0; i < 20; i++) {
      const fakeDriver: Driver = {
        id: faker.string.uuid(),
        username: faker.person.fullName(),
        email: faker.internet.email(),
        team: faker.company.name(),
        completedTasks: faker.number.int({ max: 100, min: 0 }),
        inProgressTasks: faker.number.int({ max: 100, min: 0 }),
        image: faker.image.avatar(),
        status: driverStatus[faker.number.int({ max: 2, min: 0 })].value as any,
        location: {
          latitude: faker.location.latitude({ max: 22, min: 21 }),
          longitude: faker.location.longitude({
            max: 40,
            min: 39,
          }),
        },
        orders: faker.number.int({
          max: 10,
          min: 0,
        }),
        phone: faker.phone.number(),
      }
      arr.push(fakeDriver)
    }
    setDrivers(arr as Driver[])
  }

  useEffect(() => {
    fetchDrivers()
  }, [])

  const numberOfDrivers = (status: string) => {
    return drivers.filter((driver) => driver.status === status).length
  }

  if (!showDrivers) return null
  return (
    <div className='w-[100%] flex flex-col mx-auto h-fit relative pl-2'>
      {/*  Title & drivers states */}
      <div className='w-full flex items-center justify-between z-[100]'>
        <h1 className='font-semibold text-2xl'>Drivers</h1>
        <div className='flex items-center gap-x-2'>
          {driverStatus.map(({ value, checked }, i) => (
            <div
              key={i}
              className='flex items-center gap-x-1 px-2 py-1 bg-white shadow-md rounded-full text-xs font-medium'
            >
              {value}{' '}
              <div className='flex items-center gap-x-1 ml-4'>
                <span className='text-xs w-5 h-5 text-center p-[2px] bg-gray-200 rounded-full'>
                  {numberOfDrivers(value)}
                </span>
                <Checkbox
                  aria-label='Checkbox-driver-status'
                  color='warning'
                  labelColor='warning'
                  defaultSelected
                  isRounded
                  value={value}
                  size='md'
                  onChange={(checked) => {
                    const newArr = [...driverStatus]
                    newArr[i].checked = checked
                    setDriverStatus(newArr)
                  }}
                ></Checkbox>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Drivers */}
      <div>
        {/* List 01 */}
        <div className='overflow-x-scroll'>
          <div className={`w-[98%] mx-auto grid grid-flow-col gap-x-4 my-4`}>
            {drivers
              .slice(0, drivers.length / 2)
              .filter((dr) =>
                driverStatus.some(
                  (status) => status.value === dr.status && status.checked
                )
              )
              .map((driver) => (
                <DriverCard key={driver.id} driver={driver} />
              ))}
          </div>

          {/* List 02 */}
          <div className={`w-[98%] mx-auto grid grid-flow-col gap-x-4 my-4`}>
            {drivers
              .slice(drivers.length / 2, drivers.length)
              .filter((dr) =>
                driverStatus.some(
                  (status) => status.value === dr.status && status.checked
                )
              )
              .map((driver) => (
                <DriverCard key={driver.id} driver={driver} />
              ))}
          </div>
        </div>
        {/* right white shadow */}
        {drivers.length > 0 && (
          <div className='w-40 absolute top-0 bottom-4 right-0 bg-gradient-to-l from-white  rounded-md rounded-tr-lg p-2 gap-y-4 ml-20 lg:bottom-0' />
        )}
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
