import { MapDriver } from '../../../interfaces'
import React, { useEffect, useState } from 'react'

export const MapContext = React.createContext({})

export const useMapContext: {
  (): {
    drivers: MapDriver[]
    orders: any[]
    showOrders: boolean
    showDrivers: boolean
    selectedOrder: string
    selectedDriver: string
    openTab: number
    filterOrders: any[]
    handleSelectOrder: (id: string | number) => void
    handleSelectDriver: (id: string | number) => void
    handleToggleOrders: () => void
    handleToggleDrivers: () => void
    hansleSelectTab: (tab: number) => void
    handleFilterOrders: (status: string[]) => void
    setDrivers: (drivers: MapDriver[]) => void
    statusColor: (status: string) => string
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
  const [drivers, setDrivers] = useState<MapDriver[]>([] as MapDriver[])
  const [selectedOrder, setSelectedOrder] = useState<string | number>()
  const [selectedDriver, setSelectedDriver] = useState<string | number>()
  const [openTab, setOpenTab] = React.useState(1)

  const handleToggleOrders = () => {
    setShowOrders(!showOrders)
  }

  const handleToggleDrivers = () => {
    setShowDrivers(!showDrivers)
  }

  const handleSelectOrder = (id: string | number) => {
    setSelectedOrder(id)
  }

  const handleSelectDriver = (id: string | number) => {
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

  const statusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-400'
      case 'inactive':
        return 'bg-red-400'
      case 'PickingUp':
        return 'bg-yellow-400'
      case 'delivering':
        return 'bg-blue-400'
      case 'waiting':
        return 'bg-gray-400'
      default:
        return 'bg-gray-400'
    }
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
        statusColor,
      }}
    >
      {children}
    </MapContext.Provider>
  )
}
