import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Address, Location, Order } from '../../interfaces'
import Image from 'next/image'
import { getRecord, partialUpdateRecord } from '../../lib/api'
const Map = dynamic(() => import('./map'), { ssr: false })
const SearchLocation = dynamic(() => import('../map/search-location'), {
  ssr: false,
})

const LocationForm = ({
  order_id,
  token,
}: {
  order_id: string
  token: string
}) => {
  const [order, setOrder] = useState<Order>({} as Order)
  const [delivery_address, setDeliveryAddress] = useState({} as Address)
  const [success, setSuccess] = useState<boolean>(false)
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
    onSubmit: async (values) => {
      console.log(values)
      // update order delivery address latitude and logitude fields
      await partialUpdateRecord(
        {
          id: delivery_address.id,
          latitude: values.latitude,
          longitude: values.longitude,
        },
        'address'
      ).then(
        (res) => {
          console.log(res)
          setSuccess(true)
        },
        (err) => console.log(err)
      )
    },
  })

  useEffect(() => {
    // get order
    const getOrder = async () => {
      console.log(order_id)
      const res = await getRecord(order_id, 'order')
      setOrder(res)
      setDeliveryAddress(res.delivery_address)

      // check if delivery_address has latitude and longitude
      if (res.delivery_address.latitude && res.delivery_address.longitude) {
        formik.setValues({
          ...formik.values,
          latitude: res.delivery_address.latitude,
          longitude: res.delivery_address.longitude,
        })
      }
    }
    getOrder()
  }, [order_id])

  if (success)
    return (
      <div className='w-full h-full flex items-center justify-center m-auto'>
        <p className='text-xl font-semibold'>
          Your order is being processed, please wait...
        </p>
      </div>
    )
  return (
    <div className='w-[90%] m-auto h-[100vh] rounded-xl relative lg:max-w-xl'>
      <div className='w-full flex items-center justify-start my-3'>
        <Image
          src='/images/logo.png'
          alt='Company'
          width={50}
          height={50}
          className='object-contain w-full h-full'
        />
        <p className='text-2xl font-medium'>
          <span className='text-primary'>Fleet</span>Run
        </p>
      </div>
      <div className='relative h-[90vh]'>
        <Map
          location={{
            latitude: formik.values.latitude,
            longitude: formik.values.longitude,
          }}
          setLocation={({ latitude, longitude }: Location) => {
            formik.setValues({ ...formik.values, latitude, longitude })
          }}
        />
        <div className='absolute z-10 flex flex-col items-start gap-y-6 bg-gray-100 w-full inset-x-0 bottom-0 rounded-xl p-8 text-sm shadow-[0_-10px_30px_-20px_rgba(0,0,0,0.9)]'>
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
                  disabled
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
              onClick={formik.handleSubmit as any}
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
    </div>
  )
}

export default LocationForm
