import { Button, Modal, Text, Loading, Tooltip, Input } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import * as L from 'leaflet'
import {
  DriverTeamMember,
  GeoJSONCoordinate,
  GeoJSONObject,
} from '../../../interfaces'
import CityCard from '../../areas/cities/city'
import { FeatureGroup, MapContainer, TileLayer } from 'react-leaflet'
import { EditControl } from 'react-leaflet-draw'
import toast from 'react-hot-toast'
import { createRecord } from '../../../lib/api'

const Geofence = () => {
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
    </>
  )
}
export const AddArea = ({ members }: { members: DriverTeamMember[] }) => {
  const [visible, setVisible] = React.useState(false)
  const [loading, setLoading] = React.useState<boolean>(false)
  const [search, setSearch] = React.useState('')

  const handler = () => setVisible(true)

  const closeHandler = () => {
    setVisible(false)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  return (
    <div>
      <Tooltip content='Add Area' onClick={handler}>
        <button className='h-10 w-16 flex items-center justify-center text-center text-4xl font-medium rounded-full'>
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
                name='name'
                id='name'
                value={''}
                onChange={() => {}}
              />
              <div className='h-96 flex flex-col items-start bg-gray-200 overflow-hidden rounded-md relative'>
                <Geofence />
              </div>
              <div className='hidden'>
                <CityCard city={{} as any} />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button auto type='submit' className='bg-primary text-black'>
                Add Area
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  )
}
