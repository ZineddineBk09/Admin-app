import {
  Button,
  Input,
  Modal,
  Text,
  Loading,
  Tooltip,
  Checkbox,
} from '@nextui-org/react'
import React from 'react'
import { Flex } from '../../../styles/flex'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { createRecord } from '../../../../lib/api'
import toast from 'react-hot-toast'
import { useAreasCountriesContext } from '../../../../context/admin/areas/countries'

export const AddCurrency = () => {
  const [visible, setVisible] = React.useState(false)
  const handler = () => setVisible(true)
  const [loading, setLoading] = React.useState<boolean>(false)
  const { refreshCurrencies } = useAreasCountriesContext()

  const formik = useFormik({
    initialValues: {
      name: '',
      symbol: '',
      symbolNative: '',
      code: '',
      decimalDigits: 0,
      rounding: 0,
      namePlural: '',
      isSupported: false,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      symbol: Yup.string().required('Required'),
      symbolNative: Yup.string().required('Required'),
      code: Yup.string().required('Required'),
      decimalDigits: Yup.number().required('Required'),
      rounding: Yup.number().required('Required'),
      namePlural: Yup.string().required('Required'),
      isSupported: Yup.boolean().required('Required'),
    }),
    onSubmit: async (values) => {
      await createRecord(
        {
          name: values.name,
          symbol: values.symbol,
          symbol_native: values.symbolNative,
          code: values.code,
          decimal_digits: values.decimalDigits,
          rounding: 10,
          name_plural: 'Randoms',
          is_supported: true,
        },
        'currency'
      )
        .then((res) => {
          if (res) {
            setVisible(false)
            refreshCurrencies()
            toast.success('Currency added successfully')
          }
        })
        .catch((err) => {
          console.log('upload files err: ', err)
          toast.error('Error adding currency')
        })
    },
  })

  const closeHandler = () => setVisible(false)

  return (
    <div>
      <Tooltip content='Add Currency' onClick={handler}>
        <button className='h-10 w-16 flex items-center justify-center text-center text-4xl font-medium rounded-full'>
          +
        </button>
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
          <Loading size='xl' className='my-3'  />
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <Modal.Header css={{ justifyContent: 'center' }}>
              <Text
                id='modal-title'
                className='text-xl font-semibold capitalize'
                h4
              >
                ADD PRICE UNIT
              </Text>
            </Modal.Header>

            <Modal.Body css={{ py: '$10' }}>
              <Flex
                direction={'column'}
                css={{
                  gap: '$8',
                }}
              >
                <Flex
                  css={{
                    gap: '$10',
                    flexWrap: 'wrap',
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
                    placeholder='Saudi Riyal'
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
                      formik.touched.namePlural && formik.errors.namePlural
                        ? formik.errors.namePlural
                        : 'Name Plural'
                    }
                    clearable
                    fullWidth
                    size='lg'
                    placeholder='Saudi Riyals'
                    name='namePlural'
                    id='namePlural'
                    value={formik.values.namePlural}
                    onChange={formik.handleChange}
                    status={
                      formik.touched.namePlural && formik.errors.namePlural
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
                  {[
                    { id: 'symbol', name: 'Symbol', placeholder: 'SAR' },
                    {
                      id: 'symbolNative',
                      name: 'Symbol Native',
                      placeholder: 'SAR',
                    },
                    { id: 'code', name: 'Code', placeholder: 'SAR' },
                  ].map(
                    (
                      { name, id }: { name: string; id: string },
                      index: number
                    ) => (
                      <Input
                        key={index}
                        label={
                          //@ts-ignore
                          formik.touched[id] && formik.errors[id]
                            ? //@ts-ignore
                              formik.errors[id]
                            : name
                        }
                        clearable
                        fullWidth
                        size='lg'
                        id={id}
                        name={id}
                        placeholder={name}
                        //@ts-ignore
                        value={formik.values[id]}
                        onChange={formik.handleChange}
                        status={
                          //@ts-ignore
                          formik.touched[id] && formik.errors[id]
                            ? 'error'
                            : 'default'
                        }
                      />
                    )
                  )}
                </Flex>

                <Flex
                  css={{
                    gap: '$10',
                    flexWrap: 'wrap',
                    '@lg': { flexWrap: 'nowrap' },
                  }}
                >
                  {[
                    {
                      id: 'decimalDigits',
                      name: 'Decimals',
                      placeholder: '0',
                    },
                    {
                      id: 'rounding',
                      name: 'Rounding',
                      placeholder: '0',
                    },
                  ].map(
                    (
                      { name, id }: { name: string; id: string },
                      index: number
                    ) => (
                      <Input
                        key={index}
                        label={
                          //@ts-ignore
                          formik.touched[id] && formik.errors[id]
                            ? //@ts-ignore
                              formik.errors[id]
                            : name
                        }
                        clearable
                        fullWidth
                        size='lg'
                        id={id}
                        name={id}
                        placeholder={name}
                        //@ts-ignore
                        value={formik.values[id]}
                        onChange={formik.handleChange}
                        status={
                          //@ts-ignore
                          formik.touched[id] && formik.errors[id]
                            ? 'error'
                            : 'default'
                        }
                      />
                    )
                  )}
                </Flex>

                {/* Checkbox for supported */}
                <Flex
                  css={{
                    gap: '$10',
                    flexWrap: 'wrap',
                    '@lg': { flexWrap: 'nowrap' },
                  }}
                >
                  <Checkbox
                    id='isSupported'
                    name='isSupported'
                    value={formik.values.isSupported?.toString()}
                    onChange={(e) => {
                      formik.setFieldValue('isSupported', e)
                    }}
                    defaultChecked={formik.values.isSupported}
                    
                  >
                    <span className='text-base'>Supported</span>
                  </Checkbox>
                </Flex>
              </Flex>
            </Modal.Body>

            <Modal.Footer>
              <Button auto type='submit' className='bg-primary text-black'>
                Add Currency
              </Button>
            </Modal.Footer>
          </form>
        )}
      </Modal>
    </div>
  )
}
