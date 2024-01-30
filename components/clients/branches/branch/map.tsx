import React, { useRef } from 'react'
import { useEffect, useState } from 'react'
import {
  FeatureGroup,
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-easybutton/src/easy-button.js'
import 'leaflet-easybutton/src/easy-button.css'
import * as L from 'leaflet'

import dynamic from 'next/dynamic'
import { renderToString } from 'react-dom/server'
import { MapPinIcon } from '../../../../components/icons/map'
import Loading from '../../../../components/shared/loading'
const EditControl = dynamic(
  import('react-leaflet-draw').then((mod) => mod.EditControl),
  {
    ssr: false,
    loading: () => <Loading />,
  }
)

L.Icon.Default.mergeOptions({
  iconUrl: '/images/marker.png',
})

const BranchMap = () => {
  const [position, setPosition] = useState<any>({ lat: 21.3891, lng: 39.8579 })
  const [map, setMap] = useState<any>(null)
  const [control, setControl] = useState<any>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!map) return
      if (control) {
        map.removeControl(control)
        setControl(null)
      }
    }
  }, [map])

  useEffect(() => {
    if (!map) return
    if (control) {
      control.addTo(map)
    }
  }, [control, map])

  const LocationMarker = () => {
    const markerRef = useRef<any>(null)
    const [changed, setChanged] = useState(false)
    const icon = (image?: string, symbol?: string) =>
      L.divIcon({
        html: renderToString(
          <div className='relative'>
            <MapPinIcon />

            <div className='flex items-center justify-center font-semibold absolute top-[10px] left-[10px] bg-gray-400 rounded-full w-10 h-10 z-10'></div>
          </div>
        ),
        iconSize: [60, 180],
        className: 'leaflet-icon',
      })

    const eventHandlers = {
      dragend() {
        const marker = markerRef?.current
        if (marker) {
          if (!changed) setChanged(true)
          setPosition(marker.getLatLng())
          // control.state('unloaded')
        }
      },
    }

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
        center={[position.lat, position.lng]}
        zoom={13}
        scrollWheelZoom={true}
        ref={setMap}
        style={{
          height: '100%',
          maxHeight: '600px',
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
        <FeatureGroup>
          <EditControl
            position='bottomleft'
            onCreated={(e: any) => {
              console.log('Created branch: ', e.layer._latlng)
              setPosition(e.layer._latlng)
            }}
            onEdited={(e: any) => {
              console.log('Edited branch: ', e)
            }}
            onDeleted={() => {
              console.log('Deleted branch')
            }}
            draw={{
              rectangle: false,
              circle: false,
              circlemarker: false,
              marker: true,
              polyline: false,
              polygon: false,
            }}
            edit={{
              edit: true,
              remove: true,
            }}
          />
        </FeatureGroup>
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
        <LocationMarker />
      </MapContainer>
    </div>
  )
}

export default BranchMap
