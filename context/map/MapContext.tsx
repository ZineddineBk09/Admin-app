import { Order, Status } from '@/interfaces'
import { faker } from '@faker-js/faker'
import React, { useEffect, useState } from 'react'

export const MapContext = React.createContext({})

export const useMapContext: any = () => React.useContext(MapContext)

export const MapContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [showOrders, setShowOrders] = useState<boolean>(true)
  const [showDrivers, setShowDrivers] = useState<boolean>(true)
  const [orders, setOrders] = useState<any[]>([] as any[])
  const [drivers, setDrivers] = useState<any[]>([] as any[])
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [selectedDriver, setSelectedDriver] = useState<any>(null)
  const [orderStatus, setOrderStatus] = useState<Status[]>([
    { value: 'Assigned', checked: true },
    { value: 'Cancelled', checked: true },
    { value: 'New', checked: true },
    { value: 'Done', checked: true },
  ])
  const [driverStatus, setDriverStatus] = useState<Status[]>([
    { value: 'Available', checked: true },
    { value: 'Busy', checked: true },
    { value: 'Inactive', checked: true },
  ])

  const handleToggleOrders = () => {
    setShowOrders(!showOrders)
  }

  const handleToggleDrivers = () => {
    setShowDrivers(!showDrivers)
  }

  const handleSelectOrder = (id: string) => {
    setSelectedOrder(id)
  }

  const handleSelectDriver = (id: string) => {
    setSelectedDriver(id)
  }

  const fetchOrders = () => {
    const arr = []
    for (let i = 0; i < 20; i++) {
      const fakeOrder: any = {
        id: faker.number.int({ min: 1000, max: 10000 }),
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

  const fetchDrivers = () => {
    const arr = []
    for (let i = 0; i < 20; i++) {
      const fakeDriver: any = {
        id: faker.number.int({ min: 1000, max: 10000 }),
        username: faker.person.fullName(),
        email: faker.internet.email(),
        team: faker.company.name(),
        completedTasks: faker.number.int({ max: 100, min: 0 }),
        inProgressTasks: faker.number.int({ max: 100, min: 0 }),
        warnings: faker.number.int({ max: 20, min: 0 }),
        activeHours: faker.number.int({ max: 300, min: 0 }),
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
    setDrivers(arr as any[])
  }

  useEffect(() => {
    fetchOrders()
    fetchDrivers()
    setSelectedDriver(drivers[0]?.id)
    setSelectedOrder(orders[0]?.id)
  }, [])

  return (
    <MapContext.Provider
      value={{
        drivers,
        orders,
        showOrders,
        showDrivers,
        selectedOrder,
        selectedDriver,
        handleSelectOrder,
        handleSelectDriver,
        handleToggleOrders,
        handleToggleDrivers,
      }}
    >
      {children}
    </MapContext.Provider>
  )
}
