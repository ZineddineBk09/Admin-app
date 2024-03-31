import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useMapContext } from '../../context/map'
import { BagCheckedIcon, BagIcon, TrajectoryIcon } from '../icons/orders'
import { MapIcon } from '../icons/sidebar'
import { Item, Order } from '../../interfaces'

export const OrderData = () => {
  const { orders, selectedOrder, showOrders } = useMapContext()
  const [order, setOrder] = useState<Order>({} as Order)

  useEffect(() => {
    if (selectedOrder) {
      const order = orders.find((d: any) => d.id === selectedOrder)
      setOrder(order)
    } else {
      setOrder(orders[0])
    }
  }, [selectedOrder])

  if (!showOrders) return null
  return (
    <div className='w-[95%] flex flex-col items-center justify-evenly mx-auto h-fit relative p-4 lg:items-start lg:flex-row'>
      {/*  Order, Buttons, and Oder Items*/}
      <div className='flex flex-col'>
        <h1 className='text-xl font-bold mb-5'>Order #{order?.id}</h1>

        <div className='flex items-center'>
          {/* Buttons */}
          <OrderActions />

          {/* Vertical devider */}
          <div className='h-40 w-1 bg-gray-300 mx-5' />

          {/* Order Items */}
          <div className='h-24 flex flex-col justify-between items-start gap-y-2'>
            {/* {order?.items?.map((item: Item, index: number) => (
              <div
                key={index}
                className='flex items-center gap-x-2 text-gray-500 text-sm font-medium'
              >
                <span>x{item.quantity}</span>
                <span>{item.name}</span>
              </div>
            ))} */}
          </div>
        </div>
      </div>

      {/* Order trajectory, Restaurant, and Client */}
      <div className='flex flex-col items-center gap-y-5'>
        {/* Trajectory */}
        <div className='flex items-center gap-x-3 mb-3'>
          <MapIcon width='9 h-9' />
          <div className='flex flex-col items-center -mb-3'>
            <TrajectoryIcon color='gray' />
            <b className='text-xs'>30 min</b>
          </div>
          <BagIcon color='gray' width='9 h-9' />
          <div className='flex flex-col items-center -mb-3'>
            <TrajectoryIcon color='gray' />
            <b className='text-xs'>30 min</b>
          </div>
          <BagCheckedIcon width='9 h-9' color='gray' />
        </div>

        {/* Resaturant and Customer */}
        <div className='w-full flex items-start justify-between'>
          <div className='flex flex-col items-start text-sm gap-y-1'>
            <Image
              src={'/images/logo.png'}
              alt='customer'
              objectFit='cover'
              className='rounded-md'
              width={70}
              height={70}
            />
            <span className='font-semibold'>{order?.client?.account.name}</span>
            <span className='text-gray-500'>
              {order?.client?.address.city.name}
            </span>
            {/* <span className='text-[#59AFFF]'>{order?.client?.phone}</span> */}
          </div>

          <div className='flex flex-col items-end text-sm gap-y-1'>
            <Image
              src={'/images/logo.png'}
              alt='customer'
              objectFit='cover'
              className='rounded-md'
              width={70}
              height={70}
            />
            <span className='font-semibold'>{order?.customer?.name}</span>
            <span className='text-gray-500'>{order?.customer?.name}</span>
            {/* <span className='text-[#59AFFF]'>{order?.customer?.phone}</span> */}
          </div>
        </div>
      </div>
    </div>
  )
}

const OrderActions = () => {
  const { orders, selectedOrder } = useMapContext()
  const [order, setOrder] = useState<Order>({} as Order)

  useEffect(() => {
    if (selectedOrder) {
      const order = orders.find((d: any) => d.id === selectedOrder)
      setOrder(order)
    } else {
      setOrder(orders[0])
    }
  }, [selectedOrder])

  return (
    <div className='h-full flex flex-col justify-center gap-y-5'>
      {order?.delivery_address.latitude ? (
        <>
          {' '}
          <button className='h-11 px-12 bg-gray-400 rounded font-medium text-lg shadow-lg hover:bg-opacity-90 transition-all duration-300'>
            Assign Driver
          </button>
          <button className='h-11 px-12 bg-gray-400 rounded font-medium text-lg shadow-lg hover:bg-opacity-90 transition-all duration-300'>
            Deliver
          </button>
          <button className='h-11 px-12 bg-gray-400 rounded font-medium text-lg shadow-lg hover:bg-opacity-90 transition-all duration-300'>
            Edit
          </button>
          <button className='h-11 px-12 bg-red-500 rounded font-medium text-lg shadow-lg hover:bg-opacity-90 transition-all duration-300'>
            Cancel
          </button>
        </>
      ) : (
        <>
          <button className='h-11 px-12 bg-red-500 rounded font-medium text-lg shadow-lg hover:bg-opacity-90 transition-all duration-300'>
            Cancel
          </button>
        </>
      )}
    </div>
  )
}
