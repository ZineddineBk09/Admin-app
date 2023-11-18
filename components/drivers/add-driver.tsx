import {
  Button,
  Divider,
  Input,
  Modal,
  Text,
  Textarea,
  Tooltip,
  Loading,
} from '@nextui-org/react'
import { IconButton } from '../table/table.styled'
import React from 'react'
import { Flex } from '../styles/flex'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { EditIcon } from '../icons/table'
import { Driver } from '@/interfaces'

export const AddDriver = () => {
  const [visible, setVisible] = React.useState(false)
  const handler = () => setVisible(true)
  const [error, setError] = React.useState<string>('')
  const [loading, setLoading] = React.useState<boolean>(false)

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      team: '',
      inProgressTasks: 0,
      completedTasks: 0,
      status: '',
      orders: 0,
      phone: '',
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required('fullname is required'),
      email: Yup.string().required('email is required'),
      phone: Yup.string().required('phone is required'),
      team: Yup.string().required('team is required'),
      inProgressTasks: Yup.number().required('inProgressTasks is required'),
      completedTasks: Yup.number().required('completedTasks is required'),
      status: Yup.string().required('status is required'),
      orders: Yup.number().required('orders is required'),
    }),
    onSubmit: (values) => {
      setLoading(true)
    },
  })

  const closeHandler = () => {
    setVisible(false)
    console.log('closed')
  }

  return (
    <div>
      <Button auto onClick={handler} className='bg-primary text-black rounded-md'>
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
          <Loading size='xl' className='my-3' />
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <Modal.Header css={{ justifyContent: 'start' }}>
              <Text
                id='modal-title'
                className='text-xl font-semibold uppercase'
                h4
              >
                Add driver
              </Text>
            </Modal.Header>
            <Divider css={{ my: '$5' }} />
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
                    '@lg': { flexWrap: 'nowrap' },
                  }}
                >
                  <Input
                    label={
                      formik.touched.fullName && formik.errors.fullName
                        ? formik.errors.fullName
                        : 'Name'
                    }
                    bordered
                    clearable
                    fullWidth
                    size='lg'
                    placeholder='Name'
                    name='name'
                    id='name'
                    value={formik.values.fullName}
                    onChange={formik.handleChange}
                    status={
                      formik.touched.fullName && formik.errors.fullName
                        ? 'error'
                        : 'default'
                    }
                  />
                  <div className='h-fit w-full flex flex-col items-start'>
                    <label className='mb-1'>
                      {formik.touched.status && formik.errors.status ? (
                        <p className='text-red-500'>{formik.errors.status}</p>
                      ) : (
                        'Status'
                      )}
                    </label>
                    <select
                      className='w-full h-12 rounded-2xl px-3 py-1 border-2 border-gray-300 bg-white dark:bg-transparent dark:border-[#393A3C] transition-all duration-200 hover:border-black dark:hover:border-white'
                      name='status'
                      id='status'
                      value={formik.values.status}
                      onChange={formik.handleChange}
                    >
                      <option value='' className='text-gray-300'>
                        Select Status
                      </option>
                      <option value='Available'>Available</option>
                      <option value='Busy'>Busy</option>
                      <option value='Offline'>Offline</option>
                    </select>
                  </div>
                </Flex>

                <Flex
                  css={{
                    gap: '$10',
                    flexWrap: 'wrap',
                    '@lg': { flexWrap: 'nowrap' },
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
                    '@lg': { flexWrap: 'nowrap' },
                  }}
                >
                  <Input
                    label={
                      formik.touched.team && formik.errors.team
                        ? formik.errors.team
                        : 'Team'
                    }
                    bordered
                    clearable
                    fullWidth
                    size='lg'
                    placeholder='Team'
                    name='team'
                    id='team'
                    value={formik.values.team}
                    onChange={formik.handleChange}
                    status={
                      formik.touched.team && formik.errors.team
                        ? 'error'
                        : 'default'
                    }
                  />
                  <Input
                    label={
                      formik.touched.inProgressTasks &&
                      formik.errors.inProgressTasks
                        ? formik.errors.inProgressTasks
                        : 'Tasks In Progress'
                    }
                    bordered
                    clearable
                    fullWidth
                    size='lg'
                    placeholder='InProgressTasks'
                    name='inProgressTasks'
                    id='inProgressTasks'
                    value={formik.values.inProgressTasks}
                    onChange={formik.handleChange}
                    status={
                      formik.touched.inProgressTasks &&
                      formik.errors.inProgressTasks
                        ? 'error'
                        : 'default'
                    }
                  />
                </Flex>

                <Flex
                  css={{
                    gap: '$10',
                    flexWrap: 'wrap',
                    '@lg': { flexWrap: 'nowrap' },
                  }}
                >
                  <Input
                    label={
                      formik.touched.completedTasks &&
                      formik.errors.completedTasks
                        ? formik.errors.completedTasks
                        : 'Completed Tasks'
                    }
                    bordered
                    clearable
                    fullWidth
                    size='lg'
                    placeholder='CompletedTasks'
                    name='completedTasks'
                    id='completedTasks'
                    value={formik.values.completedTasks}
                    onChange={formik.handleChange}
                    status={
                      formik.touched.completedTasks &&
                      formik.errors.completedTasks
                        ? 'error'
                        : 'default'
                    }
                  />
                  <Input
                    label={
                      formik.touched.orders && formik.errors.orders
                        ? formik.errors.orders
                        : 'Orders'
                    }
                    bordered
                    clearable
                    fullWidth
                    size='lg'
                    placeholder='Orders'
                    name='orders'
                    id='orders'
                    value={formik.values.orders}
                    onChange={formik.handleChange}
                    status={
                      formik.touched.orders && formik.errors.orders
                        ? 'error'
                        : 'default'
                    }
                  />
                </Flex>
              </Flex>
            </Modal.Body>
            <Divider css={{ my: '$5' }} />
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
