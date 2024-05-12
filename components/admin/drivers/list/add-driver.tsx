import { Button, Input, Modal, Text, Loading } from '@nextui-org/react'
import React from 'react'
import { Flex } from '../../../styles/flex'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { createRecord } from '../../../../lib/api'
import { City, DriverType, Team } from '../../../../interfaces'
import { useDriversContext } from '../../../../context/admin/drivers'
import { useTeamsContext } from '../../../../context/admin/drivers/teams'
import { useAreasCitiesContext } from '../../../../context/admin/areas/cities'
import toast from 'react-hot-toast'

export const AddDriver = () => {
  const [visible, setVisible] = React.useState(false)
  const handler = () => setVisible(true)
  const [error, setError] = React.useState<string>('')
  const [loading, setLoading] = React.useState<boolean>(false)
  const { handleSelectTeam, driverTypes, refreshDrivers } = useDriversContext()
  const { teams } = useTeamsContext()
  const { cities } = useAreasCitiesContext()

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      code: '',
      phone_number: '',
      vehicle_license: '',
      residency_id: '',
      team: '',
      city: '',
      driver_type: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      password: Yup.string().required('Password is required'),
      code: Yup.string().required('Code is required'),
      phone_number: Yup.string().required('Phone number is required'),
      vehicle_license: Yup.string().required('Vehicle license is required'),
      residency_id: Yup.string().required('Residency ID is required'),
      team: Yup.string(),
      city: Yup.string().required('City is required'),
      driver_type: Yup.string().required('Driver type is required'),
    }),
    onSubmit: async (values) => {
      // use createRecord function to create a new record
      // setLoading(true)
      console.log({
        user: {
          username: values.username,
          password: values.password,
        },
        code: values.code,
        phone_number: values.phone_number,
        vehicle_license: values.vehicle_license,
        residency_id: values.residency_id,
        team: values.team,
        city: values.city,
        driver_type: values.driver_type,
        image: 'image',
      })
      await createRecord(
        {
          user: {
            username: values.username,
            password: values.password,
          },
          code: values.code,
          phone_number: values.phone_number,
          vehicle_license: values.vehicle_license,
          residency_id: values.residency_id,
          team: values.team,
          city: values.city,
          driver_type: values.driver_type,
          image: 'image',
        },
        'driver'
      )
        .then(async (res) => {
          if (res) {
            toast.success('Driver added successfully')
            refreshDrivers()
            setVisible(false)
          }
        })
        .catch((err) => {
          console.log('Error adding driver!: ', err)
          if (err.response.data.user.username) {
            setError(err.response.data.user.username[0])
          }
          toast.error('Error adding driver!')
        })
    },
  })

  const closeHandler = () => setVisible(false)

  return (
    <div>
      <Button
        auto
        onClick={handler}
        className='bg-primary text-black rounded-md'
      >
        Add Driver
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
                Add driver
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
                    '@xl': { flexWrap: 'nowrap' },
                  }}
                >
                  <Input
                    label={
                      formik.touched.username && formik.errors.username
                        ? formik.errors.username
                        : 'Username'
                    }
                    clearable
                    fullWidth
                    size='lg'
                    placeholder='Username'
                    name='username'
                    id='username'
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    status={
                      formik.touched.username && formik.errors.username
                        ? 'error'
                        : 'default'
                    }
                  />

                  <Input
                    label={
                      formik.touched.password && formik.errors.password
                        ? formik.errors.password
                        : 'Password'
                    }
                    clearable
                    fullWidth
                    size='lg'
                    placeholder='Password'
                    name='password'
                    id='password'
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    status={
                      formik.touched.password && formik.errors.password
                        ? 'error'
                        : 'default'
                    }
                  />
                </Flex>

                <Flex
                  css={{
                    gap: '$10',
                    flexWrap: 'wrap',
                    '@xl': { flexWrap: 'nowrap' },
                  }}
                >
                  <Input
                    label={
                      formik.touched.code && formik.errors.code
                        ? formik.errors.code
                        : 'Code'
                    }
                    clearable
                    fullWidth
                    size='lg'
                    placeholder='Code'
                    name='code'
                    id='code'
                    value={formik.values.code}
                    onChange={formik.handleChange}
                    status={
                      formik.touched.code && formik.errors.code
                        ? 'error'
                        : 'default'
                    }
                  />
                  <Input
                    label={
                      formik.touched.phone_number && formik.errors.phone_number
                        ? formik.errors.phone_number
                        : 'Phone'
                    }
                    clearable
                    fullWidth
                    size='lg'
                    placeholder='Phone'
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
                    gap: '$10',
                    flexWrap: 'wrap',
                    '@xl': { flexWrap: 'nowrap' },
                  }}
                >
                  <Input
                    label={
                      formik.touched.vehicle_license &&
                      formik.errors.vehicle_license
                        ? formik.errors.vehicle_license
                        : 'Vehicle License'
                    }
                    clearable
                    fullWidth
                    size='lg'
                    placeholder='Vehicle License'
                    name='vehicle_license'
                    id='vehicle_license'
                    value={formik.values.vehicle_license}
                    onChange={formik.handleChange}
                    status={
                      formik.touched.vehicle_license &&
                      formik.errors.vehicle_license
                        ? 'error'
                        : 'default'
                    }
                  />
                  <Input
                    label={
                      formik.touched.residency_id && formik.errors.residency_id
                        ? formik.errors.residency_id
                        : 'Residency ID'
                    }
                    clearable
                    fullWidth
                    size='lg'
                    placeholder='Residency ID'
                    name='residency_id'
                    id='residency_id'
                    value={formik.values.residency_id}
                    onChange={formik.handleChange}
                    status={
                      formik.touched.residency_id && formik.errors.residency_id
                        ? 'error'
                        : 'default'
                    }
                  />
                </Flex>

                <Flex
                  css={{
                    gap: '$10',
                    flexWrap: 'wrap',
                    '@xl': { flexWrap: 'nowrap' },
                  }}
                >
                  <div className='w-1/3'>
                    <label
                      className={`block mb-2 ${
                        formik.touched.team && formik.errors.team
                          ? 'text-red-500'
                          : 'text-gray-900'
                      }`}
                    >
                      {formik.touched.team && formik.errors.team
                        ? formik.errors.team
                        : 'Team'}
                    </label>
                    <select
                      id='team'
                      name='team'
                      onChange={formik.handleChange}
                      value={formik.values.team}
                      className={`border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 ${
                        formik.touched.team && formik.errors.team
                          ? 'border-red-500 bg-red-200'
                          : 'border-gray-300 bg-gray-100'
                      }`}
                    >
                      <option value=''>Select Team</option>
                      {teams?.map((team: Team) => (
                        <option
                          key={team.id}
                          value={team.id}
                          className='capitalize h-20'
                        >
                          {team.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className='w-1/3'>
                    <label
                      className={`block mb-2 ${
                        formik.touched.city && formik.errors.city
                          ? 'text-red-500'
                          : 'text-gray-900'
                      }`}
                    >
                      {formik.touched.city && formik.errors.city
                        ? formik.errors.city
                        : 'City'}
                    </label>
                    <select
                      id='city'
                      name='city'
                      onChange={formik.handleChange}
                      value={formik.values.city}
                      className={`border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 ${
                        formik.touched.city && formik.errors.city
                          ? 'border-red-500 bg-red-200'
                          : 'border-gray-300 bg-gray-100'
                      }`}
                    >
                      <option value=''>Select City</option>
                      {cities?.map((city: City) => (
                        <option
                          key={city.id}
                          value={city.id}
                          className='capitalize h-20'
                        >
                          {city.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className='w-1/3'>
                    <label
                      className={`block mb-2 ${
                        formik.touched.driver_type && formik.errors.driver_type
                          ? 'text-red-500'
                          : 'text-gray-900'
                      }`}
                    >
                      {formik.touched.driver_type && formik.errors.driver_type
                        ? formik.errors.driver_type
                        : 'Driver Type'}
                    </label>
                    <select
                      id='driver_type'
                      name='driver_type'
                      onChange={formik.handleChange}
                      value={formik.values.driver_type}
                      className={`border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 ${
                        formik.touched.driver_type && formik.errors.driver_type
                          ? 'border-red-500 bg-red-200'
                          : 'border-gray-300 bg-gray-100'
                      }`}
                    >
                      <option value=''>Select Driver Type</option>
                      {driverTypes?.map((driverType: DriverType) => (
                        <option key={driverType.id} value={driverType.id}>
                          {driverType.vehicle_type}
                        </option>
                      ))}
                    </select>
                  </div>
                </Flex>

                <div className='flex flex-col items-start justify-center w-full'>
                  <p className='text-gray-900 mb-2 '>Image</p>
                  <label className='flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-100 hover:bg-gray-50'>
                    <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                      <svg
                        className='w-8 h-8 mb-4 text-gray-500'
                        aria-hidden='true'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 20 16'
                      >
                        <path
                          stroke='currentColor'
                          stroke-linecap='round'
                          stroke-linejoin='round'
                          stroke-width='2'
                          d='M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2'
                        />
                      </svg>
                      <p className='mb-2 text-sm text-gray-500'>
                        <span className='font-semibold'>Click to upload</span>{' '}
                        or drag and drop
                      </p>
                      <p className='text-xs text-gray-500'>
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </div>
                    <input id='image' type='file' className='hidden' />
                  </label>
                </div>
              </Flex>
            </Modal.Body>

            <Modal.Footer>
              <Button auto type='submit' className='bg-primary text-black'>
                Add Driver
              </Button>
            </Modal.Footer>
          </form>
        )}
      </Modal>
    </div>
  )
}
