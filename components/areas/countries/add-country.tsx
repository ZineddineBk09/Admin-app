import { Button, Input, Modal, Text, Loading, Tooltip } from '@nextui-org/react'
import React from 'react'
import { Flex } from '../../styles/flex'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { AddIcon } from '../../../components/icons/areas'
import { createRecord } from '../../../lib/api'
import toast from 'react-hot-toast'
import { useAreasCountriesContext } from '../../../context/areas/countries'
import { Currency } from '../../../interfaces'

export const AddCountry = () => {
  const [visible, setVisible] = React.useState(false)
  const handler = () => setVisible(true)
  const [loading, setLoading] = React.useState<boolean>(false)
  const { currencies, refreshCountries } = useAreasCountriesContext()

  const formik = useFormik({
    initialValues: {
      name: '',
      price_unit: '',
      order_fees: 0,
      driver_fees: 0,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('name is required'),
      price_unit: Yup.string().required('price unit is required'),
      order_fees: Yup.number().required('order fee is required'),
      driver_fees: Yup.number().required('driver fee is required'),
    }),
    onSubmit: async (values) => {
      const price_unit = currencies?.find(
        (currency: Currency) => currency.id === values.price_unit
      )
      if (!price_unit) {
        toast.error('Price unit not found!')
        return
      }
      console.log({
        ...values,
        price_unit: price_unit?.id,
      })
      await createRecord(
        {
          ...values,
          price_unit: price_unit,
        },
        'country'
      )
        .then((res) => {
          if (res) {
            setVisible(false)
            toast.success('Country added successfully')
            refreshCountries()
          }
        })
        .catch((err) => {
          console.log('Error adding country!: ', err)
          toast.error('Error adding country!')
        })
    },
  })

  const closeHandler = () => {
    setVisible(false)
  }

  return (
    <div>
      <Tooltip content='Add Country'>
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
                Add Country
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
                <div>
                  <label
                    className={`block mb-2 ${
                      formik.touched.price_unit && formik.errors.price_unit
                        ? 'text-red-500'
                        : 'text-gray-900'
                    }`}
                  >
                    {formik.touched.price_unit && formik.errors.price_unit
                      ? formik.errors.price_unit
                      : 'Price Unit'}
                  </label>
                  <select
                    id='price_unit'
                    name='price_unit'
                    onChange={formik.handleChange}
                    value={formik.values.price_unit}
                    className={`border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 ${
                      formik.touched.price_unit && formik.errors.price_unit
                        ? 'border-red-500 bg-red-200'
                        : 'border-gray-300 bg-gray-100'
                    }`}
                  >
                    <option value=''>Select Price Unit</option>
                    {currencies?.map((currency: Currency) => (
                      <option key={currency.id} value={currency.id}>
                        {currency.symbol} - {currency.name}
                      </option>
                    ))}
                  </select>
                </div>

                <Input
                  label={
                    formik.touched.order_fees && formik.errors.order_fees
                      ? formik.errors.order_fees
                      : 'Order Fees'
                  }
                  clearable
                  fullWidth
                  size='lg'
                  placeholder='Stars'
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

                <Input
                  label={
                    formik.touched.driver_fees && formik.errors.driver_fees
                      ? formik.errors.driver_fees
                      : 'Driver Fees'
                  }
                  clearable
                  fullWidth
                  size='lg'
                  placeholder='Stars'
                  name='driver_fees'
                  id='driver_fees'
                  value={formik.values.driver_fees}
                  onChange={formik.handleChange}
                  status={
                    formik.touched.driver_fees && formik.errors.driver_fees
                      ? 'error'
                      : 'default'
                  }
                />
              </Flex>
            </Modal.Body>

            <Modal.Footer>
              <Button auto type='submit' className='bg-primary text-black'>
                Add Country
              </Button>
            </Modal.Footer>
          </form>
        )}
      </Modal>
    </div>
  )
}
