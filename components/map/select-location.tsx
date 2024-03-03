import React from 'react'
import { useMapContext } from '../../context/map'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import dynamic from 'next/dynamic'
const SearchLocation = dynamic(() => import('./search-location'), {
  ssr: false,
})

const SelectLocation = () => {
  const { orders, selectedOrder } = useMapContext()
  const selectedOrderData = orders.find((order) => order?.id === selectedOrder)
  const formik = useFormik({
    initialValues: {
      latitude: '',
      longitude: '',
    },
    validationSchema: Yup.object({
      latitude: Yup.string().required('Required'),
      longitude: Yup.string().required('Required'),
    }),
    onSubmit: (values) => {
      console.log(values)
    },
  })

  if (selectedOrderData?.location) return null
  return (
    <>
      <div className='w-fit h-fit z-10 absolute top-4 right-4'>
        <SearchLocation formik={formik} />
      </div>
      <div className='w-fit flex flex-col items-start gap-y-5 absolute bottom-0 left-4 z-10 pb-4'>
        <div className='flex items-center gap-x-5 bg-white py-2 px-3 rounded'>
          {['latitude', 'longitude'].map((item: string, index: number) => (
            <div className='flex items-center gap-x-3' key={index}>
              <label className='text-gray-600 capitalize'>{item}</label>
              <input
                id={item}
                name={item}
                type='text'
                placeholder='0'
                className='h-9 max-w-[130px] bg-gray-200 rounded px-4'
                //@ts-ignore
                value={formik.values[item]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className='flex items-center gap-x-5'>
          <button
            className={`h-11 px-5 bg-primary rounded font-medium text-lg shadow-lg 
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
          <button className='h-11 px-8 bg-red-500 rounded font-medium text-lg shadow-lg hover:bg-opacity-90 transition-all duration-300'>
            Cancel
          </button>
        </div>
      </div>
    </>
  )
}

export default SelectLocation
