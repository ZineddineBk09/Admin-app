import { BBox } from '@/interfaces'

export const getDriversInArea = async (bbox: BBox) => {
  const drivers: any[] = []

  // get drivers in bbox from websocket server: NEXT_PUBLIC_WEBSOCKET_URL/map
  const mapSocket = new WebSocket(
    process.env.NEXT_PUBLIC_WEBSOCKET_URL + '/map'
  )

  mapSocket.onopen = () => {
    mapSocket.send(JSON.stringify(bbox))
    console.log('map socket opened')
  }

  mapSocket.onmessage = (event) => {
    const data = JSON.parse(event.data)
    console.log('data: ', data)
    drivers.push(data)
  }

  mapSocket.onclose = () => {
    console.log('map socket closed')
  }

  mapSocket.onerror = (error) => {
    console.log('map socket error: ', error)
  }

  return drivers
}
