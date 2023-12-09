import { Order, Status } from '@/interfaces'
import { faker } from '@faker-js/faker'
import React, { useEffect, useState } from 'react'

export const MapContext = React.createContext({})

export const useMapContext: {
  (): {
    drivers: any[]
    orders: any[]
    showOrders: boolean
    showDrivers: boolean
    selectedOrder: string
    selectedDriver: string
    handleSelectOrder: (id: string) => void
    handleSelectDriver: (id: string) => void
    handleToggleOrders: () => void
    handleToggleDrivers: () => void
    openTab: number
    hansleSelectTab: (tab: number) => void
  }
} = () => React.useContext(MapContext as any)

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
  const [openTab, setOpenTab] = React.useState(1)
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

  const hansleSelectTab = (tab: number) => {
    setOpenTab(tab)
  }

  const fetchOrders = () => {
    const arr = []
    for (let i = 0; i < 20; i++) {
      const fakeOrder: any = {
        id: faker.number.int({ min: 1000, max: 10000 }),
        restaurant: faker.company.name(),
        restaurantId: faker.string.uuid(),
        restaurantImage: faker.image.url(),
        restaurantAddress: faker.location.streetAddress(),
        restaurantPhone: faker.phone.number(),
        customer: faker.person.firstName(),
        customerId: faker.string.uuid(),
        customerImage: faker.image.avatar(),
        customerAddress: faker.location.streetAddress(),
        customerPhone: faker.phone.number(),
        duration: faker.number.int(),
        startTime: faker.date.past().getTime(),
        endTime: faker.date.future().getTime(),
        driverId: faker.string.uuid(),
        status: orderStatus[faker.number.int({ max: 3, min: 0 })].value,
        items: [
          {
            name: faker.commerce.productName(),
            quantity: faker.number.int({ max: 5, min: 1 }),
          },
          {
            name: faker.commerce.productName(),
            quantity: faker.number.int({ max: 5, min: 1 }),
          },
          {
            name: faker.commerce.productName(),
            quantity: faker.number.int({ max: 5, min: 1 }),
          },
        ],
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
  }, [])

  useEffect(() => {
    setSelectedDriver(drivers[0]?.id)
    setSelectedOrder(orders[0]?.id)
  }, [drivers, orders])

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
        openTab,
        hansleSelectTab,
      }}
    >
      {children}
    </MapContext.Provider>
  )
}
