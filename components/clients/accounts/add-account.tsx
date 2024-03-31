import { Button, Input, Modal, Text, Loading, Tooltip } from '@nextui-org/react'
import React from 'react'
import { Flex } from '../../styles/flex'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { AddIcon } from '../../../components/icons/areas'
import { createRecord } from '../../../lib/api'
import { useClientsAccountsContext } from '../../../context/clients/accounts'
import toast from 'react-hot-toast'

export const AddAccount = () => {
  const [visible, setVisible] = React.useState(false)
  const handler = () => setVisible(true)
  const [loading, setLoading] = React.useState<boolean>(false)
  const { refreshAccounts } = useClientsAccountsContext()

  const formik = useFormik({
    initialValues: {
      name: '',
      discount_percentage: 0,
      website: '',
      phone_number: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('name is required'),
      discount_percentage: Yup.number().required('discount is required'),
      website: Yup.string().required('website is required'),
      phone_number: Yup.string().required('phone number is required'),
    }),
    onSubmit: async (values) => {
      await createRecord(
        {
          ...values,
          teams: [],
          branches: [],
        },
        'account'
      )
        .then((res) => {
          if (res) {
            setVisible(false)
            toast.success('Account type added successfully')
            refreshAccounts()
          }
        })
        .catch((err) => {
          console.log('Error adding account type!: ', err)
          toast.error('Error adding account type!')
        })
    },
  })

  const closeHandler = () => setVisible(false)

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
                    formik.touched.discount_percentage &&
                    formik.errors.discount_percentage
                      ? formik.errors.discount_percentage
                      : 'Discount'
                  }
                  clearable
                  fullWidth
                  size='lg'
                  placeholder='e.g: 10%'
                  name='discount_percentage'
                  id='discount_percentage'
                  value={formik.values.discount_percentage}
                  onChange={formik.handleChange}
                  status={
                    formik.touched.discount_percentage &&
                    formik.errors.discount_percentage
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
                    formik.touched.phone_number && formik.errors.phone_number
                      ? formik.errors.phone_number
                      : 'Phone Number'
                  }
                  clearable
                  fullWidth
                  size='lg'
                  placeholder='e.g: +966 55 555 5555'
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
