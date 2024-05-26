import React, { useRef } from 'react'
import { useEffect, useState } from 'react'
import { FeatureGroup, MapContainer, TileLayer, Marker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-easybutton/src/easy-button.js'
import 'leaflet-easybutton/src/easy-button.css'
import * as L from 'leaflet'
import dynamic from 'next/dynamic'
import { renderToString } from 'react-dom/server'
import Loading from '../../shared/loading'
import { MapPinIcon } from '../../icons/map'

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

const BranchMap = ({
  position,
  setPosition,
}: {
  position: any
  setPosition: (position: any) => void
}) => {
  // const [position, setPosition] = useState<any>({
  //   lat: 0,
  //   lng: 0,
  // })
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
    const icon = (image?: string, symbol?: string) =>
      L.divIcon({
        html: renderToString(<MapPinIcon />),
        iconSize: [60, 180],
        className: 'leaflet-icon',
      })

    const eventHandlers = {
      async dragend() {
        const marker = markerRef?.current

        setPosition(marker.getLatLng())
      },
    }

    return (
      <Marker
        draggable={false}
        icon={icon()}
        eventHandlers={eventHandlers}
        position={position}
        // ref={markerRef}
      />
    )
  }

  return (
    <>
      <MapContainer
        center={[position.lat, position.lng]}
        zoom={5}
        scrollWheelZoom={true}
        ref={setMap}
        style={{
          height: '100%',
          maxHeight: '300px',
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
              setPosition(e.layer._latlng)
            }}
            onEdited={(e: any) => {
              setPosition(e.layers.getLayers()[0]._latlng)
            }}
            draw={{
              rectangle: false,
              circle: false,
              circlemarker: false,
              marker: false,
              polyline: false,
              polygon: false,
            }}
            edit={{
              edit: false,
              remove: false,
            }}
          />
        </FeatureGroup>
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
        <LocationMarker />
      </MapContainer>
    </>
  )
}

export default BranchMap
