import React from 'react-dom'
import { renderToString } from 'react-dom/server'
import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-easybutton/src/easy-button.js'
import 'leaflet-easybutton/src/easy-button.css'
import * as L from 'leaflet'
import { MapPinIcon } from '../icons/map'
import { useMapContext } from '../../context/map'
import { APIResponse, MapDriver } from '../../interfaces'
import { useSession } from 'next-auth/react'
import mapSocket from '../../lib/socket'
import { filterRecords } from '../../lib/api'
import { get } from 'lodash'
import toast from 'react-hot-toast'

// create a custom icon with L.divIcon and reactDOM.renderToString
const icon = (symbol?: string) =>
  L.divIcon({
    html: renderToString(
      <div className='relative'>
        <MapPinIcon />

        <div className='flex items-center justify-center font-semibold absolute top-[10px] left-1/2  bg-gray-400 rounded-full w-10 h-10 z-10'>
          {symbol ? symbol : 'N/A'}
        </div>
      </div>
    ),
    iconSize: [60, 180],
    className: 'leaflet-icon',
  })

const Map = () => {
  const [map, setMap] = useState<any>(null)
  const { setDrivers } = useMapContext()
  const { data: session, status } = useSession()

  const getDriversData = async (
    data: {
      id: string | number
      location: {
        lat: number
        lng: number
      }
      action: string
    }[]
  ) => {
    if (data.length === 0) return

    // use promise.all to fetch all drivers data
    try {
      const drivers = await Promise.all(
        data.map(async (driver) => {
          const result: APIResponse = await filterRecords(
            {
              user_id: driver.id,
            },
            'driver'
          )

          return {
            id: driver.id,
            location: driver.location,
            action: driver.action,
            ...result.results[0],
          }
        })
      )
      console.log(drivers)

      setDrivers(drivers)
    } catch (err) {
      toast.error('An error occurred')
    }
  }

  // add an event listener on map: load, move, zoom, etc.
  useEffect(() => {
    if (!map) return

    map.on('moveend', async () => {
      const [min_lat, min_lng, max_lat, max_lng] = map
        .getBounds()
        .toBBoxString()
        .split(',')

      // lat: -90 - 90
      // lng: -180 - 180
      // hamdle the case when the map is zoomed out
      if (parseFloat(min_lat) < -90 || parseFloat(max_lat) > 90) return
      if (parseFloat(min_lng) < -180 || parseFloat(max_lng) > 180) return

      const ws = mapSocket(session?.accessToken || '')

      ws.onopen = () => {
        console.log('Connected to server', {
          min_lat: parseFloat(min_lat),
          min_lng: parseFloat(min_lng),
          max_lat: parseFloat(max_lat),
          max_lng: parseFloat(max_lng),
        })
        ws.send(
          JSON.stringify({
            min_lat: parseFloat(min_lat),
            min_lng: parseFloat(min_lng),
            max_lat: parseFloat(max_lat),
            max_lng: parseFloat(max_lng),
          })
        )

        ws.onmessage = (e) => {
          const data: MapDriver[] = Array.isArray(JSON.parse(e.data))
            ? JSON.parse(e.data)
            : [JSON.parse(e.data)]

          console.log('Drivers:', data)
          setDrivers(data)

          // filter non uuid ids
          // getDriversData(data)
        }
      }
    })
  }, [map])

  return (
    <>
      <MapContainer
        center={[21.3891, 39.8579]}
        zoom={14}
        minZoom={5}
        scrollWheelZoom={false}
        maxBounds={[
          [-89, -179],
          [89, 179],
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

        {/* <LocationMarker /> */}
        <DriversMarkers />
      </MapContainer>
    </>
  )
}

const DriversMarkers = () => {
  const { drivers } = useMapContext()

  if (!drivers) return null
  return (
    <>
      {drivers?.map((driver: MapDriver, index: number) => (
        <Marker
          key={driver?.id}
          position={[driver.location.lat, driver.location.lng]}
          icon={icon(driver?.username)}
        >
          <Popup>
            <div className='flex flex-col items-center gap-y-1'>
              <p className=''>{driver?.username}</p>
              <p className=''>{driver?.action}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  )
}

export default Map
