import React, { useEffect, useState } from 'react'
import {
  Button,
  Input,
  Modal,
  Text,
  Loading,
  Tooltip,
  Radio,
} from '@nextui-org/react'
import { Flex } from '../../styles/flex'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { createRecord, filterRecords } from '../../../lib/api'
import { APIResponse, Branch, OrderItem } from '../../../interfaces'
import { useOrdersContext } from '../../../context/client/orders'
import toast from 'react-hot-toast'
import { BinIcon } from '../../icons/areas'
import { useCurrentUser } from '../../../hooks/current-user'
import { useCurrentRole } from '../../../hooks/current-role'
import BranchMap from './map'

export const AddOrder = () => {
  const [visible, setVisible] = useState(false)
  const [branch, setBranch] = useState<Branch>({} as Branch)
  const handler = () => setVisible(true)
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const { refreshOrders } = useOrdersContext()
  const user = useCurrentUser()
  const role = useCurrentRole()
  const [collectAddress, setCollectAddress] = useState<boolean>(true)

  useEffect(() => {
    const getClientAccount = async () => {
      const params =
        role === 'client'
          ? {
              account_id: user?.user_id,
            }
          : {
              supervisor_id: user?.user_id,
            }
      const branch: APIResponse = await filterRecords(params, 'branch')
      console.log('branch:', branch)
      if (branch.results) setBranch(branch.results[0])
    }

    getClientAccount()
  }, [])

  const formik = useFormik({
    initialValues: {
      external_id: '',
      delivery_lat: 21.3879,
      delivery_lng: 39.8579,
      customer_name: '',
      customer_phone_number: '',
      payment_type: 'cash',
      order_items: [] as OrderItem[],
    },
    validationSchema: Yup.object({
      external_id: Yup.string().required('External ID is required'),
      delivery_lat: Yup.number().required(
        'Delivery Address Latitude is required'
      ),
      delivery_lng: Yup.number().required(
        'Delivery Address Longitude is required'
      ),
      customer_name: Yup.string().required('Customer is required'),
      customer_phone_number: Yup.string().required(
        'Customer Phone Number is required'
      ),
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
      setLoading(true)
      const delivery_address = await createRecord(
        {
          latitude: values.delivery_lat,
          longitude: values.delivery_lng,
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

      await createRecord(
        {
          external_id: values.external_id,
          delivery_address,
          pickup_address: branch.address.id,
          customer: {
            name: values.customer_name,
            number: values.customer_phone_number,
          },
          client: branch.id,
          payment_type: values.payment_type,
          order_items: values.order_items,
        },
        'order'
      )
        .then(async (res) => {
          if (res) {
            toast.success('Order added successfully')
            refreshOrders({})
          }
        })
        .catch((err) => {
          console.log('Error adding order', err)
          if (err.response.data.customer) {
            toast.error(
              'Error adding order: ' + err.response.data.customer.name[0] + '!'
            )
          } else toast.error('Error adding order!')
        })
        .finally(() => {
          setLoading(false)
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
        width='800px'
        open={visible}
        onClose={closeHandler}
        className='rounded-md'
      >
        {/* Form */}
        {loading ? (
          <Loading size='xl' className='my-3'  />
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
                        : 'ID'
                    }
                    clearable
                    fullWidth
                    size='lg'
                    placeholder='ID'
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

                <div className='flex'>
                  <span className='mr-2 font-bold text-gray-900'>
                    Collect delivery address from customer
                  </span>
                  <label className='inline-flex relative items-center mr-5 cursor-pointer'>
                    <input
                      type='checkbox'
                      className='sr-only peer'
                      checked={collectAddress}
                      readOnly
                    />
                    <div
                      onClick={() => setCollectAddress(!collectAddress)}
                      className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-primary-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"
                    />
                  </label>
                </div>

                <div
                  className={`relative flex flex-col items-start justify-start w-full ${
                    collectAddress && 'p-3'
                  }`}
                >
                  <div className='relative w-full h-96'>
                    <BranchMap
                      position={
                        !collectAddress
                          ? {
                              lat: formik.values.delivery_lat,
                              lng: formik.values.delivery_lng,
                            }
                          : {
                              lat: 21.3891,
                              lng: 39.8579,
                            }
                      }
                      setPosition={
                        !collectAddress
                          ? (position: any) => {
                              formik.setFieldValue('delivery_lat', position.lat)
                              formik.setFieldValue('delivery_lng', position.lng)
                            }
                          : () => {}
                      }
                    />
                  </div>
                  {collectAddress && (
                    <div className='z-10 absolute bg-black/20 inset-0 rounded-lg' />
                  )}
                  <Flex
                    css={{
                      gap: '$10',
                      flexWrap: 'nowrap',
                    }}
                    className='w-full'
                  >
                    <Input
                      label={
                        formik.touched.delivery_lat &&
                        formik.errors.delivery_lat
                          ? formik.errors.delivery_lat
                          : ''
                      }
                      clearable
                      fullWidth
                      size='lg'
                      placeholder='Latitude'
                      name='delivery_lat'
                      id='delivery_lat'
                      value={formik.values.delivery_lat}
                      onChange={formik.handleChange}
                      status={
                        formik.touched.delivery_lat &&
                        formik.errors.delivery_lat
                          ? 'error'
                          : 'default'
                      }
                    />

                    <Input
                      label={
                        formik.touched.delivery_lng &&
                        formik.errors.delivery_lng
                          ? formik.errors.delivery_lng
                          : ''
                      }
                      clearable
                      fullWidth
                      size='lg'
                      placeholder='Longitude'
                      name='delivery_lng'
                      id='delivery_lng'
                      value={formik.values.delivery_lng}
                      onChange={formik.handleChange}
                      status={
                        formik.touched.delivery_lng &&
                        formik.errors.delivery_lng
                          ? 'error'
                          : 'default'
                      }
                    />
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
                  <Radio.Group
                    defaultValue='cash'
                    orientation='horizontal'
                    
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
                      width: '100%',
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
              <Button
                auto
                type='submit'
                className='bg-primary text-black'
                disabled={Object.keys(formik.errors).length > 0 || loading}
              >
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
