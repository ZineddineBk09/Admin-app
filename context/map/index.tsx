import { Order, Status } from '../../interfaces'
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
    openTab: number
    filterOrders: any[]
    handleSelectOrder: (id: string) => void
    handleSelectDriver: (id: string) => void
    handleToggleOrders: () => void
    handleToggleDrivers: () => void
    hansleSelectTab: (tab: number) => void
    handleFilterOrders: (status: string[]) => void
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
  const [filteredOrders, setFilteredOrders] = useState<any[]>([] as any[])
  const [drivers, setDrivers] = useState<any[]>([] as any[])
  const [selectedOrder, setSelectedOrder] = useState<string>()
  const [selectedDriver, setSelectedDriver] = useState<any>(null)
  const [openTab, setOpenTab] = React.useState(1)
  const [orderStatus, setOrderStatus] = useState<Status[]>([
    { value: 'assigned', checked: true },
    { value: 'cancelled', checked: true },
    { value: 'new', checked: true },
    { value: 'done', checked: true },
  ])
  const [driverStatus, setDriverStatus] = useState<Status[]>([
    { value: 'available', checked: true },
    { value: 'busy', checked: true },
    { value: 'inactive', checked: true },
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

  const handleFilterOrders = (status: string[]) => {
    if (status?.length === 0) return setFilteredOrders(orders)
    const filtered = orders.filter((order) => status.includes(order.status))
    setFilteredOrders(filtered)
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
        city: faker.location.city(),
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
        paymentType: ['cash', 'visa', 'mastercard'][
          faker.number.int({ max: 2, min: 0 })
        ] as any,
      }
      arr.push(fakeOrder)
    }
    setOrders(arr)
    setFilteredOrders(arr)
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
        openTab,
        filterOrders: filteredOrders,
        setDrivers,
        handleSelectOrder,
        handleSelectDriver,
        handleToggleOrders,
        handleToggleDrivers,
        handleFilterOrders,
        hansleSelectTab,
      }}
    >
      {children}
    </MapContext.Provider>
  )
}
