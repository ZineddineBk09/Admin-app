import { Button, Input, Modal, Text, Loading, Tooltip } from '@nextui-org/react'
import React from 'react'
import { Flex } from '../../styles/flex'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { AddIcon } from '../../../components/icons/areas'
import { createRecord } from '../../../lib/api'

export const AddDriverTeam = () => {
  const [visible, setVisible] = React.useState(false)
  const handler = () => setVisible(true)
  const [loading, setLoading] = React.useState<boolean>(false)

  const formik = useFormik({
    initialValues: {
      name: '',
      priceUnit: '',
      orderFees: 0,
      driverFees: 0,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('name is required'),
      priceUnit: Yup.string().required('price unit is required'),
      orderFees: Yup.number().required('order fee is required'),
      driverFees: Yup.number().required('driver fee is required'),
    }),
    onSubmit: async (values) => {
      await createRecord(values, 'team').then((res) => {
        setVisible(false)
      })
    },
  })

  const closeHandler = () => {
    setVisible(false)
  }

  return (
    <div>
      <Tooltip content='Add Team'>
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
                Add Team
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
            {/* <Divider css={{ my: '$5' }} /> */}
            <Modal.Footer>
              <Button auto type='submit' className='bg-primary text-black'>
                Add Team
              </Button>
            </Modal.Footer>
          </form>
        )}
      </Modal>
    </div>
  )
}
