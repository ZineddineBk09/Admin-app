import React, { useEffect, useState } from 'react'
import socket from '../../lib/socket'
import { Driver } from '../../interfaces'

export const MapDriversContext = React.createContext({})

export const useMapDriversContext: {
  (): {
    drivers: Driver[]
    isConnected: boolean
  }
} = () => React.useContext(MapDriversContext as any)

export const MapDriversContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [drivers, setDrivers] = useState<Driver[]>([] as Driver[])
  const [isConnected, setIsConnected] = useState<boolean>(false)

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true)
    })

    socket.on('disconnect', () => {
      setIsConnected(false)
    })

    socket.on('drivers', (data: Driver[]) => {
      setDrivers(data)
    })

    // the return function is called when the component is unmounted
    return () => {
      socket.off('connect')
      socket.off('disconnect')
      socket.off('drivers')
    }
  }, [])

  return (
    <MapDriversContext.Provider
      value={{
        drivers,
        isConnected,
      }}
    >
      {children}
    </MapDriversContext.Provider>
  )
}
