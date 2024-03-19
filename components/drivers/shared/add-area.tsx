import { Button, Modal, Text, Loading, Tooltip, Input } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import * as L from 'leaflet'
import { GeoJSONCoordinate, GeoJSONObject } from '../../../interfaces'
import CityCard from '../../areas/cities/city/card'
import { FeatureGroup, MapContainer, TileLayer } from 'react-leaflet'
import { EditControl } from 'react-leaflet-draw'
import toast from 'react-hot-toast'
import { createRecord, partialUpdateRecord } from '../../../lib/api'

const Geofence = ({
  id,
  geofenceName,
  endpoint,
  refreshRecords,
  areas,
}: {
  id: string
  geofenceName: string
  endpoint: string
  refreshRecords: () => void
  areas: number[]
}) => {
  const [map, setMap] = useState<any>(null)
  const [control, setControl] = useState<any>(null)

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
    if (geofenceName) {
      console.log('GEOFENCE:', {
        geofenceName: geofenceName,
        vertices: apiFormat,
      })

      await createRecord(
        {
          name: geofenceName,
          vertices: apiFormat,
        },
        'geofence'
      )
        .then(async (res) => {
          if (res) {
            console.log('Area added successfully: ', res)
            await partialUpdateRecord(
              {
                id,
                areas: [...areas, res?.id],
              },
              endpoint
            )
              .then((res) => {
                if (res) {
                  toast.success('Area added successfully')

                  refreshRecords()
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
            onCreated={
              geofenceName != ''
                ? handleCreated
                : () => {
                    toast.error('Please enter a name for the area!')
                  }
            }
            draw={{
              rectangle: false,
              circle: false,
              circlemarker: false,
              marker: false,
              polyline: false,
              polygon: geofenceName != '',
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
export const AddArea = ({
  id,
  endpoint,
  refreshRecords,
  areas,
}: {
  id: string
  endpoint: string
  refreshRecords: () => void
  areas: number[]
}) => {
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
              <Input
                label='Name'
                clearable
                fullWidth
                size='lg'
                placeholder='Name'
                name='geofenceName'
                id='geofenceName'
                value={geofenceName}
                onChange={(e: any) => {
                  setGeofenceName(e.target.value.slice(0, 100))
                }}
              />
              <div className='h-96 flex flex-col items-start bg-gray-200 overflow-hidden rounded-md relative'>
                <Geofence
                  id={id}
                  geofenceName={geofenceName}
                  endpoint={endpoint}
                  refreshRecords={refreshRecords}
                  areas={areas}
                />
              </div>
              <div className='hidden'>
                <CityCard city={{} as any} />
              </div>
            </Modal.Body>
            {/* <Modal.Footer>
              <Button auto type='submit' className='bg-primary text-black'>
                Add Area
              </Button>
            </Modal.Footer> */}
          </>
        )}
      </Modal>
    </div>
  )
}
