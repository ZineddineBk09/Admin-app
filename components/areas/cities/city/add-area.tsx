import { Button, Modal, Text, Loading, Tooltip, Input } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import * as L from 'leaflet'
import { FeatureGroup, MapContainer, TileLayer } from 'react-leaflet'
import { EditControl } from 'react-leaflet-draw'
import toast from 'react-hot-toast'
import { createRecord, partialUpdateRecord } from '../../../../lib/api'
import {
  City,
  GeoJSONCoordinate,
  GeoJSONObject,
  Geofence as GeofenceType,
} from '../../../../interfaces'
import { useAreasCitiesContext } from '../../../../context/areas/cities'

const Geofence = ({ id, handler }: { id: string; handler: () => void }) => {
  const [map, setMap] = useState<any>(null)
  const [control, setControl] = useState<any>(null)
  const { refreshCities, cities } = useAreasCitiesContext()

  const handleCreated = async (e: any) => {
    const city: City = cities.find((ct: City) => ct.id === id) as City
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
        name: city?.name + ' - Area ' + city.areas.length,
        vertices: apiFormat,
      },
      'geofence'
    )
      .then(async (res) => {
        if (res) {
          await partialUpdateRecord(
            {
              id,
              areas: [
                ...city.areas.map((area: GeofenceType) => area.id),
                res.id,
              ],
            },
            'city'
          )
            .then((res) => {
              if (res) {
                toast.success('Area added successfully')
                // remove the drawn area
                e.layer.remove()
                handler()
                refreshCities()
              }
            })
            .catch((err) => {
              toast.error('Error assigning area!')
            })
        }
      })
      .catch((err) => {
        console.log('Error adding area!: ', err)
        toast.error('Error adding area!')
      })
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
    <>
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
            draw={{
              rectangle: false,
              circle: false,
              circlemarker: false,
              marker: false,
              polyline: false,
              polygon: true,
            }}
            edit={{
              edit: false,
              remove: false,
            }}
          />
        </FeatureGroup>
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
      </MapContainer>
    </>
  )
}
export const AddArea = ({ id }: { id: string }) => {
  const [visible, setVisible] = React.useState(false)
  const [loading, setLoading] = React.useState<boolean>(false)
  const [geofenceName, setGeofenceName] = React.useState<string>('')

  const handler = () => setVisible(true)

  const closeHandler = () => setVisible(false)

  return (
    <div>
      <Tooltip content='Add Area' onClick={handler}>
        <button className='h-10 w-10 flex items-center justify-center text-4xl font-medium rounded-full bg-gray-200 pb-1'>
          +
        </button>
      </Tooltip>
      <Modal
        closeButton
        aria-labelledby='modal-title'
        width='600px'
        open={visible}
        onClose={closeHandler}
        className='rounded-md'
      >
        {/* Form */}
        {loading ? (
          <Loading size='xl' className='my-3' color='warning' />
        ) : (
          <>
            <Modal.Header css={{ justifyContent: 'center' }}>
              <Text
                id='modal-title'
                className='text-xl font-semibold capitalize'
                h4
              >
                Add Area
              </Text>
            </Modal.Header>
            <Modal.Body css={{ py: '$10' }}>
              <div className='h-96 flex flex-col items-start bg-gray-200 overflow-hidden rounded-md relative'>
                <Geofence id={id} handler={closeHandler} />
              </div>
            </Modal.Body>
          </>
        )}
      </Modal>
    </div>
  )
}
