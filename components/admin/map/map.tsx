import React from 'react-dom'
import { renderToString } from 'react-dom/server'
import { useEffect, useMemo, useRef, useState } from 'react'
import { MapContainer, TileLayer, useMapEvents, Marker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-easybutton/src/easy-button.js'
import 'leaflet-easybutton/src/easy-button.css'
import * as L from 'leaflet'
import { MapPinIcon } from '../../icons/map'
import { APIResponse, MapDriver } from '../../../interfaces'
import { useSession } from 'next-auth/react'
import mapSocket from '../../../lib/socket'
import { throttle } from 'lodash'
import toast from 'react-hot-toast'
import { useMapContext } from '../../../context/admin/map'
import { getRecords } from '../../../lib/api'
import { title } from 'process'

const THROTTLE_TIME: number = 500

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

      console.log(min_lng, min_lat, max_lng, max_lat)

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
    console.log('Drivers:', drivers)

    drivers.forEach((driver) => {
      console.log(
        'Add Driver:',
        driver.username,
        driver.location.lat,
        driver.location.lng
      )

      const marker = L.marker([driver.location.lat, driver.location.lng])
        .setIcon(
          L.icon({
            iconUrl: '/images/icons/motor-icon.svg',
            iconSize: [35, 46],
            iconAnchor: [17, 46],
          })
        )
        .setLatLng([driver.location.lat, driver.location.lng])

      // Bind a popup to the marker
      marker.bindPopup(
        `<div>
           <p><strong>Username:</strong> ${driver.username}</p>
           <p><strong>Phone:</strong> ${driver.phone_number}</p>
           <p><strong>Status:</strong> ${driver.status}</p>
         </div>`
      )

      markersRef.current.addLayer(marker)
    })

    const markers = markersRef.current

    map.addLayer(markers)

    return () => {
      map.removeLayer(markers)
    }
  }, [map, drivers])

  useEffect(() => {
    // Branches
    const refreshBranches = async () => {
      const records: APIResponse = await getRecords('branch')
      console.log('Branches:', records.results)
      if (records.results) {
        records.results.forEach((branch) => {
          console.log(
            'Branch:',
            branch.account.name + ' ' + (branch.main ? ' main' : ''),
            branch?.address?.latitude,
            branch?.address?.longitude
          )

          const marker = L.marker([
            branch?.address?.latitude,
            branch?.address?.longitude,
          ])
            .setIcon(
              L.icon({
                iconUrl: '/images/icons/restaurant-icon.svg',
                iconSize: [35, 46],
                iconAnchor: [17, 46],
              })
            )
            .setLatLng([branch?.address?.latitude, branch?.address?.longitude])

          // Bind a popup to the marker
          marker.bindPopup(
            `<div>
               <p><strong>Name:</strong> ${
                 branch.account.name + ' ' + (branch.main ? ' (Main)' : '')
               }</p>
               <p><strong>Latitude:</strong> ${branch?.address?.latitude}</p>
               <p><strong>Longitude:</strong> ${branch?.address?.longitude}</p>
             </div>`
          )

          markersRef.current.addLayer(marker)
        })
      }
    }

    // if branches markers alrady exists, don't refresh
    refreshBranches()
  }, [map, drivers])

  const displayMap = useMemo(
    () => (
      <MapContainer
        center={[21.3891, 39.8579]}
        zoom={14}
        minZoom={5}
        scrollWheelZoom={true}
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
