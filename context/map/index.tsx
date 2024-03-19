import { Address, Order, Status } from '../../interfaces'
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
    const filtered = orders.filter((order) => status.includes(order?.status))
    setFilteredOrders(filtered)
  }

  const fetchOrders = () => {}

  const fetchDrivers = () => {}

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
