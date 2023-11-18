import { BBox } from '@/interfaces'

export const getDriversInArea = async (bbox: BBox) => {
  const drivers: any[] = []

  // get drivers in bbox from websocket server: NEXT_PUBLIC_WEBSOCKET_URL/map
  const mapSocket: any = new WebSocket(
    process.env.NEXT_PUBLIC_WEBSOCKET_URL + '/map'
  )

  mapSocket.onopen = () => {
    if (mapSocket.readyState === WebSocket.OPEN) {
      mapSocket.send(
        JSON.stringify({
          min_lat: 37.7,
          min_lng: 120.5,
          max_lat: 40.8,
          max_lng: 122.23,
        })
      )

      //  console.log('map socket opened')
    } else {
      console.log('map socket not opened')
    }
  }

  mapSocket.onmessage = (event: MessageEvent) => {
    console.log('map socket message: ', event)
    const data = JSON.parse(event.data)
    console.log('map data: ', data)
    return data
  }

  mapSocket.onclose = () => {
    //console.log('map socket closed')
  }

  mapSocket.onerror = (error: any) => {
    console.log('map socket error: ', error)
    mapSocket.close()
  }

  return drivers
}

export const addDriverToArea = async (bbox: BBox) => {
  // get a random (lat, lng) using max_lat, min_lat, max_lng, min_lng
  const lat: number = bbox.min_lat
  const lng: number = bbox.min_lng

  // send (lat, lng) to websocket server: NEXT_PUBLIC_WEBSOCKET_URL/driver
  const driverSocket = new WebSocket(
    process.env.NEXT_PUBLIC_WEBSOCKET_URL + '/driver'
  )

  driverSocket.onopen = () => {
    driverSocket.send(JSON.stringify({ lat, lng }))
    console.log('driver socket opened')
  }

  driverSocket.onmessage = (event: MessageEvent) => {
    const data = JSON.parse(event.data)
    console.log('driver data: ', data)
  }

  driverSocket.onclose = () => {
    console.log('driver socket closed')
  }

  driverSocket.onerror = (error: any) => {
    console.log('driver socket error: ', error)
  }
}
