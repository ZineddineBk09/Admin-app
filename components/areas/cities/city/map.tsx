import React from 'react'
import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, FeatureGroup } from 'react-leaflet'
import dynamic from 'next/dynamic'
import Loading from '../../../../components/shared/loading'
const EditControl = dynamic(
  import('react-leaflet-draw').then((mod) => mod.EditControl),
  {
    ssr: false,
    loading: () => <Loading />,
  }
)
import * as L from 'leaflet'
import { City, GeoJSONCoordinate, GeoJSONObject } from '../../../../interfaces'
import { createRecord, updateRecord } from '../../../../lib/api'
import toast from 'react-hot-toast'
import { useAreasCitiesContext } from '../../../../context/areas/cities'

const CityMap = ({ city }: { city: City }) => {
  const [map, setMap] = useState<any>(null)
  const [control, setControl] = useState<any>(null)
  const { refreshCities } = useAreasCitiesContext()
  const {
    id,
    name,
    governorate,
    geofence,
    order_fees,
    price_ratio_nominator,
    price_ratio_denominator,
    additional_ratio_nominator,
    additional_ratio_denominator,
  } = city

  const handleCreated = async (e: any) => {
    console.log('Created', e.layer.editing.latlngs[0])
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
        name: name,
        vertices: apiFormat,
      },
      'geofence'
    )
      .then(async (res) => {
        if (res) {
          console.log({
            id,
            name,
            governorate: governorate?.id,
            order_fees,
            price_ratio_nominator,
            price_ratio_denominator,
            additional_ratio_nominator,
            additional_ratio_denominator,
            geofence: res?.id,
          })
          await updateRecord(
            {
              id,
              name,
              governorate: governorate?.id,
              order_fees,
              price_ratio_nominator,
              price_ratio_denominator,
              additional_ratio_nominator,
              additional_ratio_denominator,
              geofence: res?.id,
            },
            'city'
          )
            .then((res) => {
              if (res) {
                console.log('res update: ', res)
                toast.success('City geofence added successfully')

                refreshCities()
              }
            })
            .catch((err) => {
              toast.error('Error assigning city geofence!')
            })
        }
      })
      .catch((err) => {
        console.log('Error adding city geofence!: ', err)
        toast.error('Error adding city geofence!')
      })
  }

  const handleEdited = (e: any) => {
    const editedLayers = Object.values(e.layers._layers)
    const updatedPolygons: GeoJSONObject[] = editedLayers.map((layer: any) =>
      layer.toGeoJSON()
    )
    console.log('updatedPolygons:', updatedPolygons)
    // Assuming you have an API endpoint to update city polygons:
    // const apiUrl = '/api/city-polygons'
    // const requestOptions = {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ updatedPolygons }),
    // }

    // fetch(apiUrl, requestOptions)
    //   .then((response) => response.json())
    //   .then((updatedData) => {
    //     // Update state, map, or other components based on success
    //     console.log('City polygon updated:', updatedData)
    //   })
    //   .catch((error) => {
    //     console.error('Error updating city polygon:', error)
    //     // Handle errors here
    //   })

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

// set initial polygon
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!map) return

      if (geofence) {
        const polygon = L.polygon(
          geofence.vertices.map((vertex: any) => [vertex.y, vertex.x])
        )
        map.fitBounds(polygon.getBounds())
        polygon.addTo(map)
      }
    }
  }, [map])

  return (
    <div>
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
        <FeatureGroup
          
        >
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
export default CityMap
