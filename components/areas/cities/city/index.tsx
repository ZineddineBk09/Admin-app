import { City, Country } from '../../../../interfaces'
import { Divider } from '@nextui-org/react'
import React, { MouseEventHandler } from 'react'
import { Checkbox } from '@nextui-org/react'
import { DeleteCity } from '../delete-city'
import { FiltersIcon } from '../../../../components/icons/areas'
import { Button, Modal } from '@nextui-org/react'
import { Flex } from '../../../../components/styles/flex'
import dynamic from 'next/dynamic'
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import Loading from '../../../../components/shared/loading'
import { useAreasCountriesContext } from '../../../../context/areas/countries'
import { useFormik } from 'formik'
import { updateRecord } from '../../../../lib/api'
import { useAreasCitiesContext } from '../../../../context/areas/cities'
import toast from 'react-hot-toast'
import { useAreasGovernoratesContext } from '../../../../context/areas/governorates'
const CityMap = dynamic(() => import('./map'), {
  ssr: false,
  loading: () => <Loading />,
})

export const CityCard = ({ city }: { city: City }) => {
  const [showInfos, setShowInfos] = React.useState(false)
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

  const [showSave, setShowSave] = React.useState({
    order_fees: false,
    price_ratio_nominator: false,
    price_ratio_denominator: false,
    additional_ratio_nominator: false,
    additional_ratio_denominator: false,
  })
  const formik = useFormik({
    initialValues: {
      order_fees: order_fees,
      price_ratio_nominator: price_ratio_nominator,
      price_ratio_denominator: price_ratio_denominator,
      additional_ratio_nominator: additional_ratio_nominator,
      additional_ratio_denominator: additional_ratio_denominator,
    },
    onSubmit: async (values) => {
      await updateRecord(
        {
          ...values,
          id: id,
          governorate: governorate?.id,
          name,
        },
        'city'
      )
        .then((res) => {
          if (res) {
            toast.success('City updated successfully')

            refreshCities()
            setShowSave({
              order_fees: false,
              price_ratio_nominator: false,
              price_ratio_denominator: false,
              additional_ratio_nominator: false,
              additional_ratio_denominator: false,
            })
          }
        })
        .catch((err) => {
          toast.error('Error updating city!')
        })
    },
  })

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
            <Divider />
            <div className='flex items-center gap-x-6'>
              <label
                aria-label='Governorate'
                className='text-gray-500 capitalize'
              >
                Governorate
              </label>
              <p className='font-medium'>{governorate?.name}</p>
            </div>
            <Divider />

            <div className='flex items-center gap-x-6'>
              <label
                aria-label='Order Fees'
                className='text-gray-500 capitalize'
              >
                Order Fees
              </label>
              <div className='h-11 max-w-xs bg-gray-200 rounded px-4 flex justify-between items-center'>
                <input
                  id='order_fees'
                  name='order_fees'
                  type='text'
                  value={formik.values.order_fees}
                  placeholder='0'
                  className='bg-transparent w-full h-full outline-none'
                  onChange={(e) => {
                    formik.handleChange(e)
                    setShowSave({ ...showSave, order_fees: true })
                  }}
                />
                <span className='text-gray-500 w-32'>SAR / order</span>
              </div>
              {showSave.order_fees && SaveButton(formik.handleSubmit as any)}
            </div>
            <Divider />
            <div className='flex items-center gap-x-6'>
              <label aria-label='Price' className='text-gray-500 capitalize'>
                Price
              </label>
              <div className='h-11 max-w-xs bg-gray-200 rounded px-4 flex justify-between items-center'>
                <>
                  <input
                    id='price_ratio_nominator'
                    name='price_ratio_nominator'
                    type='text'
                    value={formik.values.price_ratio_nominator}
                    placeholder='0'
                    className='bg-transparent w-full h-full outline-none'
                    onChange={(e) => {
                      formik.handleChange(e)
                      setShowSave({
                        ...showSave,
                        price_ratio_nominator: true,
                      })
                    }}
                  />
                  <span className='text-gray-500 w-32'>SAR</span>
                </>
                <b className='mx-5'>/</b>
                <>
                  <input
                    id='price_ratio_denominator'
                    name='price_ratio_denominator'
                    type='text'
                    value={formik.values.price_ratio_denominator}
                    placeholder='0'
                    className='bg-transparent w-full h-full outline-none'
                    onChange={(e) => {
                      formik.handleChange(e)
                      setShowSave({
                        ...showSave,
                        price_ratio_denominator: true,
                      })
                    }}
                  />
                  <span className='text-gray-500 w-32'>KM</span>
                </>
              </div>
              {(showSave.price_ratio_denominator ||
                showSave.price_ratio_nominator) &&
                SaveButton(formik.handleSubmit as any)}
            </div>
            <Divider />
            <div className='flex items-center gap-x-6'>
              <label
                aria-label='Additional'
                className='text-gray-500 capitalize'
              >
                Additional
              </label>
              <div className='h-11 max-w-xs bg-gray-200 rounded px-4 flex justify-between items-center'>
                <>
                  <input
                    id='additional_ratio_nominator'
                    name='additional_ratio_nominator'
                    type='text'
                    value={formik.values.additional_ratio_nominator}
                    placeholder='0'
                    className='bg-transparent w-full h-full outline-none'
                    onChange={(e) => {
                      formik.handleChange(e)
                      setShowSave({
                        ...showSave,
                        additional_ratio_nominator: true,
                      })
                    }}
                  />
                  <span className='text-gray-500 w-32'>SAR</span>
                </>
                <b className='mx-5'>/</b>
                <>
                  <input
                    id='additional_ratio_denominator'
                    name='additional_ratio_denominator'
                    type='text'
                    value={formik.values.additional_ratio_denominator}
                    placeholder='0'
                    className='bg-transparent w-full h-full outline-none'
                    onChange={(e) => {
                      formik.handleChange(e)
                      setShowSave({
                        ...showSave,
                        additional_ratio_denominator: true,
                      })
                    }}
                  />
                  <span className='text-gray-500 w-32'>KM</span>
                </>
              </div>
              {(showSave.additional_ratio_denominator ||
                showSave.additional_ratio_nominator) &&
                SaveButton(formik.handleSubmit as any)}
            </div>
            <div />
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
          <CityMap city={city} />
        </div>
      )}
    </div>
  )
}

