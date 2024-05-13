import React from 'react-dom'
import { renderToString } from 'react-dom/server'
import { useCallback, useEffect, useRef, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-easybutton/src/easy-button.js'
import 'leaflet-easybutton/src/easy-button.css'
import * as L from 'leaflet'
import { MapPinIcon } from '../../icons/map'
import { MapDriver } from '../../../interfaces'
import { useSession } from 'next-auth/react'
import mapSocket from '../../../lib/socket'
import { throttle } from 'lodash'

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

const Map = () => {
  const [map, setMap] = useState<any>()
  const [drivers, setDrivers] = useState([] as MapDriver[])
  const { data: session, status } = useSession()
  const markersRef = useRef<L.LayerGroup>(L.layerGroup())

  // callback function to throttle the websocket connection
  const throttleFunction = useCallback(
    () => async () => {
      if (!map || !session?.accessToken) {
        !map && console.log('No map found')
        !session?.accessToken && console.log('No session found')
        return
      }

      const ws = mapSocket(session.accessToken)

      const [min_lat, min_lng, max_lat, max_lng] = map
        .getBounds()
        .toBBoxString()
        .split(',')

      const bbox = {
        min_lat: parseFloat(min_lat),
        min_lng: parseFloat(min_lng),
        max_lat: parseFloat(max_lat),
        max_lng: parseFloat(max_lng),
      }

      // handle invalid bounds
      if (parseFloat(min_lat) < -90 || parseFloat(max_lat) > 90) return
      if (parseFloat(min_lng) < -180 || parseFloat(max_lng) > 180) return

      ws.onopen = () => {
        console.log('Open, Send BBOX:', bbox)
        ws.send(JSON.stringify(bbox))
      }

      ws.onmessage = (e) => {
        console.log('map socket data:', JSON.parse(e.data))
        const data: MapDriver[] = Array.isArray(JSON.parse(e.data))
          ? JSON.parse(e.data)
          : [JSON.parse(e.data)]

        if (data.length === 0) {
          // setDrivers([])
          console.log('No data found')
          return
        }

        if (drivers.length === 0) {
          console.log('Empty drivers array')
          setDrivers(data)
          return
        }

        if (!Array.isArray(JSON.parse(e.data))) {
          const driverId = data[0].id
          const filteredDrivers = drivers.filter(
            (driver) => driver.id !== driverId
          )
          const newDrivers = [data[0] as MapDriver, ...filteredDrivers]

          console.log('--------NEW DRIVER--------', driverId)
          console.log('filteredDrivers:', filteredDrivers)
          console.log('Non filtered drivers', drivers)
          console.log('newDrivers:', newDrivers)

          setDrivers(newDrivers)
        } else {
          console.log('--------UPDATE DRIVERS--------')
          setDrivers(
            data.map((driver) => {
              const index = drivers.findIndex(
                (d) => d.id === driver.id && d.username === driver.username
              )
              if (index === -1) {
                return driver
              }
              return drivers[index]
            })
          )
        }
      }
    },
    [map, drivers, session]
  )

  // Use throttled function on map 'moveend' event
  useEffect(() => {
    if (!map || !session?.accessToken) {
      !map && console.log('No map found')
      !session?.accessToken && console.log('No session found')
      return
    }

    map.on('moveend', () => throttle(throttleFunction, THROTTLE_TIME)())
    map.on('zoomend', () => throttle(throttleFunction, THROTTLE_TIME)())

    return () => {
      map.off('moveend', () => throttle(throttleFunction, THROTTLE_TIME)())
      map.off('zoomend', () => throttle(throttleFunction, THROTTLE_TIME)())
    }
  }, [map, session])

  // update the map with new drivers
  useEffect(() => {
    if (!map || drivers?.length === 0) return

    console.log('drivers inside drivers useEffect:', drivers)

    const markers = markersRef.current

    markers.clearLayers()

    drivers.forEach((driver) => {
      markers.addLayer(
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

    map.addLayer(markers)

    return () => {
      map.removeLayer(markers)
    }
  }, [map, drivers])

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
      </MapContainer>
    </>
  )
}

export default Map
