import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import {
  BagCheckedIcon,
  BagCrossedIcon,
  BagIcon,
  TrajectoryIcon,
} from '../icons/orders'
import { faker } from '@faker-js/faker'
import { Order, Status } from '@/interfaces'
import { Button, Checkbox } from '@nextui-org/react'
import { useMapContext } from '@/context/MapContext'

const OrdersList = () => {
  const [orders, setOrders] = useState<any[]>([] as any[])
  const { showOrders } = useMapContext()
  const [orderStatus, setOrderStatus] = useState<Status[]>([
    { value: 'Assigned', checked: true },
    { value: 'Cancelled', checked: true },
    { value: 'New', checked: true },
    { value: 'Done', checked: true },
  ])

  const numberOfOrders = (status: string) => {
    return orders.filter((order) => order.status === status).length
  }

  const fetchOrders = () => {
    const arr = []
    for (let i = 0; i < 20; i++) {
      const fakeOrder: any = {
        id: faker.string.uuid(),
        restaurant: faker.company.name(),
        restaurantId: faker.string.uuid(),
        restaurantImage: faker.image.url(),
        customer: faker.person.firstName(),
        customerId: faker.string.uuid(),
        customerImage: faker.image.avatar(),
        duration: faker.number.int(),
        startTime: faker.date.past().getTime(),
        endTime: faker.date.future().getTime(),
        driverId: faker.string.uuid(),
        status: orderStatus[faker.number.int({ max: 3, min: 0 })].value,
      }
      arr.push(fakeOrder)
    }
    setOrders(arr as Order[])
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  if (!showOrders) return null
  return (
    <div className='w-[98%] flex flex-col mx-auto'>
      <Tabs />

      <div className='w-full flex flex-col items-start justify-between z-[100] mb-4'>
        {/* Filters */}
        {/* <div className='w-full grid grid-cols-2 items-start gap-2 bg-white rounded-md p-3 sm:grid-cols-4 lg:grid-cols-2'>
          {orderStatus.map(({ value, checked }, i) => (
            <div
              key={i}
              className='flex items-center justify-between w-full px-2 py-1 bg-white shadow-md rounded-full text-sm font-medium'
            >
              {value}{' '}
              <div className='flex items-center gap-x-1'>
                <span className='text-xs w-5 h-5 text-center p-[2px] bg-gray-200 rounded-full'>
                  {numberOfOrders(value)}
                </span>
                <Checkbox
                  aria-label='Checkbox-order-status'
                  color='warning'
                  labelColor='warning'
                  defaultSelected
                  isRounded
                  value={value}
                  onChange={(checked) => {
                    const newArr = [...orderStatus]
                    newArr[i].checked = checked
                    setOrderStatus(newArr)
                  }}
                ></Checkbox>
              </div>
            </div>
          ))}
        </div> */}
      </div>

      {/* Orders */}
    </div>
  )
}

export default OrdersList

const Tabs = ({ color }: any) => {
  const [openTab, setOpenTab] = React.useState(1)
  const [orders, setOrders] = useState<any[]>([] as any[])
  const { showOrders } = useMapContext()
  const [orderStatus, setOrderStatus] = useState<Status[]>([
    { value: 'Assigned', checked: true },
    { value: 'Cancelled', checked: true },
    { value: 'New', checked: true },
    { value: 'Done', checked: true },
  ])

  const numberOfOrders = (status: string) => {
    return orders.filter((order) => order.status === status).length
  }

  const fetchOrders = () => {
    const arr = []
    for (let i = 0; i < 20; i++) {
      const fakeOrder: any = {
        id: faker.string.uuid(),
        restaurant: faker.company.name(),
        restaurantId: faker.string.uuid(),
        restaurantImage: faker.image.url(),
        customer: faker.person.firstName(),
        customerId: faker.string.uuid(),
        customerImage: faker.image.avatar(),
        duration: faker.number.int(),
        startTime: faker.date.past().getTime(),
        endTime: faker.date.future().getTime(),
        driverId: faker.string.uuid(),
        status: orderStatus[faker.number.int({ max: 3, min: 0 })].value,
      }
      arr.push(fakeOrder)
    }
    setOrders(arr as Order[])
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  return (
    <>
      <div className='flex flex-wrap'>
        <div className='w-full'>
          <ul className='flex list-none flex-wrap pb-4 flex-row' role='tablist'>
            <li className='flex-auto text-center'>
              <a
                className={
                  'text-sm font-bold uppercase p-4 shadow-lg rounded-l-xl block leading-normal ' +
                  (openTab === 1
                    ? ' bg-primary'
                    : 'text-' + color + '-600 bg-white')
                }
                onClick={(e) => {
                  e.preventDefault()
                  setOpenTab(1)
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
                  'text-sm font-bold uppercase p-4 shadow-lg rounded-r-xl block leading-normal ' +
                  (openTab === 2
                    ? 'bg-primary'
                    : 'text-' + color + '-600 bg-white')
                }
                onClick={(e) => {
                  e.preventDefault()
                  setOpenTab(2)
                }}
                data-toggle='tab'
                href='#link2'
                role='tablist'
              >
                Drivers
              </a>
            </li>
          </ul>
          <div className=''>
            <div>
              <div className={openTab === 1 ? 'block' : 'hidden'} id='link1'>
                <Orders orders={orders} orderStatus={orderStatus} />
              </div>
              <div className={openTab === 2 ? 'block' : 'hidden'} id='link2'>
                <p>Drivers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

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

  return (
    <div className='w-full flex flex-col items-center bg-white shadow-lg rounded-md p-2 gap-y-2'>
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
  )
}
