import {
  Button,
  Input,
  Modal,
  Text,
  Loading,
  Tooltip,
  Radio,
  Checkbox,
} from '@nextui-org/react'
import React, { useState } from 'react'
import { Flex } from '../../../styles/flex'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { AddIcon } from '../../../../components/icons/areas'
import { useClientsBranchesContext } from '../../../../context/admin/clients/branches'
import { useAreasCitiesContext } from '../../../../context/admin/areas/cities'
import { useAreasGovernoratesContext } from '../../../../context/admin/areas/governorates'
import { useAreasCountriesContext } from '../../../../context/admin/areas/countries'
import { Account, City, Country, Governorate } from '../../../../interfaces'
import { useClientsAccountsContext } from '../../../../context/admin/clients/accounts'
import { createRecord } from '../../../../lib/api'
import toast from 'react-hot-toast'

export const AddBranch = () => {
  const { refreshBranches } = useClientsBranchesContext()
  const { accounts, refreshAccounts } = useClientsAccountsContext()
  const { cities } = useAreasCitiesContext()
  const { governorates } = useAreasGovernoratesContext()
  const { countries } = useAreasCountriesContext()
  const [visible, setVisible] = React.useState(false)
  const handler = () => setVisible(true)
  const [loading, setLoading] = React.useState<boolean>(false)
  const [showMain, setShowMain] = useState<boolean>(true)

  const formik = useFormik({
    initialValues: {
      country: '',
      governorate: '',
      city: '',
      order_fees: 0,
      driver_fees: 0,
      phone_number: '',
      supervisor_name: '',
      supervisor_password: '',
      account: '',
      main: false,
    },
    validationSchema: Yup.object({
      country: Yup.string().required('price unit is required'),
      governorate: Yup.string().required('governorate is required'),
      city: Yup.string().required('city is required'),
      order_fees: Yup.number().required('order fee is required'),
      driver_fees: Yup.number().required('driver fee is required'),
      phone_number: Yup.string().required('phone number is required'),
      // supervisor name may contain only letters, numbers, and @/./+/-/_ characters.
      supervisor_name: Yup.string()
        .required('supervisor name is required')
        .matches(
          /^[a-zA-Z0-9@/./+/-/_]+$/,
          'supervisor name must contain only letters, numbers, and @/./+/-/_ characters'
        ),
      supervisor_password: Yup.string().required(
        'supervisor password is required'
      ),
      account: Yup.string().required('client account is required'),
      main: Yup.boolean().default(false),
    }),
    onSubmit: async (values) => {
      // create address first, the use the id to create the branch
      await createRecord(
        {
          country: values.country,
          governorate: values.governorate,
          city: values.city,
          latitude: 24.7136,
          longitude: 46.6753,
        },
        'address'
      )
        .then(async (res) => {
          if (res) {
            await createRecord(
              {
                address: res.id,
                order_fees: values.order_fees,
                driver_fees: values.driver_fees,
                phone_number: values.phone_number,
                supervisor: {
                  username: values.supervisor_name,
                  password: values.supervisor_password,
                },
                account: values.account,
                main: values.main,
              },
              'branch'
            )
              .then((res) => {
                if (res) {
                  toast.success('Branch added successfully!')
                  refreshBranches()
                  refreshAccounts()
                  setVisible(false)
                }
              })
              .catch((err) => {
                console.log('Error adding branch!: ', err)
                toast.error('Error adding branch!')
              })
          }
        })
        .catch((err) => {
          console.log('Error adding branch!: ', err)
          toast.error('Error adding branch!')
        })
    },
  })

  const closeHandler = () => setVisible(false)

  const countriesGovsCities = (label: string) =>
    label === 'country'
      ? countries
      : label === 'governorate'
      ? governorates
      : cities

  return (
    <div>
      <Tooltip content='Add Branch'>
        <Button auto onClick={handler} className='my-5 h-fit'>
          <AddIcon />
        </Button>
      </Tooltip>
      <Modal
        closeButton
        aria-labelledby='modal-title'
        width='650px'
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
                Add Branch
              </Text>
            </Modal.Header>
            {/* <Divider css={{ my: '$5' }} /> */}
            <Modal.Body css={{ py: '$10' }}>
              <Flex
                css={{
                  gap: '$8',
                  flexWrap: 'wrap',
                  '@lg': { flexWrap: 'nowrap', gap: '$10' },
                }}
              >
                {['country', 'governorate', 'city'].map((field) => (
                  <div className='w-1/3' key={field}>
                    <label
                      className={`block mb-2 ${
                        // @ts-ignore
                        formik.touched[field] && formik.errors[field]
                          ? 'text-red-500'
                          : 'text-gray-900'
                      }`}
                    >
                      {
                        // @ts-ignore
                        formik.touched[field] && formik.errors[field]
                          ? // @ts-ignore
                            formik.errors[field]
                          : field.replace(/^\w/, (c) => c.toUpperCase())
                      }
                    </label>
                    <select
                      id={field}
                      name={field}
                      onChange={formik.handleChange}
                      // @ts-ignore
                      value={formik.values[field]}
                      className={`border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 ${
                        // @ts-ignore
                        formik.touched[field] && formik.errors[field]
                          ? 'border-red-500 bg-red-200'
                          : 'border-gray-300 bg-gray-100'
                      }`}
                    >
                      <option value=''>
                        Select {field.replace(/^\w/, (c) => c.toUpperCase())}
                      </option>
                      {countriesGovsCities(field).map(
                        (item: City | Country | Governorate) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                ))}
              </Flex>

              <Flex
                css={{
                  gap: '$8',
                  flexWrap: 'wrap',
                  '@lg': { flexWrap: 'nowrap', gap: '$10' },
                }}
              >
                <Input
                  label={
                    formik.touched.order_fees && formik.errors.order_fees
                      ? formik.errors.order_fees
                      : 'Order Fee'
                  }
                  clearable
                  fullWidth
                  size='lg'
                  placeholder='e.g: 10'
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
                      : 'Driver Fee'
                  }
                  clearable
                  fullWidth
                  size='lg'
                  placeholder='e.g: 10'
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

              <Flex
                css={{
                  gap: '$8',
                  flexWrap: 'wrap',
                  '@lg': { flexWrap: 'nowrap', gap: '$10' },
                }}
              >
                <Input
                  label={
                    formik.touched.phone_number && formik.errors.phone_number
                      ? formik.errors.phone_number
                      : 'Phone'
                  }
                  clearable
                  fullWidth
                  size='lg'
                  placeholder='e.g: 966555555555'
                  name='phone_number'
                  id='phone_number'
                  value={formik.values.phone_number}
                  onChange={formik.handleChange}
                  status={
                    formik.touched.phone_number && formik.errors.phone_number
                      ? 'error'
                      : 'default'
                  }
                />
              </Flex>

              <Flex
                css={{
                  gap: '$8',
                  flexWrap: 'wrap',
                  '@lg': { flexWrap: 'nowrap', gap: '$10' },
                }}
              >
                <div className='w-full'>
                  <label
                    className={`block mb-2 ${
                      formik.touched.supervisor_name &&
                      formik.errors.supervisor_name &&
                      formik.touched.supervisor_password &&
                      formik.errors.supervisor_password
                        ? 'text-red-500'
                        : 'text-gray-900'
                    }`}
                  >
                    Supervisor
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
                      name='supervisor_name'
                      id='supervisor_name'
                      value={formik.values.supervisor_name}
                      onChange={formik.handleChange}
                      status={
                        formik.touched.supervisor_name &&
                        formik.errors.supervisor_name
                          ? 'error'
                          : 'default'
                      }
                    />

                    <Input
                      clearable
                      fullWidth
                      size='lg'
                      placeholder='Password'
                      name='supervisor_password'
                      id='supervisor_password'
                      value={formik.values.supervisor_password}
                      onChange={formik.handleChange}
                      status={
                        formik.touched.supervisor_password &&
                        formik.errors.supervisor_password
                          ? 'error'
                          : 'default'
                      }
                    />
                  </Flex>
                </div>
              </Flex>

              <Flex
                css={{
                  gap: '$8',
                  flexWrap: 'wrap',
                  '@lg': { flexWrap: 'nowrap', gap: '$10' },
                }}
              >
                <div className='w-full'>
                  <label
                    className={`block mb-2 ${
                      formik.touched.account && formik.errors.account
                        ? 'text-red-500'
                        : 'text-gray-900'
                    }`}
                  >
                    {formik.touched.account && formik.errors.account
                      ? formik.errors.account
                      : 'Client Account'}
                  </label>
                  <select
                    id='account'
                    name='account'
                    onChange={(e) => {
                      formik.handleChange(e)

                      if (e.target.value) {
                        const index =
                          accounts
                            .find((account) => account.id == e.target.value)
                            ?.branches.findIndex((branch) => branch.main) ?? -1
                        if (index > -1) {
                          formik.setFieldValue('main', false)
                          setShowMain(false)
                        } else {
                          setShowMain(true)
                        }
                      }
                    }}
                    value={formik.values.account}
                    className={`border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 ${
                      formik.touched.account && formik.errors.account
                        ? 'border-red-500 bg-red-200'
                        : 'border-gray-300 bg-gray-100'
                    }`}
                  >
                    <option value=''>Select Client Account</option>
                    {accounts.map((item: Account) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              </Flex>
              {showMain && (
                <div className='w-full mt-2'>
                  <Checkbox
                    aria-label='Main Branch'
                    color='warning'
                    defaultSelected={false}
                    onChange={(e) => {
                      formik.setFieldValue('main', e)
                    }}
                  >
                    <p className='text-sm'>Main Branch</p>
                  </Checkbox>
                </div>
              )}
            </Modal.Body>

            <Modal.Footer>
              <Button auto type='submit' className='bg-primary text-black'>
                Add Branch
              </Button>
            </Modal.Footer>
          </form>
        )}
      </Modal>
    </div>
  )
}
