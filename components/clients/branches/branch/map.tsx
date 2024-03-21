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
import { partialUpdateRecord } from '../../../../lib/api'
import { useClientsBranchesContext } from '../../../../context/clients/branches'
import toast from 'react-hot-toast'
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
  id,
  location,
}: {
  id: string
  location: { lat: number; lng: number }
}) => {
  const { refreshBranches } = useClientsBranchesContext()
  const [position, setPosition] = useState<any>(location)
  const [map, setMap] = useState<any>(null)
  const [control, setControl] = useState<any>(null)
  const [updateLocation, setUpdateLocation] = useState<boolean>(false)

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
        draggable={updateLocation}
        icon={icon()}
        eventHandlers={eventHandlers}
        position={position}
        ref={markerRef}
      />
    )
  }

  const handleUpdateLocation = async () => {
    if (updateLocation) {
      // setPosition(marker.getLatLng())
      console.log(
        {
          latitude: position.lat,
          longitude: position.lng,
          id,
        },
        'address'
      )
      await partialUpdateRecord(
        {
          latitude: position.lat,
          longitude: position.lng,
          id,
        },
        'address'
      )
        .then((res) => {
          if (res) {
            toast.success('Location updated successfully')
            setUpdateLocation(false)
            refreshBranches()
          }
        })
        .catch((err) => {
          toast.error('Error updating location!')
        })
    } else {
      setUpdateLocation(true)
    }
  }

  return (
    <>
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
              setPosition(e.layer._latlng)
            }}
            onEdited={(e: any) => {
              console.log(e.layers.getLayers()[0]._latlng)
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
      <button
        className='px-4 py-2 bg-primary text-gray-700 rounded-lg absolute top-4 right-4 z-10'
        onClick={handleUpdateLocation}
      >
        {updateLocation ? 'Save Location' : 'Update Location'}
      </button>
    </>
  )
}

export default BranchMap
