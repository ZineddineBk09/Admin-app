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
import { useAreasGovernoratesContext } from '../../../context/areas/governorates'
import { Country, Governorate } from '../../../interfaces'
import toast from 'react-hot-toast'
import { createRecord } from '../../../lib/api'
import { useAreasCitiesContext } from '../../../context/areas/cities'
import { InformationCircleIcon } from '@heroicons/react/24/outline'
import { useAreasCountriesContext } from '../../../context/areas/countries'

export const AddCity = () => {
  const [visible, setVisible] = React.useState(false)
  const handler = () => setVisible(true)
  const [loading, setLoading] = React.useState<boolean>(false)
  const { refreshCities } = useAreasCitiesContext()
  const { governorates, handleFilter } = useAreasGovernoratesContext()
  const { countries } = useAreasCountriesContext()
  const [priceUnit, setPriceUnit] = React.useState<string>('')
  const [selectedCountry, setSelectedCountry] = React.useState<string>('')

  const formik = useFormik({
    initialValues: {
      name: '',
      governorate: '',
      order_fees: 0,
      price_ratio_nominator: '',
      price_ratio_denominator: '',
      additional_ratio_nominator: '',
      additional_ratio_denominator: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('name is required'),
      governorate: Yup.string().required('governorate is required'),
      order_fees: Yup.number().required('order fees is required'),
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
      console.log('Values: ', values)
      await createRecord(
        {
          ...values,
          // areas: [],
        },
        'city'
      )
        .then((res) => {
          if (res) {
            setVisible(false)
            toast.success('City added successfully')
            refreshCities()
          }
        })
        .catch((err) => {
          console.log('Error adding city!: ', err)
          toast.error('Error adding city!')
        })
    },
  })

  // wrire a function that handles reating a country, so that the governorate can inherit the values: order_fees, price_unit from the country
  const handleGovernorateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const govern = governorates?.find(
      (govern: Governorate) => govern.id === e.target.value
    )
    if (govern) {
      formik.setFieldValue('order_fees', govern.order_fees)
      formik.setFieldValue(
        'price_ratio_nominator',
        govern?.price_ratio_nominator
      )
      formik.setFieldValue(
        'price_ratio_denominator',
        govern?.price_ratio_denominator
      )
      formik.setFieldValue(
        'additional_ratio_nominator',
        govern?.additional_ratio_nominator
      )
      formik.setFieldValue(
        'additional_ratio_denominator',
        govern?.additional_ratio_denominator
      )
      setPriceUnit(govern?.country?.price_unit.symbol)
    }
  }

  const closeHandler = () => setVisible(false)

  return (
    <div>
      <Tooltip content='Add City'>
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
                Add City
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
                <Input
                  label={
                    formik.touched.name && formik.errors.name
                      ? formik.errors.name
                      : 'Name'
                  }
                  clearable
                  fullWidth
                  size='lg'
                  placeholder='Name'
                  name='name'
                  id='name'
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  status={
                    formik.touched.name && formik.errors.name
                      ? 'error'
                      : 'default'
                  }
                />
                {/* Country */}
                <div>
                  <label
                    aria-label='Country'
                    className='block mb-2 text-gray-900'
                  >
                    Country
                  </label>
                  <select
                    id='country'
                    name='country'
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      setSelectedCountry(e.target.value)
                      handleFilter(e.target.value)
                    }}
                    value={selectedCountry}
                    className='border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 border-gray-300 bg-gray-100'
                  >
                    <option value=''>Select Country</option>
                    {countries?.map((country: Country) => (
                      <option key={country?.id} value={country?.name}>
                        {country?.name}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Governorate */}
                <div>
                  <label
                    aria-label='Governorate'
                    className={`block mb-2 ${
                      formik.touched.governorate && formik.errors.governorate
                        ? 'text-red-500'
                        : 'text-gray-900'
                    }`}
                  >
                    {formik.touched.governorate && formik.errors.governorate
                      ? formik.errors.governorate
                      : 'Governorate'}
                  </label>
                  <select
                    id='governorate'
                    name='governorate'
                    onChange={(e) => {
                      formik.handleChange(e)
                      handleGovernorateChange(e)
                    }}
                    value={formik.values.governorate}
                    className={`border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 ${
                      formik.touched.governorate && formik.errors.governorate
                        ? 'border-red-500 bg-red-200'
                        : 'border-gray-300 bg-gray-100'
                    }`}
                  >
                    <option value=''>Select Governorate</option>
                    {governorates?.map((governorate: Governorate) => (
                      <option key={governorate?.id} value={governorate?.id}>
                        {governorate?.name}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Order Fees */}
                <Input
                  label={
                    formik.touched.order_fees && formik.errors.order_fees
                      ? formik.errors.order_fees
                      : 'Order Fees'
                  }
                  clearable
                  fullWidth
                  size='lg'
                  placeholder='Order Fees'
                  name='order_fees'
                  id='order_fees'
                  value={formik.values.order_fees}
                  onChange={formik.handleChange}
                  status={
                    formik.touched.order_fees && formik.errors.order_fees
                      ? 'error'
                      : 'default'
                  }
                />

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
                      contentRight={
                        <span className='text-gray-500'>
                          {priceUnit || 'Unit'}
                        </span>
                      }
                      placeholder={priceUnit || 'Unit'}
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
                      contentRight={
                        <span className='text-gray-500'>
                          {priceUnit || 'Unit'}
                        </span>
                      }
                      placeholder={priceUnit || 'Unit'}
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
                Add City
              </Button>
            </Modal.Footer>
          </form>
        )}
      </Modal>
    </div>
  )
}
