import {
  Button,
  Input,
  Modal,
  Text,
  Loading,
  Tooltip,
  Radio,
} from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { Flex } from '../../styles/flex'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { createRecord, filterRecords } from '../../../lib/api'
import {
  APIResponse,
  Branch,
  City,
  Country,
  OrderItem,
} from '../../../interfaces'
import { useOrdersContext } from '../../../context/admin/orders'
import { useAreasCitiesContext } from '../../../context/admin/areas/cities'
import toast from 'react-hot-toast'
import { useAreasGovernoratesContext } from '../../../context/admin/areas/governorates'
import { useAreasCountriesContext } from '../../../context/admin/areas/countries'
import { BinIcon } from '../../icons/areas'
import { useCurrentUser } from '../../../hooks/current-user'

export const AddOrder = () => {
  const [visible, setVisible] = React.useState(false)
  const [branch, setBranch] = useState<Branch>({} as Branch)
  const handler = () => setVisible(true)
  const [error, setError] = React.useState<string>('')
  const [loading, setLoading] = React.useState<boolean>(false)
  const { refreshOrders } = useOrdersContext()
  const { countries } = useAreasCountriesContext()
  const { governorates } = useAreasGovernoratesContext()
  const { cities } = useAreasCitiesContext()
  const user = useCurrentUser()

  useEffect(() => {
    const getBranch = async () => {
      const branch: APIResponse = await filterRecords(
        {
          supervisor_id: user.user_id,
        },
        'branch'
      )

      setBranch(branch.results[0])
    }
    getBranch()
  }, [])

  const formik = useFormik({
    initialValues: {
      external_id: '',
      delivery_country: '',
      delivery_governorate: '',
      delivery_city: '',
      customer_name: '',
      customer_phone_number: '',
      client: '',
      payment_type: 'cash',
      order_items: [] as OrderItem[],
    },
    validationSchema: Yup.object({
      external_id: Yup.string().required('External ID is required'),
      delivery_country: Yup.string().required('Delivery Country is required'),
      delivery_governorate: Yup.string().required(
        'Delivery Governorate is required'
      ),
      delivery_city: Yup.string().required('Delivery City is required'),
      customer_name: Yup.string().required('Customer is required'),
      customer_phone_number: Yup.string().required(
        'Customer Phone Number is required'
      ),
      client: Yup.string(),
      payment_type: Yup.string().required('Payment Type is required'),
      order_items: Yup.array(
        Yup.object({
          name: Yup.string().required('Name is required'),
          description: Yup.string().required('Description is required'),
          code: Yup.string().required('Code is required'),
          price: Yup.number().required('Price is required'),
          qty: Yup.number().required('Quantity is required'),
        })
      ).required('Order items are required'),
    }),
    onSubmit: async (values) => {
      // TODO: create pickup, delivery addresses

      const delivery_address = await createRecord(
        {
          country: values.delivery_country,
          governorate: values.delivery_governorate,
          city: values.delivery_city,
        },
        'address'
      )
        .then((res) => {
          if (res) {
            console.log('Delivery address added successfully', res)
            return res.id
          }
        })
        .catch((err) => {
          console.log('Error adding delivery address', err)
        })
      /**  {
          pickup_address,
          ,
        } */

      await createRecord(
        {
          external_id: values.external_id,
          delivery_address,
          pickup_address: branch.address.id,
          customer: {
            name: values.customer_name,
            number: values.customer_phone_number,
          },
          client: values.client,
          payment_type: values.payment_type,
          order_items: values.order_items,
        },
        'order'
      )
        .then(async (res) => {
          if (res) {
            toast.success('Order added successfully')
            refreshOrders()
          }
        })
        .catch((err) => {
          toast.error('Error adding order!')
        })
        .finally(() => {
          setVisible(false)
        })
    },
  })

  const closeHandler = () => setVisible(false)

  return (
    <div className='fixed right-12 bottom-12 z-[100]'>
      <Button
        auto
        onClick={handler}
        className='h-20 w-20 bg-primary bg-opacity-60 text-black rounded-full font-bold text-5xl shadow-md shadow-gray-400'
      >
        +
      </Button>

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
                Add order
              </Text>
            </Modal.Header>
            {/* <Divider css={{ my: '$5' }} /> */}
            <Modal.Body css={{ py: '$10' }}>
              <Flex
                direction={'column'}
                css={{
                  flexWrap: 'wrap',
                  gap: '$8',
                  '@lg': { flexWrap: 'nowrap', gap: '$12' },
                }}
              >
                {/* error */}
                {error && (
                  <span className='w-full text-center transition-all duration-300 bg-red-100 text-xs text-red-500 rounded p-2 mx-auto'>
                    {error}
                  </span>
                )}

                <Flex
                  css={{
                    gap: '$10',
                    flexWrap: 'wrap',
                  }}
                >
                  <Input
                    label={
                      formik.touched.external_id && formik.errors.external_id
                        ? formik.errors.external_id
                        : 'External ID (should match the order id in your system)'
                    }
                    clearable
                    fullWidth
                    size='lg'
                    placeholder='External ID'
                    name='external_id'
                    id='external_id'
                    value={formik.values.external_id}
                    onChange={formik.handleChange}
                    status={
                      formik.touched.external_id && formik.errors.external_id
                        ? 'error'
                        : 'default'
                    }
                  />
                </Flex>

                <div className='flex flex-col items-start justify-start w-full'>
                  <label
                    className={`block mb-2 ${
                      formik.touched.delivery_country &&
                      formik.errors.delivery_country &&
                      formik.touched.delivery_governorate &&
                      formik.errors.delivery_governorate &&
                      formik.touched.delivery_city &&
                      formik.errors.delivery_city
                        ? 'text-red-500'
                        : 'text-gray-900'
                    }`}
                  >
                    Delivery Address
                  </label>
                  <Flex
                    css={{
                      gap: '$10',
                      flexWrap: 'wrap',
                      '@xl': { flexWrap: 'nowrap' },
                    }}
                    className='w-full'
                  >
                    <select
                      id='delivery_country'
                      name='delivery_country'
                      onChange={(e) => {
                        formik.handleChange(e)
                      }}
                      value={formik.values.delivery_country}
                      className={`w-1/3 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 block p-2.5 ${
                        formik.touched.delivery_country &&
                        formik.errors.delivery_country
                          ? 'border-red-500 bg-red-200'
                          : 'border-gray-300 bg-gray-100'
                      }`}
                    >
                      <option value=''>Select Country</option>
                      {countries?.map((Country: Country) => (
                        <option key={Country.id} value={Country.id}>
                          {Country.name}
                        </option>
                      ))}
                    </select>

                    <select
                      id='delivery_governorate'
                      name='delivery_governorate'
                      onChange={(e) => {
                        formik.handleChange(e)
                      }}
                      value={formik.values.delivery_governorate}
                      className={`w-1/3 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 block p-2.5 ${
                        formik.touched.delivery_governorate &&
                        formik.errors.delivery_governorate
                          ? 'border-red-500 bg-red-200'
                          : 'border-gray-300 bg-gray-100'
                      }`}
                    >
                      <option value=''>Select Governorate</option>
                      {governorates?.map((Governorate) => (
                        <option key={Governorate.id} value={Governorate.id}>
                          {Governorate.name}
                        </option>
                      ))}
                    </select>

                    <select
                      id='delivery_city'
                      name='delivery_city'
                      onChange={(e) => {
                        formik.handleChange(e)
                      }}
                      value={formik.values.delivery_city}
                      className={`w-1/3 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 block p-2.5 ${
                        formik.touched.delivery_city &&
                        formik.errors.delivery_city
                          ? 'border-red-500 bg-red-200'
                          : 'border-gray-300 bg-gray-100'
                      }`}
                    >
                      <option value=''>Select City</option>
                      {cities?.map((City: City) => (
                        <option key={City.id} value={City.id}>
                          {City.name}
                        </option>
                      ))}
                    </select>
                  </Flex>
                </div>

                <div>
                  <label
                    className={`block mb-2 ${
                      formik.touched.payment_type && formik.errors.payment_type
                        ? 'text-red-500'
                        : 'text-gray-900'
                    }`}
                  >
                    {formik.touched.payment_type && formik.errors.payment_type
                      ? formik.errors.payment_type
                      : 'Payment Type'}
                  </label>
                  {/* <select
                    id='payment_type'
                    name='payment_type'
                    onChange={formik.handleChange}
                    value={formik.values.payment_type}
                    className={`border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 ${
                      formik.touched.payment_type && formik.errors.payment_type
                        ? 'border-red-500 bg-red-200'
                        : 'border-gray-300 bg-gray-100'
                    }`}
                  >
                    <option value='cash'>Cash</option>
                    <option value='mastercard'>Mastercard</option>
                    <option value='visa'>Visa</option>
                  </select> */}
                  <Radio.Group
                    defaultValue='cash'
                    orientation='horizontal'
                    color='warning'
                    size='sm'
                    value={formik.values.payment_type}
                    onChange={(e) => {
                      formik.setFieldValue('payment_type', e)
                    }}
                  >
                    <Radio value='cash' isSquared>
                      Cash
                    </Radio>
                    <Radio value='mastercard' isSquared>
                      Mastercard
                    </Radio>
                    <Radio value='visa' isSquared>
                      Visa
                    </Radio>
                  </Radio.Group>
                </div>

                <div className='flex flex-col items-start justify-start w-full'>
                  <label
                    className={`block mb-2 ${
                      formik.touched.customer_name &&
                      formik.errors.customer_name &&
                      formik.touched.customer_phone_number &&
                      formik.errors.customer_phone_number
                        ? 'text-red-500'
                        : 'text-gray-900'
                    }`}
                  >
                    Customer
                  </label>
                  <Flex
                    css={{
                      gap: '$10',
                      flexWrap: 'wrap',
                      '@xl': { flexWrap: 'nowrap' },
                    }}
                  >
                    <Input
                      clearable
                      fullWidth
                      size='lg'
                      placeholder='Name'
                      name='customer_name'
                      id='customer_name'
                      value={formik.values.customer_name}
                      onChange={formik.handleChange}
                      status={
                        formik.touched.customer_name &&
                        formik.errors.customer_name
                          ? 'error'
                          : 'default'
                      }
                    />

                    <Input
                      clearable
                      fullWidth
                      size='lg'
                      placeholder='Phone Number'
                      name='customer_phone_number'
                      id='customer_phone_number'
                      value={formik.values.customer_phone_number}
                      onChange={formik.handleChange}
                      status={
                        formik.touched.customer_phone_number &&
                        formik.errors.customer_phone_number
                          ? 'error'
                          : 'default'
                      }
                    />
                  </Flex>
                </div>

                <div className='flex flex-col items-start justify-start w-full'>
                  <label
                    className={`block mb-2 ${
                      formik.touched.order_items && formik.errors.order_items
                        ? 'text-red-500'
                        : 'text-gray-900'
                    }`}
                  >
                    Order Items
                  </label>

                  <Flex
                    css={{
                      gap: '$10',
                      flexWrap: 'wrap',
                      '@xl': { flexWrap: 'wrap' },
                    }}
                  >
                    {formik.values.order_items.map(
                      (item: OrderItem, index: number) => (
                        <div key={index}>
                          <div className='h-10 w-fit flex items-center gap-x-4 transition-all duration-300 hover:bg-gray-100 px-1 rounded-md'>
                            <p className='text-sm capitalize'>
                              {item?.name}
                              <small className='font-bold ml-2'>x</small>
                              {item?.qty}
                            </p>

                            <button
                              type='button'
                              onClick={() => {
                                formik.setFieldValue(
                                  'order_items',
                                  formik.values.order_items.filter(
                                    (i: OrderItem) => i.code !== item.code
                                  )
                                )
                              }}
                            >
                              <BinIcon width={4} />
                            </button>
                            {index < formik.values.order_items?.length - 1 && (
                              <span className='-ml-4'>,</span>
                            )}
                          </div>
                        </div>
                      )
                    )}
                    <AddItem parentFormik={formik} />
                  </Flex>
                </div>
              </Flex>
            </Modal.Body>

            <Modal.Footer>
              <Button auto type='submit' className='bg-primary text-black'>
                Add Order
              </Button>
            </Modal.Footer>
          </form>
        )}
      </Modal>
    </div>
  )
}

