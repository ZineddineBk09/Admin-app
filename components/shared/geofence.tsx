import {
  Button,
  Modal,
  Text,
  Loading,
  Tooltip,
  Divider,
} from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import * as L from 'leaflet'
import {
  City,
  GeoJSONCoordinate,
  GeoJSONObject,
  DriverTeamMember,
} from '../../interfaces'
import { createRecord } from '../../lib/api'
import toast from 'react-hot-toast'
import { useAreasCitiesContext } from '../../context/areas/cities'
import { MapContainer, TileLayer, FeatureGroup } from 'react-leaflet'
import { EditControl } from 'react-leaflet-draw'

const Geofence = () => {
  const [map, setMap] = useState<any>(null)
  const [control, setControl] = useState<any>(null)
  const { refreshCities } = useAreasCitiesContext()

  const handleCreated = async (e: any) => {
    const geojson: GeoJSONObject = e.layer.toGeoJSON()

    const apiFormat = geojson.geometry.coordinates[0].map(
      (coord: GeoJSONCoordinate, index: number) => {
        return {
          x: coord[0],
          y: coord[1],
          order_num: index,
        }
      }
    )

    await createRecord(
      {
        name: 'name',
        vertices: apiFormat,
      },
      'geofence'
    )
      .then(async (res) => {
        if (res) {
          toast.success('Area added successfully')
        }
      })
      .catch((err) => {
        console.log('Error adding area!: ', err)
        toast.error('Error adding area!')
      })
  }

  const handleEdited = (e: any) => {
    const editedLayers = Object.values(e.layers._layers)
    const updatedPolygons: GeoJSONObject[] = editedLayers.map((layer: any) =>
      layer.toGeoJSON()
    )
  }

  const handleDeleted = () => {
    console.log('Deleted city polygon')
    // TODO: Implement your logic to delete the selected city polygon
  }

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
            onCreated={handleCreated}
            onEdited={handleEdited}
            onDeleted={handleDeleted}
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

export default Geofence