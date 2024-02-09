import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Location } from '../../interfaces'
const Map = dynamic(() => import('./map'), { ssr: false })
const SearchLocation = dynamic(() => import('../map/search-location'), {
  ssr: false,
})

const LocationForm = () => {
  const formik = useFormik({
    initialValues: {
      search: '',
      latitude: 0,
      longitude: 0,
    },
    validationSchema: Yup.object({
      search: Yup.string().required('Required'),
      latitude: Yup.number().required('Required'),
      longitude: Yup.number().required('Required'),
    }),
    onSubmit: (values) => {
      console.log(values)
    },
  })

  return (
    <div className='max-w-xl w-[90%] m-auto h-[95vh] rounded-xl relative'>
      <Map
        location={{
          latitude: formik.values.latitude,
          longitude: formik.values.longitude,
        }}
        setLocation={({ latitude, longitude }: Location) => {
          formik.setValues({ ...formik.values, latitude, longitude })
        }}
      />
      <div className='absolute z-10 flex flex-col items-start gap-y-6 bg-gray-100 w-full inset-x-0 bottom-0 rounded-t-xl p-8 text-sm'>
        <label>Select Location</label>

        <SearchLocation formik={formik} />

        <div className='w-full flex items-center gap-x-6 justify-between'>
          {['latitude', 'longitude'].map((item: string, index: number) => (
            <div className='flex items-center gap-x-3' key={index}>
              <input
                id={item}
                name={item}
                type='text'
                placeholder={item}
                className='h-8 w-full bg-gray-200 rounded px-4 text-sm'
                //@ts-ignore
                value={formik.values[item]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className='w-full flex items-center gap-x-5 justify-between'>
          <button
            className={`h-11 w-full bg-primary rounded font-medium text-sm shadow-lg 
          ${
            formik.isValid
              ? 'bg-opacity-100 hover:bg-opacity-90 transition-all duration-300 hover:shadow-xl'
              : 'bg-opacity-50 cursor-not-allowed'
          }
          `}
            onClick={() => console.log('Submit: ', formik.values)}
            disabled={!formik.isValid}
          >
            Confirm Location
          </button>
          <button className='h-11 w-full bg-red-500 rounded font-medium text-sm shadow-lg hover:bg-opacity-90 transition-all duration-300'>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default LocationForm
