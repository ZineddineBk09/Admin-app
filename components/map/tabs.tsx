import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import {
  BagCheckedIcon,
  BagCrossedIcon,
  BagIcon,
  TrajectoryIcon,
} from '../icons/orders'
import { Driver, Order, Status } from '@/interfaces'
import { Card } from '@nextui-org/react'
import { useMapContext } from '@/context/map/MapContext'
import { DriverInboxIcon, DriverOrdersIcon } from '../icons/drivers'
import { truncateTxt } from '@/utils'

const Lists = () => {
  const { showOrders } = useMapContext()

  if (!showOrders) return null
  return (
    <div className='w-full flex flex-col mx-auto'>
      <Tabs />
    </div>
  )
}

const Tabs = ({ color }: any) => {
  const orderStatus = [
    { value: 'Assigned', checked: true },
    { value: 'Cancelled', checked: true },
    { value: 'New', checked: true },
    { value: 'Done', checked: true },
  ]
  const driverStatus = [
    { value: 'Available', checked: true },
    { value: 'Busy', checked: true },
    { value: 'Inactive', checked: true },
  ]
  const { drivers, orders, openTab, hansleSelectTab } = useMapContext()

  return (
    <>
      <div className='flex flex-wrap bg-transparent'>
        <div className='w-full'>
          <ul className='flex list-none flex-wrap pb-4 flex-row' role='tablist'>
            <li className='flex-auto text-center'>
              <a
                className={
                  'text-sm font-bold uppercase px-4 py-3 shadow-lg rounded-l-xl block leading-normal ' +
                  (openTab === 1
                    ? ' bg-primary'
                    : 'text-' + color + '-600 bg-white')
                }
                onClick={(e) => {
                  e.preventDefault()
                  hansleSelectTab(1)
                }}
                data-toggle='tab'
                href='#link1'
                role='tablist'
              >
                Orders
              </a>
            </li>
            <li className='flex-auto text-center'>
              <a
                className={
                  'text-sm font-bold uppercase px-4 py-3 shadow-lg rounded-r-xl block leading-normal ' +
                  (openTab === 2
                    ? 'bg-primary'
                    : 'text-' + color + '-600 bg-white')
                }
                onClick={(e) => {
                  e.preventDefault()
                  hansleSelectTab(2)
                }}
                data-toggle='tab'
                href='#link2'
                role='tablist'
              >
                Drivers
              </a>
            </li>
          </ul>
          <div>
            <div>
              <div className={openTab === 1 ? 'block' : 'hidden'} id='link1'>
                <Orders orders={orders} orderStatus={orderStatus} />
              </div>
              <div className={openTab === 2 ? 'block' : 'hidden'} id='link2'>
                <Drivers drivers={drivers} driverStatus={driverStatus} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Lists


const Orders = ({ orders, orderStatus }: { orders: any; orderStatus: any }) => {
  return (
    <div className='w-full h-full flex flex-col items-center gap-y-3 overflow-y-auto'>
      {/* Render filtere */}
      {orders
        .filter((order: any) =>
          orderStatus.some(
            (status: any) => status.value === order.status && status.checked
          )
        )
        .map((order: any) => (
          <OrderCard key={order.id} order={order} />
        ))}
    </div>
  )
}

const OrderCard = ({ order }: { order: any }) => {
  const {
    restaurant,
    customer,
    startTime,
    endTime,
    customerImage,
    restaurantImage,
    status,
  } = order
  // status color: green ==> done, yellow ==> assigned, red ==> cancelled, gray ==> new
  const statusColor =
    status === 'Done'
      ? '#64EA8A'
      : status === 'Assigned'
      ? '#FFDB00'
      : status === 'Cancelled'
      ? '#F04646'
      : '#5E5E5E'

  const { handleSelectOrder, selectedOrder } = useMapContext()
  const [selected, setSelected] = useState(false)

  useEffect(() => {
    if (selectedOrder === order.id) setSelected(true)
    else setSelected(false)
  }, [selectedOrder])

  return (
    <Card isPressable onClick={() => handleSelectOrder(order.id)}>
      <Card.Body className='p-0 w-full'>
        <div
          className={`w-full flex flex-col items-center rounded-md p-2 gap-y-2 ${
            selected ? 'bg-primary-light' : ''
          }`}
        >
          {/* Restaurant and customer */}
          <div className='w-full flex items-center justify-between'>
            <div className='flex items-center gap-x-2'>
              <Image
                src={restaurantImage || '/images/logo.png'}
                alt='restaurant'
                objectFit='cover'
                className='rounded-md'
                width={40}
                height={40}
              />
              <p className='text-xs'>{restaurant}</p>
            </div>
            <div className='flex items-center gap-x-2'>
              <p className='text-xs'>{customer}</p>
              <Image
                src={customerImage || '/images/logo.png'}
                alt='customer'
                objectFit='cover'
                className='rounded-md'
                width={40}
                height={40}
              />
            </div>
          </div>

          {/* Duration */}
          <div className='w-full mx-auto flex items-center justify-center gap-x-2'>
            <div className='flex flex-col items-center gap-y-1'>
              <BagIcon color={statusColor} />
              <span className='text-xs'>
                {new Date(startTime).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>

            <div className='relative'>
              <TrajectoryIcon color={statusColor} />
              <div className='flex items-center justify-center font-semibold absolute left-[calc(50%-18px)] top-[calc(50%-18px)] bg-gray-300 rounded-full w-9 h-9 z-10'>
                NA
              </div>
            </div>

            <div className='flex flex-col items-center gap-y-1'>
              {
                //@ts-ignore
                {
                  Done: <BagCheckedIcon color={statusColor} />,
                  Assigned: <BagCheckedIcon />,
                  Cancelled: <BagCrossedIcon />,
                  New: <BagCheckedIcon />,
                }[status]
              }
              <span className='text-xs'>
                {new Date(endTime).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  )
}

const Drivers = ({
  drivers,
  driverStatus,
}: {
  drivers: any
  driverStatus: any
}) => {
  return (
    <div className='w-full h-full flex flex-col items-center gap-y-3 overflow-y-auto px-2'>
      {drivers
        .slice(0, drivers.length / 2)
        .filter((dr: any) =>
          driverStatus.some(
            (status: any) => status.value === dr.status && status.checked
          )
        )
        .map((driver: any) => (
          <DriverCard key={driver.id} driver={driver} />
        ))}
    </div>
  )
}

const DriverCard = ({ driver }: { driver: Driver }) => {
  const { username, image, status, orders } = driver
  const { handleSelectDriver, selectedDriver } = useMapContext()
  const [selected, setSelected] = useState(false)

  useEffect(() => {
    if (selectedDriver === driver.id) setSelected(true)
    else setSelected(false)
  }, [selectedDriver])

  return (
    <Card
      isPressable
      isHoverable
      className='p-0 rounded-l-full overflow-hidden rounded-r-md'
      onClick={() => handleSelectDriver(driver.id)}
    >
      <Card.Body className='p-0 w-full overflow-hidden'>
        <div
          className={`h-20 w-full ml-auto flex items-center gap-x-5 p-2 rounded-l-full  ${
            selected ? 'bg-primary-light' : ''
          }`}
        >
          {/* Image */}
          <Image
            src={image}
            alt='Driver Image'
            objectFit='cover'
            width={95}
            height={90}
            className='rounded-full m-auto'
          />

          {/* Infos */}
          <div className='h-full w-full flex flex-col text-gray-500'>
            <p className='text-sm'>{truncateTxt(username, 25)}</p>
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
                      status === 'Available'
                        ? 'bg-green-400'
                        : status === 'Busy'
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
      </Card.Body>
    </Card>
  )
}
