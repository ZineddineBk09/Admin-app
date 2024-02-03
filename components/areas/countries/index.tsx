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

const Countries = () => {
  const { countries } = useAreasCountriesContext()

  return (
    <div className='w-full mx-auto flex flex-col items-center gap-y-6'>
      <div className='w-full flex flex-col items-center gap-y-6'>
        {countries?.map((country: Country, index: number) => (
          <CountryCard key={country.id} country={country} />
        ))}
      </div>
      {/* add country button */}
      <AddCountry />
    </div>
  )
}

const CountryCard = ({ country }: { country: Country }) => {
  const { currencies, refreshCountries } = useAreasCountriesContext()
  const formik = useFormik({
    initialValues: {
      price_unit: country.price_unit.id,
      driver_fees: country.driver_fees,
      order_fees: country.order_fees,
    },
    onSubmit: async (values) => {
      const price_unit = currencies?.find(
        (currency: Currency) => currency.id === formik.values.price_unit
      )
      console.log('price_unit: ', price_unit)
      if (!price_unit) {
        toast.error('Price unit not found!')
        return
      }
      await updateRecord(
        {
          ...values,
          id: country.id,
          name: country.name,
          price_unit,
        },
        'country'
      )
        .then((res) => {
          if (res) {
            console.log('res: ', res)
            toast.success('Country updated successfully')
            refreshCountries()
          }
        })
        .catch((err) => {
          toast.error('Error updating country!')
        })
    },
  })
  const [showInfos, setShowInfos] = React.useState(false)
  const { id, name, price_unit, driver_fees, order_fees } = country

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
        <DeleteCountry id={id} />
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
                  onChange={formik.handleChange}
                  value={formik.values.price_unit}
                  className={`border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 ${
                    formik.touched.price_unit && formik.errors.price_unit
                      ? 'border-red-500 bg-red-200'
                      : 'border-gray-300 bg-transparent'
                  }`}
                >
                  <option value={price_unit.id}>
                    {price_unit.symbol} - {price_unit.name}
                  </option>
                  {currencies?.map((currency: Currency) => (
                    <option key={currency.id} value={currency.id}>
                      {currency.symbol} - {currency.name}
                    </option>
                  ))}
                </select>
                <span className='text-gray-500 w-10'>{price_unit.symbol}</span>
              </div>
              {
                // Display save button if user changed price unit
                formik.values.price_unit !== price_unit.id &&
                  SaveButton(formik.handleSubmit as any)
              }
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
                  value={formik.values.driver_fees}
                  onChange={formik.handleChange}
                  placeholder='0'
                  className='bg-transparent w-full h-full outline-none'
                />
                <span className='text-gray-500 w-10'>{price_unit.symbol}</span>
              </div>
              {
                // Display save button if user changed driver fees
                formik.values.driver_fees !== driver_fees &&
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
                  //@ts-ignore
                  onChange={formik.handleChange}
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
                formik.values.order_fees !== order_fees &&
                  SaveButton(formik.handleSubmit as any)
              }
            </div>
          </>
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
    >
      Save
    </button>
  )
}

export default Countries
