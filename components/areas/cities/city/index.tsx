import { City } from '@/interfaces'
import { Divider } from '@nextui-org/react'
import React from 'react'
import { Checkbox } from '@nextui-org/react'
import { DeleteCity } from '../delete-city'
import { FiltersIcon } from '@/components/icons/areas'
import { Button, Modal } from '@nextui-org/react'
import { Flex } from '@/components/styles/flex'
import dynamic from 'next/dynamic'
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'
import CopyToClipboardButton from '@/components/shared/copy-to-clipboard'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { useAreasCitiesContext } from '@/context/areas/cities'
const CityMap = dynamic(() => import('./map'), { ssr: false })

export const CityCard = ({ city }: { city: City }) => {
  const [showInfos, setShowInfos] = React.useState(false)
  const { id, name, driverFee, orderFee, governorateName } = city

  // Input fields that the user can edit
  const fields = [
    {
      name: 'Governorate',
      id: 'governorateName',
      defaultValue: governorateName,
    },
    {
      name: 'Driver Fees',
      id: 'driverFee',
      defaultValue: driverFee,
    },
    {
      name: 'Order Fees',
      id: 'orderFee',
      defaultValue: orderFee,
    },
  ]
  return (
    <div className='w-full grid grid-cols-7 bg-white rounded-md p-4 shadow-lg gap-x-4'>
      {/* Infos */}
      <div
        className={`w-full flex flex-col items-start gap-y-3 ${
          showInfos ? 'col-span-4' : 'col-span-7'
        }`}
      >
        <div className='w-full flex items-center justify-between'>
          <button onClick={() => setShowInfos(!showInfos)}>
            <div className='flex items-center gap-x-3'>
              <ChevronRightIcon
                className={`w-5 h-5 transform transition-all duration-300
            ${showInfos ? 'rotate-90' : 'rotate-0'}
            `}
              />
              <h1 className='text-lg font-semibold'>
                {name} <span className='ml-6 text-sm text-gray-400'>#{id}</span>
              </h1>
            </div>
          </button>
          <DeleteCity id={id} />
        </div>

        {/* Display input fields */}
        {showInfos && (
          <>
            <Divider></Divider>
            {fields?.map(({ name, id, defaultValue }: any, index: number) => (
              <>
                <div key={index} className='w-full flex items-center gap-x-6'>
                  <label className='text-gray-600 text-sm'>{name}</label>
                  <input
                    name={id}
                    id={id}
                    type='text'
                    value={defaultValue}
                    onChange={(e) => {
                      console.log(e.target.value)
                    }}
                    className='w-60 bg-gray-200 rounded-md p-2 text-sm'
                  />
                  <CopyToClipboardButton text={defaultValue} />
                </div>
                {index !== fields.length - 1 && <Divider></Divider>}
              </>
            ))}
          </>
        )}
      </div>

      {/* City Map */}
      {showInfos && (
        <div
          className={`bg-gray-200 rounded-md relative ${
            showInfos ? 'col-span-3' : 'hidden'
          }`}
        >
          <CityMap />
        </div>
      )}
    </div>
  )
}

export const SearchCity = () => {
  const { countries } = useAreasCitiesContext()
  return (
    <div className='w-full flex items-center gap-x-6 ml-12'>
      <label className='text-sm'>Select Country</label>
      <div className='w-72 h-10 bg-white rounded-full px-4'>
        <select
          name='country'
          id='country'
          className='w-full h-full bg-transparent '
        >
          <option value=''>All</option>
          {countries?.map((country: string, index: number) => (
            <option key={index} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>
      <GovernoratesModal />
    </div>
  )
}

const GovernoratesModal = () => {
  const [selected, setSelected] = React.useState([])
  const [visible, setVisible] = React.useState(false)
  const handler = () => setVisible(true)

  const closeHandler = () => {
    setVisible(false)
  }

  return (
    <div>
      <Button
        onClick={handler}
        className='text-[#5e5e5e] flex items-center rounded-full bg-white'
      >
        <span className='mr-3'>Governorate</span>
        <FiltersIcon />
      </Button>

      <Modal
        closeButton
        aria-labelledby='modal-title'
        width='400px'
        open={visible}
        onClose={closeHandler}
        className='rounded-md'
      >
        <Modal.Body>
          <Flex
            direction='column'
            css={{
              flexWrap: 'wrap',
              marginTop: '$4',
              gap: '$6',
              '@lg': { flexWrap: 'nowrap', gap: '$12' },
            }}
          >
            <div className='flex flex-col gap-3'>
              <Checkbox.Group
                label='Governorates'
                color='warning'
                value={selected}
                onChange={(e: any) => setSelected(e)}
              >
                <Checkbox value='riyadh'>Riyadh</Checkbox>
                <Checkbox value='jeddah'>Jeddah</Checkbox>
                <Checkbox value='dammam'>Dammam</Checkbox>
              </Checkbox.Group>
              <p className='text-default-500 text-small'>
                Selected: {selected.join(', ')}
              </p>
            </div>
          </Flex>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default CityCard