export const SearchCity = () => {
  const { countries } = useAreasCountriesContext()
  const { governorates } = useAreasGovernoratesContext()
  const { handleFilterCountry, handleFilterGovernorate } =
    useAreasCitiesContext()
  const [selectedCountry, setSelectedCountry] = React.useState('all')
  const [selectedGovernorate, setSelectedGovernorate] = React.useState('all')

  const handleSelectCountry = (country: string) => {
    setSelectedCountry(country)
    handleFilterCountry(country)
  }

  const handleSelectGovernorate = (governorate: string) => {
    setSelectedGovernorate(governorate)
    handleFilterGovernorate(governorate)
  }

  return (
    <div className='w-full flex items-center gap-x-6 ml-12'>
      <label className='text-sm'>Select Country</label>
      <div className='w-72 h-10 bg-white rounded-full px-4'>
        <select
          name='country'
          id='country'
          className='w-72 h-10 bg-white rounded-full text-gray-900 text-sm block  p-2.5'
          onChange={(e) => handleSelectCountry(e.target.value)}
        >
          <option value='all'>Select Country (All)</option>
          {countries?.map((country: Country, index: number) => (
            <option key={index} value={country.name} className='px-2'>
              {country.name}
            </option>
          ))}
        </select>
      </div>
      <div className='w-72 h-10 bg-white rounded-full px-4'>
        <select
          name='governorate'
          id='governorate'
          className='w-72 h-10 bg-white rounded-full text-gray-900 text-sm block  p-2.5'
          onChange={(e) => handleSelectGovernorate(e.target.value)}
        >
          <option value='all'>Select Governorate (All)</option>

          {governorates
            ?.filter(
              (governorate) => governorate?.country.name === selectedCountry
            )
            .map((governorate: any, index: number) => (
              <option key={index} value={governorate?.name} className='px-2'>
                {governorate?.name}
              </option>
            ))}
        </select>
      </div>
    </div>
  )
}

const SaveButton = (submit: MouseEventHandler<HTMLButtonElement>) => {
  return (
    <button
      onClick={submit}
      className='bg-primary-500 text-black px-6 py-2 rounded-md hover:bg-primary'
      type='button'
    >
      Save
    </button>
  )
}

export default CityCard
