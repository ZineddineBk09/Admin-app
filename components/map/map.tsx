import React from 'react-dom'
import { renderToString } from 'react-dom/server'
import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-easybutton/src/easy-button.js'
import 'leaflet-easybutton/src/easy-button.css'
import * as L from 'leaflet'
import { MapPinIcon } from '../icons/map'
import { Driver } from '@/interfaces'
import { getDriversInArea } from '@/lib/api/map'
import { useMapContext } from '@/context/map'

// create a custom icon with L.divIcon and reactDOM.renderToString
const icon = (image?: string, symbol?: string) =>
  L.divIcon({
    html: renderToString(
      <div className='relative'>
        <MapPinIcon />

        <div className='flex items-center justify-center font-semibold absolute top-[10px] left-[10px] bg-gray-400 rounded-full w-10 h-10 z-10'>
          {symbol ? symbol : 'N/A'}
        </div>
      </div>
    ),
    iconSize: [60, 180],
    className: 'leaflet-icon',
  })

const Map = () => {
  const [map, setMap] = useState<any>(null)
  const { drivers, setDrivers } = useMapContext()

  // add an event listener on map: load, move, zoom, etc.
  useEffect(() => {
    if (!map) return

    map.on('moveend', async () => {
      const [min_lat, min_lng, max_lat, max_lng] = map
        .getBounds()
        .toBBoxString()
        .split(',')

      const records = await getDriversInArea({
        min_lat,
        min_lng,
        max_lat,
        max_lng,
      })

      if (!records) return
      setDrivers(
        records.map((record: any) => {
          return {
            id: record.pk,
            username: record.fields.username,
            email: record.fields.email,
            team: record.fields.team_id,
            completedTasks: record.fields.completed_tasks,
            inProgressTasks: record.fields.in_progress_tasks,
            warnings: record.fields.warnings,
            activeHours: record.fields.active_hours,
            image: record.fields.image,
            status: record.fields.status,
            location: {
              latitude: record.location.latitude,
              longitude: record.location.longitude,
            },
            orders: record.fields.orders,
            phone: record.fields.phone_number,
          }
        })
      )
    })
  }, [map])

  const fetchDriversEachInterval = async () => {
    const [min_lat, min_lng, max_lat, max_lng] = map
      .getBounds()
      .toBBoxString()
      .split(',')

    const records = await getDriversInArea({
      min_lat,
      min_lng,
      max_lat,
      max_lng,
    })

    if (!records) return
    setDrivers(
      records.map((record: any) => {
        return {
          id: record.pk,
          username: record.fields.username,
          email: record.fields.email,
          team: record.fields.team_id,
          completedTasks: record.fields.completed_tasks,
          inProgressTasks: record.fields.in_progress_tasks,
          warnings: record.fields.warnings,
          activeHours: record.fields.active_hours,
          image: record.fields.image,
          status: record.fields.status,
          location: {
            latitude: record.location.latitude,
            longitude: record.location.longitude,
          },
          orders: record.fields.orders,
          phone: record.fields.phone_number,
        }
      })
    )
  }

  // launch fetchDriversEachInterval every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!map) return
      fetchDriversEachInterval()
    }, 2000)
    return () => clearInterval(interval)
  }, [map])

  return (
    <div className=''>
      <MapContainer
        center={[21.3891, 39.8579]}
        zoom={13}
        scrollWheelZoom={true}
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
          className='absolute inset-0'
        />

        {/* <LocationMarker /> */}
        <DriversMarkers />
      </MapContainer>
    </div>
  )
}

const DriversMarkers = () => {
  const { drivers } = useMapContext()

  // re-render the markers when drivers change
  useEffect(() => {
    console.log(drivers)
  }, [drivers])

  return (
    <>
      {drivers?.map((driver) => (
        <Marker
          key={driver.id}
          position={[
            driver?.location?.latitude || 0,
            driver?.location?.longitude || 0,
          ]}
          icon={icon(
            driver.image,
            // first 2 letters of first name and last name
            // driver.username.split(' ')[0].slice(0, 1) +
            //   driver.username.split(' ')[1].slice(0, 1) +
            //   ''
            driver?.username
          )}
        >
          <Popup>
            <div className='flex flex-col items-center gap-y-1'>
              <p className=''>{driver.username}</p>
              <p className=''>{driver.phone}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  )
}

export default Map
