import React from 'react'
import { Driver, Order } from '@/interfaces'
import { faker } from '@faker-js/faker'
import dynamic from 'next/dynamic'
import DriversList from './drivers'
import OrdersList from './orders'
import { useMapContext } from '@/context/MapContext'
const Map = dynamic(() => import('./map'), { ssr: false })

export const Content = () => {
  const { showOrders } = useMapContext()
  const driverStatus = ['Available', 'Busy', 'Inactive']
  const drivers: any[] = []
  const orders: any[] = []

  for (let i = 0; i < 20; i++) {
    const fakeOrder: any = {
      id: faker.string.uuid(),
      restaurant: faker.company.name(),
      restaurantId: faker.string.uuid(),
      restaurantImage: faker.image.url(),
      customer: faker.string.sample(),
      customerId: faker.string.uuid(),
      customerImage: faker.image.avatar(),
      duration: faker.number.int(),
      startTime: faker.date.past().getTime(),
      endTime: faker.date.future().getTime(),
      driverId: faker.string.uuid(),
      status: faker.string.sample(),
    }
    orders.push(fakeOrder)

    const fakeDriver: any = {
      id: faker.string.uuid(),
      username: faker.person.fullName(),
      email: faker.internet.email(),
      team: faker.company.name(),
      completedTasks: faker.number.int({ max: 100, min: 0 }),
      inProgressTasks: faker.number.int({ max: 100, min: 0 }),
      image: faker.image.avatar(),
      status: driverStatus[faker.number.int({ max: 2, min: 0 })] as any,
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
    drivers.push(fakeDriver)
  }

  return (
    <div className='w-full grid grid-cols-1 gap-x-2 lg:h-[100vh] lg:grid-cols-4'>
      {/* Col 1 */}
      <div
        className={`flex flex-col gap-y-2 h-full overflow-y-auto
      ${showOrders ? 'lg:col-span-3' : 'lg:col-span-4'}
      `}
      >
        {/* Map */}
        <div className='w-full min-h-[500px] h-full rounded-xl relative'>
          <Map drivers={drivers} />
        </div>

        {/* Drivers */}
        <DriversList />
      </div>

      {/* Orders */}
      <div className='w-full h-full overflow-y-auto'>
        <OrdersList />
      </div>
    </div>
  )
}
