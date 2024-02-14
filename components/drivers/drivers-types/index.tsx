import { DriverType } from '../../../interfaces'
import { Divider } from '@nextui-org/react'
import React, { MouseEventHandler } from 'react'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { AddDriverType } from './add-type'
import { DeleteDriverType } from './delete-type'
import { useDriversContext } from '../../../context/drivers'
import { useFormik } from 'formik'
import { updateRecord } from '../../../lib/api'
import toast from 'react-hot-toast'

const DriversTypes = () => {
  const { driverTypes } = useDriversContext()

  return (
    <div className='w-full mx-auto flex flex-col items-center gap-y-6'>
      <SearchTypes />
      <div className='w-full flex flex-col items-center gap-y-6'>
        {driverTypes?.map((type: DriverType, index: number) => (
          <CountryCard key={type.id} type={type} />
        ))}
      </div>
      {/* add type button */}
      <AddDriverType />
    </div>
  )
}

const CountryCard = ({ type }: { type: DriverType }) => {
  const [showInfos, setShowInfos] = React.useState(false)
  const { refreshDriverTypes } = useDriversContext()
  const {
    id,
    vehicle_type,
    price_ratio_nominator,
    price_ratio_denominator,
    additional_ratio_nominator,
    additional_ratio_denominator,
  } = type
  const [showSave, setShowSave] = React.useState({
    price_ratio_nominator: false,
    price_ratio_denominator: false,
    additional_ratio_nominator: false,
    additional_ratio_denominator: false,
  })
  const formik = useFormik({
    initialValues: {
      price_ratio_nominator: price_ratio_nominator,
      price_ratio_denominator: price_ratio_denominator,
      additional_ratio_nominator: additional_ratio_nominator,
      additional_ratio_denominator: additional_ratio_denominator,
    },
    onSubmit: async (values) => {
      await updateRecord(
        {
          ...values,
          id,
        },
        'driver_type'
      )
        .then((res) => {
          if (res) {
            toast.success('Driver type updated successfully')

            refreshDriverTypes()
            setShowSave({
              price_ratio_nominator: false,
              price_ratio_denominator: false,
              additional_ratio_nominator: false,
              additional_ratio_denominator: false,
            })
          }
        })
        .catch((err) => {
          toast.error('Error updating driver type!')
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
            <h1 className='text-lg font-semibold capitalize'>
              {vehicle_type}{' '}
              <span className='ml-6 text-sm text-gray-400'>#{id}</span>
            </h1>
          </div>
        </button>
        <DeleteDriverType id={id} />
      </div>
      {showInfos && <Divider />}
      <div className='w-full flex flex-col gap-y-3 items-center lg:flex-row'>
        {showInfos && (
          <>
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
    </div>
  )
}

const SearchTypes = () => {
  return (
    <div className='w-full flex items-center gap-x-6 ml-12'>
      <div className='w-72 h-10 bg-white rounded-full px-4'>
        <input
          name='type'
          id='type'
          className='w-full h-full bg-transparent'
          placeholder='Search'
        />
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

export default DriversTypes
