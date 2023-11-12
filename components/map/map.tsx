import React from 'react-dom'
import { renderToString } from 'react-dom/server'
import { useEffect, useState } from 'react'
import { useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-easybutton/src/easy-button.js'
import 'leaflet-easybutton/src/easy-button.css'
import * as L from 'leaflet'
import { MapPinIcon } from '../icons/map'
import { Driver } from '@/interfaces'

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

const Map = ({ drivers }: { drivers: Driver[] }) => {
  const [position, setPosition] = useState<any>()
  const [map, setMap] = useState<any>(null)
  const [control, setControl] = useState<any>(null)
  const [changed, setChanged] = useState(false)
  const markerRef = useRef<any>(null)

  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     if (!map) return
  //     if (control) {
  //       map.removeControl(control)
  //       setControl(null)
  //     }

  //     setControl(
  //       L.easyButton({
  //         states: [
  //           {
  //             stateName: 'unloaded',
  //             icon: '/icons/locationPin.png',
  //             title: 'load image',
  //             onClick: function (control: any) {
  //               control.state('loading')
  //               control._map.on('locationfound', function (e: any) {
  //                 setPosition(e.latlng)
  //                 map.flyTo(e.latlng, 18)
  //                 control.state('loaded')
  //               })
  //               control._map.on('locationerror', function () {
  //                 control.state('error')
  //               })
  //               control._map.locate()
  //             },
  //           },
  //           {
  //             stateName: 'loading',
  //             icon: 'fa-spinner fa-spin',
  //             onClick: function () {},
  //             title: 'loading',
  //           },
  //           {
  //             stateName: 'loaded',
  //             icon: 'fa-crosshairs',
  //             onClick: function () {},
  //             title: 'location loaded',
  //           },
  //           {
  //             stateName: 'error',
  //             icon: 'fa-frown-o',
  //             onClick: function () {},
  //             title: 'location not found',
  //           },
  //         ],
  //       })
  //     )
  //   }
  // }, [map])

  // useEffect(() => {
  //   if (!map) return
  //   if (control) {
  //     control.addTo(map)
  //     map.on('click', function (e: any) {
  //       setPosition(e.latlng)
  //       control.state('unloaded')

  //       return false
  //     })
  //   }
  // }, [control, map])

  const eventHandlers = {
    dragend() {
      const marker = markerRef?.current
      if (marker) {
        if (!changed) setChanged(true)
        setPosition(marker.getLatLng())
        control.state('unloaded')
      }
    },
  }

  const LocationMarker = () => {
    if (position) {
      const { lat, lng } = position

      return (
        <Marker
          draggable
          icon={icon()}
          eventHandlers={eventHandlers}
          position={position}
          ref={markerRef}
        >
          <Popup>
            {changed
              ? 'Position: ' + lat.toFixed(4) + ', ' + lng.toFixed(4) + ''
              : 'Position: ' + lat.toFixed(4) + ', ' + lng.toFixed(4) + ''}
          </Popup>
        </Marker>
      )
    }
    return null
  }

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
        <DriversMarkers drivers={drivers} />
      </MapContainer>
    </div>
  )
}

const DriversMarkers = ({ drivers }: { drivers: Driver[] }) => {
  return (
    <>
      {drivers.map((driver) => (
        <Marker
          key={driver.id}
          position={[driver.location.latitude, driver.location.longitude]}
          icon={icon(
            driver.image,
            // first 2 letters of first name and last name
            driver.fullName.split(' ')[0].slice(0, 1) +
              driver.fullName.split(' ')[1].slice(0, 1) +
              ''
          )}
        >
          <Popup>
            <div className='flex flex-col items-center gap-y-1'>
              <p className=''>{driver.fullName}</p>
              <p className=''>{driver.phone}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  )
}

export default Map
