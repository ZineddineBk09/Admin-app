import React from 'react'
import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, FeatureGroup } from 'react-leaflet'
import dynamic from 'next/dynamic'
const EditControl = dynamic(
  import('react-leaflet-draw').then((mod) => mod.EditControl),
  { ssr: false }
)
import * as L from 'leaflet'

const CityMap = () => {
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

  return (
    <div className=''>
      <MapContainer
        center={[21.3891, 39.8579]}
        zoom={13}
        scrollWheelZoom={true}
        ref={setMap}
        style={{
          height: '100%',
          maxHeight: '600px',
          width: '100%',
          // minWidth: '600px',
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
              console.log('Created: ', e.layer.editing.latlngs[0][0])
            }}
            onEdited={(e: any) => {
              // e.layers._layers will return an object with only one element (the polygon)
              // so we access it using Object.values and then we access the latlngs array
              const polygon: any = Object.values(e.layers._layers)[0]
              const latlngs = polygon?.editing.latlngs[0][0]
            }}
            onDeleted={() => {
              console.log('Deleted')
            }}
            draw={{
              rectangle: false,
              circle: false,
              circlemarker: false,
              marker: false,
              polyline: false,
              polygon: true,
            }}
            edit={{
              edit: true,
              remove: true,
            }}
          />
        </FeatureGroup>
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
      </MapContainer>
    </div>
  )
}
export default CityMap
