import { Button, Input, Modal, Text, Loading, Radio } from '@nextui-org/react'
import React from 'react'
import { Flex } from '../../styles/flex'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { createRecord, getRecords } from '../../../lib/api'
import { Team } from '../../../interfaces'
import { useDriversContext } from '../../../context/drivers'

export const AddDriver = () => {
  const [visible, setVisible] = React.useState(false)
  const handler = () => setVisible(true)
  const [error, setError] = React.useState<string>('')
  const [loading, setLoading] = React.useState<boolean>(false)
  const [teams, setTeams] = React.useState<Team[]>([])
  const { handleSelectTeam } = useDriversContext()

  const formik = useFormik({
    initialValues: {
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      team: '',
      password: '',
      isFreelance: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('username is required'),
      firstName: Yup.string().required('firstname is required'),
      lastName: Yup.string().required('lastname is required'),
      email: Yup.string().required('email is required'),
      phone: Yup.string().required('phone is required'),
      team: Yup.string().required('team is required'),
      password: Yup.string().required('password is required'),
      // isFreelance have 2 potential values: Yes or No
      isFreelance: Yup.string().required('isFreelance is required'),
    }),
    onSubmit: async (values) => {
      // use createRecord function to create a new record
      setLoading(true)
      const response = await createRecord(
        {
          username: values.username,
          first_name: values.firstName,
          last_name: values.lastName,
          email: values.email,
          phone_number: values.phone,
          team_id: values.team,
          password: values.password,
          is_freelance: values.isFreelance === 'Yes' ? true : false,
          vehicle_type: 'car',
          vehicle_license: '12345678',
          city: 'Cairo',
          areas: [1, 2, 3],
          code: '123456',
          driver_type: 'driver',
          residency_id: 1,
          is_idle: false,
        },
        'driver'
      )

      if (response.status) {
        setVisible(false)
        setLoading(false)
        handleSelectTeam('')
      } else {
        setError('Something went wrong')
        setLoading(false)
      }
    },
  })

  const closeHandler = () => {
    setVisible(false)
  }

  React.useEffect(() => {
    const fetchTeams = async () => {
      await getRecords('team')
        .then((res: { teams: Team[] }) => setTeams(res.teams))
        .catch((err: any) => {
          setTeams([])
          console.log('Error in fetching teams: ', err)
        })
    }
    fetchTeams()
  }, [])

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
                      formik.touched.firstName && formik.errors.firstName
                        ? formik.errors.firstName
                        : 'First Name'
                    }
                    bordered
                    clearable
                    fullWidth
                    size='lg'
                    placeholder='First Name'
                    name='firstName'
                    id='firstName'
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    status={
                      formik.touched.firstName && formik.errors.firstName
                        ? 'error'
                        : 'default'
                    }
                  />
                  <Input
                    label={
                      formik.touched.lastName && formik.errors.lastName
                        ? formik.errors.lastName
                        : 'Last Name'
                    }
                    bordered
                    clearable
                    fullWidth
                    size='lg'
                    placeholder='First Name'
                    name='lastName'
                    id='lastName'
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    status={
                      formik.touched.lastName && formik.errors.lastName
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
                      formik.touched.email && formik.errors.email
                        ? formik.errors.email
                        : 'Email'
                    }
                    bordered
                    clearable
                    fullWidth
                    size='lg'
                    placeholder='Email'
                    name='email'
                    id='email'
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    status={
                      formik.touched.email && formik.errors.email
                        ? 'error'
                        : 'default'
                    }
                  />
                  <Input
                    label={
                      formik.touched.phone && formik.errors.phone
                        ? formik.errors.phone
                        : 'Phone'
                    }
                    bordered
                    clearable
                    fullWidth
                    size='lg'
                    placeholder='Phone'
                    name='phone'
                    id='phone'
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    status={
                      formik.touched.phone && formik.errors.phone
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
                  <div className='h-12 w-full bg-white rounded-2xl px-2 border-2 border-gray-300'>
                    <select
                      name='team'
                      id='team'
                      value={formik.values.team}
                      className='w-full h-full bg-transparent'
                      onChange={formik.handleChange}
                    >
                      <option value=''>Select Team</option>
                      {teams?.map((team: Team, index: number) => (
                        <option key={index} value={team.id}>
                          {team.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className='h-10 w-full bg-white rounded-full px-2'>
                    <Radio.Group
                      label={
                        formik.touched.isFreelance &&
                        formik.errors.isFreelance ? (
                          <p
                            className='text-md font-[400] text-red-500'
                            style={{ marginTop: '-1rem' }}
                          >
                            {formik.errors.isFreelance}
                          </p>
                        ) : (
                          <p className='text-md font-[400] text-black'>
                            Is Freelancer
                          </p>
                        )
                      }
                      name='isFreelance'
                      id='isFreelance'
                      color='warning'
                      value={formik.values.isFreelance}
                      onChange={(e) => formik.setFieldValue('isFreelance', e)}
                      orientation='horizontal'
                    >
                      <Radio value={'Yes'} isSquared size='sm'>
                        Yes
                      </Radio>
                      <Radio value={'No'} isSquared size='sm'>
                        No
                      </Radio>
                    </Radio.Group>
                  </div>
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
                      formik.touched.username && formik.errors.username
                        ? formik.errors.username
                        : 'Username'
                    }
                    bordered
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
                    bordered
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
              </Flex>
            </Modal.Body>
            {/* <Divider css={{ my: '$5' }} /> */}
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
