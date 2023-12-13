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

export const AddDriverProfile = () => {
  const [visible, setVisible] = React.useState(false)
  const handler = () => setVisible(true)
  const [loading, setLoading] = React.useState<boolean>(false)

  const formik = useFormik({
    initialValues: {
      name: '',
      priceUnit: '',
      orderFee: 0,
      driverFee: 0,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('name is required'),
      priceUnit: Yup.string().required('price unit is required'),
      orderFee: Yup.number().required('order fee is required'),
      driverFee: Yup.number().required('driver fee is required'),
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
      <Tooltip content='Add Profile'>
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
            <Modal.Header css={{ justifyContent: 'start' }}>
              <Text
                id='modal-title'
                className='text-xl font-semibold uppercase'
                h4
              >
                Add Profile
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
                      formik.touched.priceUnit && formik.errors.priceUnit
                        ? formik.errors.priceUnit
                        : 'Price Unit'
                    }
                    clearable
                    fullWidth
                    size='lg'
                    placeholder='e.g: 1, 2, 3, 4'
                    name='priceUnit'
                    id='priceUnit'
                    value={formik.values.priceUnit}
                    onChange={formik.handleChange}
                    status={
                      formik.touched.priceUnit && formik.errors.priceUnit
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
                      formik.touched.orderFee && formik.errors.orderFee
                        ? formik.errors.orderFee
                        : 'Order Fees'
                    }
                    clearable
                    fullWidth
                    size='lg'
                    placeholder='Stars'
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
                        : 'Driver Fees'
                    }
                    clearable
                    fullWidth
                    size='lg'
                    placeholder='Stars'
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
              </Flex>
            </Modal.Body>
            <Divider css={{ my: '$5' }} />
            <Modal.Footer>
              <Button auto type='submit' className='bg-primary text-black'>
                Add Profile
              </Button>
            </Modal.Footer>
          </form>
        )}
      </Modal>
    </div>
  )
}
