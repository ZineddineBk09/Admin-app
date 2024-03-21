import {
  Button,
  Input,
  Modal,
  Text,
  Loading,
  Tooltip,
  Popover,
} from '@nextui-org/react'
import React from 'react'
import { Flex } from '../../styles/flex'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { AddIcon } from '../../../components/icons/areas'
import { useDriversContext } from '../../../context/drivers'
import { createRecord } from '../../../lib/api'
import toast from 'react-hot-toast'
import { InformationCircleIcon } from '@heroicons/react/24/outline'

export const AddDriverType = () => {
  const [visible, setVisible] = React.useState(false)
  const handler = () => setVisible(true)
  const [loading, setLoading] = React.useState<boolean>(false)
  const { refreshDriverTypes, vehicleTypes } = useDriversContext()

  const formik = useFormik({
    initialValues: {
      vehicle_type: '',
      price_ratio_nominator: '',
      price_ratio_denominator: '',
      additional_ratio_nominator: '',
      additional_ratio_denominator: '',
    },
    validationSchema: Yup.object({
      vehicle_type: Yup.string().required('type is required'),
      price_ratio_nominator: Yup.number()
        .required('price ratio nominator is required')
        .min(1, 'price ratio denominator must be greater than 0'),
      price_ratio_denominator: Yup.number()
        .required('price ratio denominator is required')
        .min(1, 'price ratio denominator must be greater than 0'),
      additional_ratio_nominator: Yup.number()
        .required('additional ratio nominator is required')
        .min(1, 'price ratio denominator must be greater than 0'),
      additional_ratio_denominator: Yup.number()
        .required('additional ratio denominator is required')
        .min(1, 'price ratio denominator must be greater than 0'),
    }),
    onSubmit: async (values) => {
      await createRecord(
        {
          ...values,
        },
        'driver_type'
      )
        .then((res) => {
          if (res) {
            setVisible(false)
            toast.success('Driver type added successfully')
            refreshDriverTypes()
          }
        })
        .catch((err) => {
          console.log('Error adding driver type!: ', err)
          toast.error('Error adding driver type!')
        })
    },
  })

  const closeHandler = () => setVisible(false)

  return (
    <div>
      <Tooltip content='Add Type'>
        <Button auto onClick={handler} className='my-5 h-fit'>
          <AddIcon />
        </Button>
      </Tooltip>
      <Modal
        closeButton
        aria-labelledby='modal-title'
        width='600px'
        open={visible}
        onClose={closeHandler}
        className='rounded-md'
      >
        {/* Form */}
        {loading ? (
          <Loading size='xl' className='my-3' color='warning' />
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <Modal.Header css={{ justifyContent: 'center' }}>
              <Text
                id='modal-title'
                className='text-xl font-semibold capitalize'
                h4
              >
                Add Type
              </Text>
            </Modal.Header>
            <Modal.Body css={{ py: '$10' }}>
              <Flex
                direction={'column'}
                css={{
                  flexWrap: 'wrap',
                  gap: '$8',
                  '@lg': { flexWrap: 'nowrap', gap: '$12' },
                }}
              >
                {/* Name */}
                {/* <Input
                  label={
                    formik.touched.vehicle_type && formik.errors.vehicle_type
                      ? formik.errors.vehicle_type
                      : 'Name'
                  }
                  clearable
                  fullWidth
                  size='lg'
                  placeholder='Name'
                  name='vehicle_type'
                  id='vehicle_type'
                  value={formik.values.vehicle_type}
                  onChange={formik.handleChange}
                  status={
                    formik.touched.vehicle_type && formik.errors.vehicle_type
                      ? 'error'
                      : 'default'
                  }
                /> */}
                <div>
                  <label
                    className={`block mb-2 ${
                      formik.touched.vehicle_type && formik.errors.vehicle_type
                        ? 'text-red-500'
                        : 'text-gray-900'
                    }`}
                  >
                    {formik.touched.vehicle_type && formik.errors.vehicle_type
                      ? formik.errors.vehicle_type
                      : 'Name'}
                  </label>
                  <select
                    id='vehicle_type'
                    name='vehicle_type'
                    onChange={formik.handleChange}
                    value={formik.values.vehicle_type}
                    className={`border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 ${
                      formik.touched.vehicle_type && formik.errors.vehicle_type
                        ? 'border-red-500 bg-red-200'
                        : 'border-gray-300 bg-gray-100'
                    }`}
                  >
                    <option value=''>Select Vehicle</option>
                    {vehicleTypes?.map((type: string) => (
                      <option
                        key={type}
                        value={type}
                        className='capitalize h-20'
                      >
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Ratio Nominator & Denominator */}
                <div className='flex flex-col items-start'>
                  <label
                    aria-label='Price Ratio'
                    className={`block mb-2 ${
                      formik.touched.price_ratio_nominator &&
                      formik.errors.price_ratio_nominator
                        ? 'text-red-500'
                        : 'text-gray-900'
                    }`}
                  >
                    {formik.touched.price_ratio_nominator &&
                    formik.errors.price_ratio_nominator ? (
                      formik.errors.price_ratio_nominator
                    ) : (
                      <div className='flex gap-x-2'>
                        Price for
                        <b className='text-red-500'>
                          {formik.values.price_ratio_denominator || 0}
                        </b>
                        kilometer
                        {parseInt(formik.values.price_ratio_denominator) > 1 &&
                          's'}
                        <Popover>
                          <Popover.Trigger>
                            <InformationCircleIcon className='h-5 text-gray-500 hover:text-gray-700 hover:cursor-pointer' />
                          </Popover.Trigger>
                          <Popover.Content>
                            <Text css={{ p: '$5' }}>
                              Price pe distance of{' '}
                              <b>
                                {formik.values.price_ratio_denominator || 0}
                              </b>{' '}
                              kilometers that the driver will travel to deliver
                              the order
                            </Text>
                          </Popover.Content>
                        </Popover>
                      </div>
                    )}
                  </label>
                  <div className='flex items-center gap-x-4 bg-gray-100 rounded-xl'>
                    <Input
                      clearable
                      size='lg'
                      contentRight={<span className='text-gray-500'>SAR</span>}
                      placeholder='SAR'
                      name='price_ratio_nominator'
                      id='price_ratio_nominator'
                      value={formik.values.price_ratio_nominator}
                      onChange={formik.handleChange}
                      status={
                        formik.touched.price_ratio_nominator &&
                        formik.errors.price_ratio_nominator
                          ? 'error'
                          : 'default'
                      }
                    />
                    <b>/</b>
                    <Input
                      clearable
                      size='lg'
                      contentRight={<span className='text-gray-500'>KM</span>}
                      placeholder='KM'
                      name='price_ratio_denominator'
                      id='price_ratio_denominator'
                      value={formik.values.price_ratio_denominator}
                      onChange={formik.handleChange}
                      status={
                        formik.touched.price_ratio_denominator &&
                        formik.errors.price_ratio_denominator
                          ? 'error'
                          : 'default'
                      }
                    />
                  </div>
                </div>
                {/* Additional Ratio Nominator & Denominator */}
                <div className='flex flex-col items-start'>
                  <label
                    aria-label='Additional Ratio'
                    className={`block mb-2 ${
                      formik.touched.additional_ratio_nominator &&
                      formik.errors.additional_ratio_nominator
                        ? 'text-red-500'
                        : 'text-gray-900'
                    }`}
                  >
                    {formik.touched.additional_ratio_nominator &&
                    formik.errors.additional_ratio_nominator ? (
                      formik.errors.additional_ratio_nominator
                    ) : (
                      <div className='flex gap-x-2'>
                        Additional price per
                        <b className='text-red-500'>
                          {formik.values.additional_ratio_denominator || 0}
                        </b>
                        kilometer
                        {parseInt(formik.values.additional_ratio_denominator) >
                          1 && 's'}
                        <Popover>
                          <Popover.Trigger>
                            <InformationCircleIcon className='h-5 text-gray-500 hover:text-gray-700 hover:cursor-pointer' />
                          </Popover.Trigger>
                          <Popover.Content>
                            <Text css={{ p: '$5' }}>
                              Additional price for the distance of{' '}
                              <b>
                                {formik.values.additional_ratio_denominator ||
                                  0}
                              </b>{' '}
                              kilometers that will be added to the initial
                              distance
                            </Text>
                          </Popover.Content>
                        </Popover>
                      </div>
                    )}
                  </label>
                  <div className='flex items-center gap-x-4 bg-gray-100 rounded-xl'>
                    <Input
                      clearable
                      size='lg'
                      contentRight={<span className='text-gray-500'>SAR</span>}
                      placeholder='SAR'
                      name='additional_ratio_nominator'
                      id='additional_ratio_nominator'
                      value={formik.values.additional_ratio_nominator}
                      onChange={formik.handleChange}
                      status={
                        formik.touched.additional_ratio_nominator &&
                        formik.errors.additional_ratio_nominator
                          ? 'error'
                          : 'default'
                      }
                    />
                    <b>/</b>
                    <Input
                      clearable
                      size='lg'
                      contentRight={<span className='text-gray-500'>KM</span>}
                      placeholder='KM'
                      name='additional_ratio_denominator'
                      id='additional_ratio_denominator'
                      value={formik.values.additional_ratio_denominator}
                      onChange={formik.handleChange}
                      status={
                        formik.touched.additional_ratio_denominator &&
                        formik.errors.additional_ratio_denominator
                          ? 'error'
                          : 'default'
                      }
                    />
                  </div>
                </div>
              </Flex>
            </Modal.Body>
            <Modal.Footer>
              <Button auto type='submit' className='bg-primary text-black'>
                Add Type
              </Button>
            </Modal.Footer>
          </form>
        )}
      </Modal>
    </div>
  )
}
