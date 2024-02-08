import React from 'react-dom'
import { renderToString } from 'react-dom/server'
import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-easybutton/src/easy-button.js'
import 'leaflet-easybutton/src/easy-button.css'
import * as L from 'leaflet'
import { MapPinIcon } from '../icons/map'
import { Location } from '../../interfaces'

const icon = () =>
  L.divIcon({
    html: renderToString(
      <div className='relative'>
        <MapPinIcon />
      </div>
    ),
    iconSize: [60, 180],
    className: 'leaflet-icon',
  })

const Map = () => {
  const [map, setMap] = useState<any>(null)
  const [location, setLocation] = useState<Location>({
    latitude: 0,
    longitude: 0,
  })

  // get the user's location with geolocation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setLocation({
            latitude,
            longitude,
          })

          if (map) {
            map.flyTo([latitude, longitude], map.getZoom(), {
              duration: 1,
            })
          }
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              console.error('User denied the request for Geolocation.')
              break
            case error.POSITION_UNAVAILABLE:
              console.error('Location information is unavailable.')
              break
            case error.TIMEOUT:
              console.error('The request to get user location timed out.')
              break
          }
        }
      )
    } else {
      console.error('Geolocation is not supported by this browser.')
    }
  }, [map])

  // allow the user to move the marker
  const handleMapClick = (e: any) => {
    setLocation({
      latitude: e.latlng.lat,
      longitude: e.latlng.lng,
    })
  }

  useEffect(() => {
    if (map) {
      map.on('click', handleMapClick)
    }

    return () => {
      if (map) {
        map.off('click', handleMapClick)
      }
    }
  }, [map])

  return (
    <>
      <MapContainer
        center={
          location.latitude && location.longitude
            ? [location.latitude, location.longitude]
            : [51.505, -0.09]
        }
        zoom={10}
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
          className='absolute inset-0 z-0'
        />

        <LocationMarker location={location} />
      </MapContainer>
    </>
  )
}

const LocationMarker = ({ location }: { location: Location }) => {
  const map = useMap()

  return (
    <Marker
      position={
        location.latitude && location.longitude
          ? [location.latitude, location.longitude]
          : [0, 0]
      }
      icon={icon()}
      eventHandlers={{
        click: () => {
          map.flyTo([location.latitude, location.longitude], map.getZoom(), {
            duration: 1,
          })
        },
      }}
    >
      <Popup>You are here</Popup>
    </Marker>
  )
}

export default Map
