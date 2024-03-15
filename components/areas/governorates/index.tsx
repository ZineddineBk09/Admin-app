import { Country, Governorate } from '../../../interfaces'
import { Divider } from '@nextui-org/react'
import React, { MouseEventHandler } from 'react'
import { AddGovernorate } from './add-governorate'
import { DeleteGovernorate } from './delete-governorate'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { useAreasGovernoratesContext } from '../../../context/areas/governorates'
import { useAreasCountriesContext } from '../../../context/areas/countries'
import { useFormik } from 'formik'
import toast from 'react-hot-toast'
import { updateRecord } from '../../../lib/api'
import InfiniteScroll from 'react-infinite-scroll-component'

const Governorates = () => {
  const { governorates, hasMore, fetchNextPage, isFetching } =
    useAreasGovernoratesContext()

  return (
    <div className='w-full mx-auto flex flex-col items-center gap-y-6'>
      <FilterWithCountry />

      {/* Governorates list */}
      <div className='w-full'>
        <InfiniteScroll
          dataLength={governorates?.length}
          hasMore={hasMore}
          next={fetchNextPage}
          loader={
            <span className='font-bold text-lg text-center'>Loading...</span>
          }
          endMessage={<div className='w-1/2 h-1 bg-gray-500' />}
          className='w-full flex flex-col items-center gap-y-6'
        >
          {governorates?.map((governorate: Governorate, index: number) => (
            <GovernorateCard key={governorate?.id} governorate={governorate} />
          ))}
        </InfiniteScroll>
      </div>
      {/* add governorate button */}
      <AddGovernorate />
    </div>
  )
}

const GovernorateCard = ({ governorate }: { governorate: Governorate }) => {
  const {
    id,
    name,
    country,
    order_fees,
    price_ratio_nominator,
    price_ratio_denominator,
    additional_ratio_nominator,
    additional_ratio_denominator,
  } = governorate
  const { refreshGovernorates } = useAreasGovernoratesContext()
  const [showInfos, setShowInfos] = React.useState(false)

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
          name: name,
          country: country?.id,
        },
        'governorate'
      )
        .then((res) => {
          if (res) {
            toast.success('Governorate updated successfully')

            refreshGovernorates()
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
          toast.error('Error updating governorate!')
        })
    },
  })

  return (
    <main className='w-full flex flex-col items-start gap-y-3 bg-white rounded-md p-4 shadow-lg'>
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
        <DeleteGovernorate id={id} />
      </div>
      {showInfos && (
        <>
          <Divider />
          <div className='flex items-center gap-x-6'>
            <label aria-label='Country' className='text-gray-500 capitalize'>
              Country
            </label>
            <p className='font-medium'>{country?.name}</p>
          </div>
          <Divider />

          <div className='flex items-center gap-x-6'>
            <label aria-label='Order Fees' className='text-gray-500 capitalize'>
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
    </main>
  )
}

const FilterWithCountry = () => {
  const { countries } = useAreasCountriesContext()
  const { handleFilter } = useAreasGovernoratesContext()

  return (
    <div className='w-full flex items-center gap-x-6 ml-12'>
      <label aria-label='Country' className='text-sm'>
        Select Country
      </label>
      <select
        name='country'
        id='country'
        className='w-72 h-10 bg-white rounded-full text-gray-900 text-sm block  p-2.5'
        onChange={(e) => handleFilter(e.target.value)}
      >
        <option value='all'>Select Country (All)</option>
        {countries?.map((country: Country, index: number) => (
          <option key={index} value={country?.name} className='px-2'>
            {country?.name}
          </option>
        ))}
      </select>
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

export default Governorates