const AddItem = ({ parentFormik }: { parentFormik: any }) => {
  const [visible, setVisible] = React.useState(false)
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      price: 0,
      code: 0,
      qty: 0,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      description: Yup.string().required('Description is required'),
      price: Yup.number().required('Price is required'),
      code: Yup.number()
        .required('Code is required')
        .notOneOf(
          parentFormik.values.order_items.map((item: OrderItem) => item.code),
          'Code already exists'
        ),
      qty: Yup.number().required('Quantity is required').min(1),
    }),
    onSubmit: (values) => {},
  })

  const handler = () => setVisible(true)

  const closeHandler = () => setVisible(false)

  const handleSubmit = () => {
    parentFormik.setFieldValue('order_items', [
      ...parentFormik.values.order_items,
      formik.values,
    ])
    setVisible(false)
  }

  return (
    <div>
      <Tooltip content='Add Item' onClick={handler}>
        <button
          type='button'
          className='h-10 w-10 flex items-center justify-center text-4xl font-medium rounded-full bg-gray-200 pb-1'
        >
          +
        </button>
      </Tooltip>
      <Modal
        closeButton
        aria-labelledby='modal-title'
        width='600px'
        open={visible}
        onClose={closeHandler}
        className='rounded-md'
      >
        <Modal.Header css={{ justifyContent: 'center' }}>
          <Text
            id='modal-title'
            className='text-xl font-semibold capitalize'
            h4
          >
            Add Item
          </Text>
        </Modal.Header>
        <Modal.Body css={{ py: '$10' }}>
          <Flex
            direction={'column'}
            css={{
              gap: '$8',
            }}
          >
            {['name', 'description', 'code', 'price', 'qty'].map(
              (field, index) => (
                <Input
                  key={index}
                  label={field.charAt(0).toUpperCase() + field.slice(1)}
                  clearable
                  fullWidth
                  size='lg'
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  name={field}
                  id={field}
                  // @ts-ignore
                  value={formik.values[field]}
                  onChange={formik.handleChange}
                  status={
                    // @ts-ignore
                    formik.touched[field] && formik.errors[field]
                      ? 'error'
                      : 'default'
                  }
                />
              )
            )}
          </Flex>
        </Modal.Body>
        <Modal.Footer>
          <Button
            auto
            className='bg-primary text-black disabled:bg-gray-200'
            onClick={handleSubmit}
            disabled={Object.keys(formik.errors).length > 0}
          >
            Add Item
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}