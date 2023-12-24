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
    setDrivers: (drivers: any[]) => void
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
    console.log('select driver: ', id)
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
      const fakeOrder: Order = {
        id: faker.number.int({ min: 1000, max: 10000 }).toString(),
        date: faker.date.past().toLocaleDateString(),
        value: faker.number.int({ max: 1000, min: 0 }),
        client: {
          name: faker.company.name(),
          id: faker.string.uuid(),
          image: faker.image.url(),
          address: faker.location.streetAddress(),
          phone: faker.phone.number(),
        },
        customer: {
          id: faker.string.uuid(),
          name: faker.person.firstName(),
          image: faker.image.avatar(),
          address: faker.location.streetAddress(),
          phone: faker.phone.number(),
        },
        duration: faker.number.int(),
        startTime: faker.date.past().getTime(),
        endTime: faker.date.future().getTime(),
        distance: faker.number.int(),
        time: faker.date.past().toLocaleTimeString(),
        driverId: faker.string.uuid(),
        driverName: faker.person.firstName(),
        city: faker.address.city(),
        status: orderStatus[faker.number.int({ max: 3, min: 0 })].value,
        deliveryFee: faker.number.int({ max: 100, min: 0 }),
        location:
          faker.number.int({ max: 2, min: 1 }) == 1
            ? {
                latitude: faker.location.latitude({ max: 22, min: 21 }),
                longitude: faker.location.longitude({
                  max: 40,
                  min: 39,
                }),
              }
            : null,
        items: Array.from(
          { length: faker.number.int({ max: 5, min: 1 }) },
          () => ({
            id: faker.number.int({ min: 1000, max: 10000 }).toString(),
            name: faker.commerce.productName(),
            quantity: faker.number.int({ max: 5, min: 1 }),
          })
        ),
        clientPaid: faker.datatype.boolean(),
        driverPaid: faker.datatype.boolean(),
      }
      arr.push(fakeOrder)
    }
    setOrders(arr)
    setSelectedOrder(arr[0]?.id)
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
    setSelectedDriver(arr[0]?.id)
  }

  useEffect(() => {
    fetchOrders()
    // fetchDrivers()
  }, [])

  // useEffect(() => {
  //   setSelectedDriver(drivers[0]?.id)
  //   setSelectedOrder(orders[0]?.id)
  // }, [drivers, orders])

  return (
    <MapContext.Provider
      value={{
        drivers,
        orders,
        showOrders,
        showDrivers,
        selectedOrder,
        selectedDriver,
        setDrivers,
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
