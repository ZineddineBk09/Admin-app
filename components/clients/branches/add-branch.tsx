import {
  Button,
  Divider,
  Input,
  Modal,
  Text,
  Loading,
  Tooltip,
} from '@nextui-org/react'
import React from 'react'
import { Flex } from '../../styles/flex'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { AddIcon } from '@/components/icons/areas'

export const AddBranch = () => {
  const [visible, setVisible] = React.useState(false)
  const handler = () => setVisible(true)
  const [loading, setLoading] = React.useState<boolean>(false)

  const formik = useFormik({
    initialValues: {
      name: '',
      country: '',
      governorate: '',
      city: '',
      orderFee: 0,
      driverFee: 0,
      phone: '',
      supervisor: '',
      clientAccount: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('name is required'),
      country: Yup.string().required('price unit is required'),
      governorate: Yup.string().required('governorate is required'),
      city: Yup.string().required('city is required'),
      orderFee: Yup.number().required('order fee is required'),
      driverFee: Yup.number().required('driver fee is required'),
      phone: Yup.string().required('phone is required'),
      supervisor: Yup.string().required('supervisor is required'),
      clientAccount: Yup.string().required('client account is required'),
    }),
    onSubmit: (values) => {
      console.log(values)
    },
  })

  const closeHandler = () => {
    setVisible(false)
  }

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
                Add Branch
              </Text>
            </Modal.Header>
            {/* <Divider css={{ my: '$5' }} /> */}
            <Modal.Body css={{ py: '$10' }}>
              <Flex
                direction={'column'}
                css={{
                  flexWrap: 'wrap',
                  gap: '$8',
                  '@lg': { flexWrap: 'nowrap', gap: '$10' },
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
                <Input
                  label={
                    formik.touched.country && formik.errors.country
                      ? formik.errors.country
                      : 'Country'
                  }
                  clearable
                  fullWidth
                  size='lg'
                  placeholder='e.g: Saudi Arabia'
                  name='country'
                  id='country'
                  value={formik.values.country}
                  onChange={formik.handleChange}
                  status={
                    formik.touched.country && formik.errors.country
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
                    formik.touched.governorate && formik.errors.governorate
                      ? formik.errors.governorate
                      : 'Governorate'
                  }
                  clearable
                  fullWidth
                  size='lg'
                  placeholder='e.g: Riyadh'
                  name='governorate'
                  id='governorate'
                  value={formik.values.governorate}
                  onChange={formik.handleChange}
                  status={
                    formik.touched.governorate && formik.errors.governorate
                      ? 'error'
                      : 'default'
                  }
                />
                <Input
                  label={
                    formik.touched.city && formik.errors.city
                      ? formik.errors.city
                      : 'City'
                  }
                  clearable
                  fullWidth
                  size='lg'
                  placeholder='e.g: Riyadh'
                  name='city'
                  id='city'
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  status={
                    formik.touched.city && formik.errors.city
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
                    formik.touched.orderFee && formik.errors.orderFee
                      ? formik.errors.orderFee
                      : 'Order Fee'
                  }
                  clearable
                  fullWidth
                  size='lg'
                  placeholder='e.g: 10'
                  name='orderFee'
                  id='orderFee'
                  value={formik.values.orderFee}
                  onChange={formik.handleChange}
                  status={
                    formik.touched.orderFee && formik.errors.orderFee
                      ? 'error'
                      : 'default'
                  }
                />
                <Input
                  label={
                    formik.touched.driverFee && formik.errors.driverFee
                      ? formik.errors.driverFee
                      : 'Driver Fee'
                  }
                  clearable
                  fullWidth
                  size='lg'
                  placeholder='e.g: 10'
                  name='driverFee'
                  id='driverFee'
                  value={formik.values.driverFee}
                  onChange={formik.handleChange}
                  status={
                    formik.touched.driverFee && formik.errors.driverFee
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
                    formik.touched.phone && formik.errors.phone
                      ? formik.errors.phone
                      : 'Phone'
                  }
                  clearable
                  fullWidth
                  size='lg'
                  placeholder='e.g: 966555555555'
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
                <Input
                  label={
                    formik.touched.supervisor && formik.errors.supervisor
                      ? formik.errors.supervisor
                      : 'Supervisor'
                  }
                  clearable
                  fullWidth
                  size='lg'
                  placeholder='e.g: John Doe'
                  name='supervisor'
                  id='supervisor'
                  value={formik.values.supervisor}
                  onChange={formik.handleChange}
                  status={
                    formik.touched.supervisor && formik.errors.supervisor
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
                    formik.touched.clientAccount && formik.errors.clientAccount
                      ? formik.errors.clientAccount
                      : 'Client Account'
                  }
                  clearable
                  fullWidth
                  size='lg'
                  placeholder='e.g: John Doe'
                  name='clientAccount'
                  id='clientAccount'
                  value={formik.values.clientAccount}
                  onChange={formik.handleChange}
                  status={
                    formik.touched.clientAccount && formik.errors.clientAccount
                      ? 'error'
                      : 'default'
                  }
                />
              </Flex>
            </Modal.Body>
            {/* <Divider css={{ my: '$5' }} /> */}
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
