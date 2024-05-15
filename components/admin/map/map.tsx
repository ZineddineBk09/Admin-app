import React from 'react-dom'
import { renderToString } from 'react-dom/server'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-easybutton/src/easy-button.js'
import 'leaflet-easybutton/src/easy-button.css'
import * as L from 'leaflet'
import { MapPinIcon } from '../../icons/map'
import { BBox, MapDriver } from '../../../interfaces'
import { useSession } from 'next-auth/react'
import mapSocket, { keepAlive } from '../../../lib/socket'
import { throttle } from 'lodash'
import toast from 'react-hot-toast'
import { useMapContext } from '../../../context/admin/map'

const THROTTLE_TIME: number = 500

// create a custom icon with L.divIcon and reactDOM.renderToString
const icon = (symbol?: string) =>
  L.divIcon({
    html: renderToString(
      <div className='relative flex items-center justify-center'>
        <p className='absolute top-0 text-xl font-bold'>{symbol}</p>
        <MapPinIcon />
      </div>
    ),
    iconSize: [60, 180],
    className: 'leaflet-icon drop-shadow-lg',
  })

function MapEvents() {
  const { data: session } = useSession()
  const { drivers, setDrivers } = useMapContext()
  const ws = useRef<WebSocket>()

  const throttleFunction = async () => {
    try {
      if (!session?.accessToken) {
        return
      }

      const [min_lng, min_lat, max_lng, max_lat] = map
        .getBounds()
        .toBBoxString()
        .split(',')

      // handle invalid bounds
      if (parseFloat(min_lat) < -90 || parseFloat(max_lat) > 90) return
      if (parseFloat(min_lng) < -180 || parseFloat(max_lng) > 180) return

      if (!ws.current) {
        ws.current = mapSocket(session.accessToken)
      }

      // No need to use, if the server uses ping/pong
      // ws.current.onopen = () => {
      //   keepAlive(ws.current as WebSocket, JSON.stringify(bbox))
      // }

      if (ws.current.readyState == 1) {
        ws.current.send(
          JSON.stringify({
            min_lat: parseFloat(min_lat),
            min_lng: parseFloat(min_lng),
            max_lat: parseFloat(max_lat),
            max_lng: parseFloat(max_lng),
          })
        )
      } else {
        console.log('WebSocket is not connected')
      }

      ws.current.onmessage = (e: any) => {
        // Convert the data to an array if it's not already
        const data: MapDriver[] = Array.isArray(JSON.parse(e.data))
          ? JSON.parse(e.data)
          : [JSON.parse(e.data)]

        if (data.length === 0) {
          return
        }

        if (drivers.length === 0) {
          setDrivers(data)
          return
        }

        if (!Array.isArray(JSON.parse(e.data))) {
          const driverId = data[0].id
          const filteredDrivers = drivers.filter(
            (driver) => driver.id !== driverId
          )
          const newDrivers = [data[0] as MapDriver, ...filteredDrivers]

          setDrivers(newDrivers)
        } else {
          const list = data.map((driver) => {
            const index = drivers.findIndex(
              (d) => d.id === driver.id && d.username === driver.username
            )
            if (index === -1) {
              return driver
            }
            return drivers[index]
          })

          setDrivers(list)
        }
      }

      ws.current.onclose = () => {
        console.log('Socket closed')
      }
    } catch (error: any & { message: string }) {
      toast.error(error.message)
    }
  }
  const map = useMapEvents({
    moveend: () => {
      throttle(throttleFunction, THROTTLE_TIME)()
    },
    zoomend: () => {
      throttle(throttleFunction, THROTTLE_TIME)()
    },
  })
  return null
}

const Map = () => {
  const [map, setMap] = useState<any>()
  const { drivers } = useMapContext()
  const markersRef = useRef<L.LayerGroup>(L.layerGroup())

  useEffect(() => {
    if (!map || drivers?.length === 0) return

    markersRef.current.clearLayers()

    drivers.forEach((driver) => {
      markersRef.current.addLayer(
        L.marker([driver.location.lat, driver.location.lng], {
          icon: icon(driver.username),
        }).bindPopup(
          `<div class='flex flex-col items-center gap-y-1'>
          <p>${driver.username}</p>
          <p>${driver.action}</p>
        </div>`
        )
      )
    })

    const markers = markersRef.current

    map.addLayer(markers)

    return () => {
      map.removeLayer(markers)
    }
  }, [map, drivers])

  const displayMap = useMemo(
    () => (
      <MapContainer
        center={[21.3891, 39.8579]}
        zoom={14}
        minZoom={5}
        scrollWheelZoom={false}
        maxBounds={[
          [-89, -179],
          [89, 179],
        ]}
        bounds={[
          [-90, -180],
          [90, 180],
        ]}
        ref={setMap}
        style={{
          height: '100%',
          width: '100%',
          boxSizing: 'border-box',
          borderRadius: '10px',
          margin: 'auto',
          position: 'absolute',
          top: '0',
          left: '0',
          bottom: '0',
          right: '0',
          zIndex: 0,
        }}
      >
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          className='absolute inset-0 z-0'
        />
        <MapEvents />
      </MapContainer>
    ),
    []
  )

  return displayMap
}

export default Map
