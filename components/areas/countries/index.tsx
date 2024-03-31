import { Country, Currency } from '../../../interfaces'
import { Divider } from '@nextui-org/react'
import React, { MouseEventHandler } from 'react'
import { AddCountry } from './add-country'
import { DeleteCountry } from './delete-country'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { AddCurrency } from './add-currency'
import { useAreasCountriesContext } from '../../../context/areas/countries'
import { useFormik } from 'formik'
import { updateRecord } from '../../../lib/api'
import toast from 'react-hot-toast'
import InfiniteScroll from 'react-infinite-scroll-component'
import Loading from '../../shared/loading'
import { DeleteModal } from '../../modals/delete'

const Countries = () => {
  const { countries, hasMore, fetchNextPage } = useAreasCountriesContext()

  return (
    <div className='w-full mx-auto flex flex-col items-center gap-y-6'>
      <div className='w-full'>
        <InfiniteScroll
          dataLength={countries?.length}
          hasMore={hasMore}
          next={fetchNextPage}
          loader={
            <span className='font-bold text-lg text-center'>Loading...</span>
          }
          endMessage={<div className='w-1/2 h-1 bg-gray-500' />}
          className='w-full flex flex-col items-center gap-y-6'
        >
          {countries?.map((country: Country) => (
            <CountryCard key={country?.id} country={country} />
          ))}
        </InfiniteScroll>
      </div>
      {/* add country button */}
      <AddCountry />
    </div>
  )
}

const CountryCard = ({ country }: { country: Country }) => {
  const { currencies, refreshCountries } = useAreasCountriesContext()
  const [showInfos, setShowInfos] = React.useState(false)
  const {
    id,
    name,
    price_unit,
    price_ratio_nominator,
    price_ratio_denominator,
    additional_ratio_nominator,
    additional_ratio_denominator,
    driver_fees,
    order_fees,
  } = country
  const [showSave, setShowSave] = React.useState({
    price_unit: false,
    driver_fees: false,
    order_fees: false,
    price_ratio_nominator: false,
    price_ratio_denominator: false,
    additional_ratio_nominator: false,
    additional_ratio_denominator: false,
  })
  const formik = useFormik({
    initialValues: {
      price_unit: country?.price_unit.id,
      driver_fees: country?.driver_fees,
      order_fees: country?.order_fees,
      price_ratio_nominator: price_ratio_nominator,
      price_ratio_denominator: price_ratio_denominator,
      additional_ratio_nominator: additional_ratio_nominator,
      additional_ratio_denominator: additional_ratio_denominator,
    },
    onSubmit: async (values) => {
      const price_unit = currencies?.find(
        (currency: Currency) => currency.id === formik.values.price_unit
      )
      if (!price_unit) {
        toast.error('Price unit not found!')
        return
      }
      await updateRecord(
        {
          ...values,
          id: country?.id,
          name: country?.name,
          price_unit: price_unit?.id,
        },
        'country'
      )
        .then((res) => {
          if (res) {
            toast.success('Country updated successfully')

            refreshCountries()
            setShowSave({
              price_unit: false,
              driver_fees: false,
              order_fees: false,
              price_ratio_nominator: false,
              price_ratio_denominator: false,
              additional_ratio_nominator: false,
              additional_ratio_denominator: false,
            })
          }
        })
        .catch((err) => {
          toast.error('Error updating country!')
        })
    },
  })

  return (
    <div className='w-full flex flex-col items-start gap-y-3 bg-white rounded-md p-4 shadow-lg'>
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
        <DeleteModal id={id} name='country' refresh={refreshCountries} />
      </div>

      {showInfos && (
        <>
          <Divider />
          <>
            <div className='flex items-center gap-x-6'>
              <label className='text-gray-500 capitalize'>Price Unit</label>
              <div className='h-11 max-w-xs bg-gray-200 rounded px-4 flex justify-between items-center'>
                <select
                  id='price_unit'
                  name='price_unit'
                  onChange={(e) => {
                    formik.handleChange(e)
                    setShowSave({ ...showSave, price_unit: true })
                  }}
                  value={formik.values.price_unit}
                  className={`border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 ${
                    formik.touched.price_unit && formik.errors.price_unit
                      ? 'border-red-500 bg-red-200'
                      : 'border-gray-300 bg-transparent'
                  }`}
                >
                  <option value={price_unit.id}>{price_unit.symbol}</option>
                  {currencies?.map((currency: Currency) => (
                    <option key={currency.id} value={currency.id}>
                      {currency.symbol}
                    </option>
                  ))}
                </select>
                <span className='text-gray-500 w-10'>{price_unit.symbol}</span>
              </div>
              {showSave.price_unit &&
                price_unit.id !== formik.values.price_unit &&
                SaveButton(formik.handleSubmit as any)}
              <AddCurrency />
            </div>
            <Divider />
          </>
          <>
            <div className='flex items-center gap-x-6'>
              <label className='text-gray-500 capitalize'>Driver Fees</label>
              <div className='h-11 max-w-xs bg-gray-200 rounded px-4 flex justify-between items-center'>
                <input
                  id='driver_fees'
                  name='driver_fees'
                  type='text'
                  onChange={(e) => {
                    formik.handleChange(e)
                    setShowSave({ ...showSave, driver_fees: true })
                  }}
                  value={formik.values.driver_fees}
                  placeholder='0'
                  className='bg-transparent w-full h-full outline-none'
                />
                <span className='text-gray-500 w-10'>{price_unit.symbol}</span>
              </div>
              {
                // Display save button if user changed driver fees
                showSave.driver_fees &&
                  driver_fees !== formik.values.driver_fees &&
                  SaveButton(formik.handleSubmit as any)
              }
            </div>
            <Divider />
          </>
          <>
            <div className='flex items-center gap-x-6'>
              <label className='text-gray-500 capitalize'>Order Fees</label>
              <div className='h-11 max-w-xs bg-gray-200 rounded px-4 flex justify-between items-center'>
                <input
                  id='order_fees'
                  name='order_fees'
                  type='text'
                  onChange={(e) => {
                    formik.handleChange(e)
                    setShowSave({ ...showSave, order_fees: true })
                  }}
                  value={formik.values.order_fees}
                  placeholder='0'
                  className='bg-transparent w-full h-full outline-none'
                />
                <span className='text-gray-500 w-36'>
                  {price_unit.symbol} / order
                </span>
              </div>
              {
                // Display save button if user changed order fees
                showSave.order_fees &&
                  order_fees !== formik.values.order_fees &&
                  SaveButton(formik.handleSubmit as any)
              }
            </div>
          </>
          <Divider />
          <div className='w-full flex justify-between'>
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
                      setShowSave({ ...showSave, price_ratio_nominator: true })
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
          </div>
        </>
      )}
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

export default Countries
