import React, { useEffect, useState } from 'react'

export const MapContext = React.createContext({})

export const useMapContext: any = () => React.useContext(MapContext)

export const MapContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [showOrders, setOrders] = useState<boolean>(true)
  const [showDrivers, setDrivers] = useState<boolean>(true)
  // const [plates, setPlates] = useState<Plate[]>([] as Plate[])
  // const [loading, setLoading] = useState(true)

  // const refreshPlates = async () => {
  //   setLoading(true)
  //   setPlates([] as Plate[])
  //   const records = await fetchPlates()
  //   setPlates(records)
  //   setLoading(false)
  // }

  // const handleSearchPlates = (search: string) => {
  //   if (search === '') {
  //     refreshPlates()
  //     return
  //   }
  //   // search inside plates array
  //   const filteredPlates: any = searchPlates(plates, search)
  //   setPlates(filteredPlates)
  // }

  // useEffect(() => {
  //   refreshPlates()
  // }, [])
  const handleToggleOrders = () => {
    setOrders(!showOrders)
  }

  const handleToggleDrivers = () => {
    setDrivers(!showDrivers)
  }

  return (
    <MapContext.Provider
      value={{
        showOrders,
        showDrivers,
        handleToggleOrders,
        handleToggleDrivers,
      }}
    >
      {children}
    </MapContext.Provider>
  )
}
