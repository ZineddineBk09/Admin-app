import { Button, Input, Modal, Text, Loading, Tooltip } from '@nextui-org/react'
import React from 'react'
import { Flex } from '../../styles/flex'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { AddIcon } from '../../../components/icons/areas'

export const AddCity = () => {
  const [visible, setVisible] = React.useState(false)
  const handler = () => setVisible(true)
  const [loading, setLoading] = React.useState<boolean>(false)

  // Formik to handle the form state
  const formik = useFormik({
    initialValues: {
      name: '',
      country: '',
      orderFees: 0,
      driverFees: 0,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('name is required'),
      country: Yup.string().required('price unit is required'),
      orderFees: Yup.number().required('order fee is required'),
      driverFees: Yup.number().required('driver fee is required'),
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
                <Flex
                  css={{
                    gap: '$10',
                    flexWrap: 'wrap',
                    '@lg': { flexWrap: 'nowrap' },
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
                    gap: '$10',
                    flexWrap: 'wrap',
                    '@lg': { flexWrap: 'nowrap' },
                  }}
                >
                  <Input
                    label={
                      formik.touched.orderFees && formik.errors.orderFees
                        ? formik.errors.orderFees
                        : 'Order Fees'
                    }
                    clearable
                    fullWidth
                    size='lg'
                    placeholder='Stars'
                    name='orderFees'
                    id='orderFees'
                    value={formik.values.orderFees}
                    onChange={formik.handleChange}
                    status={
                      formik.touched.orderFees && formik.errors.orderFees
                        ? 'error'
                        : 'default'
                    }
                  />

                  <Input
                    label={
                      formik.touched.driverFees && formik.errors.driverFees
                        ? formik.errors.driverFees
                        : 'Driver Fees'
                    }
                    clearable
                    fullWidth
                    size='lg'
                    placeholder='Stars'
                    name='driverFees'
                    id='driverFees'
                    value={formik.values.driverFees}
                    onChange={formik.handleChange}
                    status={
                      formik.touched.driverFees && formik.errors.driverFees
                        ? 'error'
                        : 'default'
                    }
                  />
                </Flex>
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
