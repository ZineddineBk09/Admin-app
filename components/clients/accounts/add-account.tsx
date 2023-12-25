import {
  Button,
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

export const AddAccount = () => {
  const [visible, setVisible] = React.useState(false)
  const handler = () => setVisible(true)
  const [loading, setLoading] = React.useState<boolean>(false)
  /**  id: string
  name: string
  city: string
  discount: number
  website: string
  phone: string */
  const formik = useFormik({
    initialValues: {
      name: '',
      city: '',
      discount: 0,
      website: '',
      phone: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('name is required'),
      city: Yup.string().required('city is required'),
      discount: Yup.number().required('discount is required'),
      website: Yup.string().required('website is required'),
      phone: Yup.string().required('phone is required'),
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
      <Tooltip content='Add Account'>
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
                Add Account
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
                    placeholder='e.g: Burger King'
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
                    gap: '$10',
                    flexWrap: 'wrap',
                    '@lg': { flexWrap: 'nowrap' },
                  }}
                >
                  <Input
                    label={
                      formik.touched.discount && formik.errors.discount
                        ? formik.errors.discount
                        : 'Discount'
                    }
                    clearable
                    fullWidth
                    size='lg'
                    placeholder='e.g: 10%'
                    name='discount'
                    id='discount'
                    value={formik.values.discount}
                    onChange={formik.handleChange}
                    status={
                      formik.touched.discount && formik.errors.discount
                        ? 'error'
                        : 'default'
                    }
                  />

                  <Input
                    label={
                      formik.touched.website && formik.errors.website
                        ? formik.errors.website
                        : 'Website'
                    }
                    clearable
                    fullWidth
                    size='lg'
                    placeholder='e.g: https://example.com'
                    name='website'
                    id='website'
                    value={formik.values.website}
                    onChange={formik.handleChange}
                    status={
                      formik.touched.website && formik.errors.website
                        ? 'error'
                        : 'default'
                    }
                  />
                  <Input
                    label={
                      formik.touched.phone && formik.errors.phone
                        ? formik.errors.phone
                        : 'Phone Number'
                    }
                    clearable
                    fullWidth
                    size='lg'
                    placeholder='e.g: +966 55 555 5555'
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
              </Flex>
            </Modal.Body>
            {/* <Divider css={{ my: '$5' }} /> */}
            <Modal.Footer>
              <Button auto type='submit' className='bg-primary text-black'>
                Add Account
              </Button>
            </Modal.Footer>
          </form>
        )}
      </Modal>
    </div>
  )
}
