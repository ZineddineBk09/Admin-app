import React, { useEffect, useState } from 'react'
import socket from '../../lib/socket'
import { Order } from '../../interfaces'

export const MapOrdersContext = React.createContext({})

export const useMapOrdersContext: {
  (): {
    orders: Order[]
    isConnected: boolean
  }
} = () => React.useContext(MapOrdersContext as any)

export const MapOrdersContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [orders, setOrders] = useState<Order[]>([] as Order[])
  const [isConnected, setIsConnected] = useState<boolean>(false)

  useEffect(() => {
    socket.connect()

    // the return function is called when the component is unmounted
    return () => {
      socket.disconnect()
    }
  }, [])

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true)
    })

    socket.on('disconnect', () => {
      setIsConnected(false)
    })

    socket.on('orders', (data: Order[]) => {
      setOrders(data)
    })

    // the return function is called when the component is unmounted
    return () => {
      socket.off('connect')
      socket.off('disconnect')
      socket.off('orders')
    }
  }, [])

  return (
    <MapOrdersContext.Provider
      value={{
        orders,
        isConnected,
      }}
    >
      {children}
    </MapOrdersContext.Provider>
  )
}


// is it good to use the same socket for different contexts?
// response: yes, it is good to use the same socket for different contexts, because it is the same socket connection, and it is not necessary to create a new socket connection for each context.

// is it ok to setup the socket connection in the context provider?
// response: yes, it is ok to setup the socket connection in the context provider, because the socket connection is a global resource that can be shared by different components, and the context provider is a good place to manage the lifecycle of the socket connection.

// should we use the same socket connection for different contexts?
// response: yes, it is good to use the same socket connection for different contexts, because it is the same socket connection, and it is not necessary to create a new socket connection for each context.