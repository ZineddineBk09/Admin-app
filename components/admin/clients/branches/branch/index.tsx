import {
  AccountMinimal,
  Branch,
  City,
  Country,
  Governorate,
} from '../../../../../interfaces'
import { Divider, Input } from '@nextui-org/react'
import React, { MouseEventHandler, useState } from 'react'
import dynamic from 'next/dynamic'
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { useClientsBranchesContext } from '../../../../../context/admin/clients/branches'
import Loading from '../../../../../components/shared/loading'
import { DeleteModal } from '../../../../modals/delete'
import { useFormik } from 'formik'
import { partialUpdateRecord } from '../../../../../lib/api'
import toast from 'react-hot-toast'
import { useUsersContext } from '../../../../../context/admin/users'
import { useClientsAccountsContext } from '../../../../../context/admin/clients/accounts'
import { useAreasGovernoratesContext } from '../../../../../context/admin/areas/governorates'
import { useAreasCitiesContext } from '../../../../../context/admin/areas/cities'
import { useAreasCountriesContext } from '../../../../../context/admin/areas/countries'
import { LabelField } from '../../../../shared/text/label'
const BranchMap = dynamic(() => import('./map'), {
  ssr: false,
  loading: () => <Loading />,
})

export const BranchCard = ({ branch }: { branch: Branch }) => {
  const { refreshBranches } = useClientsBranchesContext()
  const { accounts } = useClientsAccountsContext()
  const { users } = useUsersContext()
  const { governorates } = useAreasGovernoratesContext()
  const { cities } = useAreasCitiesContext()
  const [showInfos, setShowInfos] = React.useState(false)
  const {
    id,
    address,
    supervisor,
    account,
    order_fees,
    driver_fees,
    phone_number,
    main,
  } = branch
  const [showSave, setShowSave] = React.useState({
    governorate: false,
    city: false,
    order_fees: false,
    driver_fees: false,
    phone_number: false,
    client: false,
  })
  const formik = useFormik({
    initialValues: {
      governorate: address.governorate.name,
      city: address.city.name,
      order_fees,
      driver_fees,
      phone_number,
      client: account.id,
    },
    onSubmit: async (values) => {
      await partialUpdateRecord(
        {
          ...values,
          id,
        },
        'branch'
      )
        .then((res) => {
          if (res) {
            toast.success('Branch updated successfully')

            refreshBranches()
            setShowSave({
              governorate: false,
              city: false,
              order_fees: false,
              driver_fees: false,
              phone_number: false,
              client: false,
            })
          }
        })
        .catch((err) => {
          toast.error('Error updating branch!')
        })
    },
  })

  return (
    <div
      className='w-full grid grid-cols-7 bg-white rounded-md p-4 shadow-lg gap-x-4'
      id={id as string}
    >
      {/* Infos */}
      <div
        className={`w-full flex flex-col items-start gap-y-3 ${
          showInfos ? 'col-span-5 ' : 'col-span-7'
        }`}
      >
        <div className='w-full flex items-center justify-between'>
          <button onClick={() => setShowInfos(!showInfos)}>
            <div className='flex items-center gap-x-3'>
              <ChevronRightIcon
                className={`w-5 h-5 transform transition-all duration-300
            ${showInfos ? 'rotate-90' : 'rotate-0'}
            `}
              />
              <h1 className='text-lg font-semibold'>
                {account.name + '-' + address.city.name} {main && ' (Main)'}
                <span className='ml-6 text-sm text-gray-400'>#{id}</span>
              </h1>
            </div>
          </button>
          <DeleteModal id={id} name='branch' refresh={refreshBranches} />
        </div>

        {showInfos && (
          <>
            <Divider />
            <div className='w-full grid grid-cols-2 lg:grid-cols-4'>
              <div className='w-full flex items-center gap-x-6 col-span-2'>
                <LabelField>Country</LabelField>
                <p className='font-medium text-sm'>{address.country.name}</p>
              </div>

              <div className='w-full mx-auto flex justify-start gap-x-6 col-span-2 mt-4 lg:mt-0 lg:justify-evenly'>
                <div className='flex items-center gap-x-3'>
                  <LabelField>Order Fees</LabelField>
                  <p className='font-medium'>{order_fees}</p>
                </div>
                <div className='flex items-center gap-x-3'>
                  <LabelField>Driver Fees</LabelField>
                  <p className='font-medium'>{driver_fees}</p>
                </div>
              </div>
            </div>

            <Divider />

            <div className='w-full flex'>
              <div className='w-1/2 flex items-center gap-x-6'>
                <LabelField>Governorate</LabelField>

                <div className='min-w-[50%] h-11 bg-gray-200 rounded px-4 flex justify-between items-center'>
                  <select
                    id='governorate'
                    name='governorate'
                    onChange={(e) => {
                      formik.handleChange(e)
                      setShowSave({ ...showSave, governorate: true })
                    }}
                    value={formik.values.governorate}
                    className={`w-full border text-gray-900 text-sm rounded-lg focus:ring-blue-500 block p-2.5 ${
                      formik.touched.governorate && formik.errors.governorate
                        ? 'border-red-500 bg-red-200'
                        : 'border-gray-300 bg-transparent'
                    }`}
                  >
                    {governorates?.map((governorate: Governorate) => (
                      <option key={governorate.id} value={governorate.id}>
                        {governorate.name}
                      </option>
                    ))}
                  </select>
                </div>
                {showSave.governorate &&
                  address.governorate.id !== formik.values.governorate &&
                  SaveButton(formik.handleSubmit as any)}
              </div>
              <div className='w-1/2 flex items-center gap-x-6'>
                <LabelField>City</LabelField>
                <div className='min-w-[50%] h-11 bg-gray-200 rounded px-4 flex justify-between items-center'>
                  <select
                    id='city'
                    name='city'
                    onChange={(e) => {
                      formik.handleChange(e)
                      setShowSave({ ...showSave, city: true })
                    }}
                    value={formik.values.city}
                    className={`w-full border text-gray-900 text-sm rounded-lg focus:ring-blue-500 block p-2.5 ${
                      formik.touched.city && formik.errors.city
                        ? 'border-red-500 bg-red-200'
                        : 'border-gray-300 bg-transparent'
                    }`}
                  >
                    {cities?.map((city: City) => (
                      <option key={city.id} value={city.id}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </div>
                {showSave.city &&
                  address.city.id !== formik.values.city &&
                  SaveButton(formik.handleSubmit as any)}
              </div>
            </div>

            <Divider />

            <div className='w-full flex'>
              <div className='w-1/2 flex items-center gap-x-6'>
                <LabelField>order fees</LabelField>
                <div className='h-11 max-w-xs bg-gray-200 rounded px-4 flex justify-between items-center'>
                  <input
                    id='order_fees'
                    name='order_fees'
                    type='text'
                    value={formik.values.order_fees}
                    placeholder='0'
                    className='bg-transparent w-full h-full outline-none'
                    onChange={(e) => {
                      formik.handleChange(e)
                      setShowSave({ ...showSave, order_fees: true })
                    }}
                  />
                  <span className='text-gray-500 w-32 text-xs md:text-sm'>
                    SAR / order
                  </span>
                </div>
                {showSave.order_fees &&
                  order_fees !== formik.values.order_fees &&
                  SaveButton(formik.handleSubmit as any)}
              </div>
              <div className='w-1/2 flex items-center gap-x-6'>
                <LabelField>
                  <div className='ml-1'>driver fees</div>
                </LabelField>
                <div className='h-11 max-w-xs bg-gray-200 rounded px-4 flex justify-between items-center'>
                  <input
                    id='driver_fees'
                    name='driver_fees'
                    type='text'
                    value={formik.values.driver_fees}
                    placeholder='0'
                    className='bg-transparent w-full h-full outline-none'
                    onChange={(e) => {
                      formik.handleChange(e)
                      setShowSave({ ...showSave, driver_fees: true })
                    }}
                  />
                  <span className='text-gray-500 w-32 text-xs md:text-sm'>
                    SAR / order
                  </span>
                </div>
                {showSave.driver_fees &&
                  driver_fees !== formik.values.driver_fees &&
                  SaveButton(formik.handleSubmit as any)}
              </div>
            </div>

            <Divider />

            <div className='w-1/2 flex items-center gap-x-6'>
              <LabelField>Phone Number</LabelField>
              <div className='h-11 max-w-xs bg-gray-200 rounded px-4 flex justify-between items-center'>
                <input
                  id='phone_number'
                  name='phone_number'
                  type='text'
                  value={formik.values.phone_number}
                  placeholder='0'
                  className='bg-transparent w-full h-full outline-none'
                  onChange={(e) => {
                    formik.handleChange(e)
                    setShowSave({ ...showSave, phone_number: true })
                  }}
                />
              </div>
              {showSave.phone_number &&
                phone_number !== formik.values.phone_number &&
                SaveButton(formik.handleSubmit as any)}
            </div>

            <Divider />

            {/* <div className='w-full flex'>
              <div className='w-1/2 flex items-center gap-x-6'>
                <label className='text-gray-500 capitalize'>Supervisor</label>

                <div className='min-w-[50%] h-11 bg-gray-200 rounded px-4 flex justify-between items-center'>
                  <select
                    id='supervisor'
                    name='supervisor'
                    onChange={(e) => {
                      formik.handleChange(e)
                      setShowSave({ ...showSave, supervisor: true })
                    }}
                    value={formik.values.supervisor}
                    className={`w-full border text-gray-900 text-sm rounded-lg focus:ring-blue-500 block p-2.5 ${
                      formik.touched.supervisor && formik.errors.supervisor
                        ? 'border-red-500 bg-red-200'
                        : 'border-gray-300 bg-transparent'
                    }`}
                  >
                    {users?.map((user: User) => (
                      <option key={user.id} value={user.id}>
                        {user.username}
                      </option>
                    ))}
                  </select>
                </div>
                {showSave.supervisor &&
                  supervisor.id !== formik.values.supervisor &&
                  SaveButton(formik.handleSubmit as any)}
              </div>
              <div className='w-1/2 flex items-center gap-x-6'>
                <label className='text-gray-500 capitalize'>
                  Client Account
                </label>

                <div className='min-w-[50%] h-11 bg-gray-200 rounded px-4 flex justify-between items-center'>
                  <select
                    id='client'
                    name='client'
                    onChange={(e) => {
                      formik.handleChange(e)
                      setShowSave({ ...showSave, client: true })
                    }}
                    value={formik.values.client}
                    className={`w-full border text-gray-900 text-sm rounded-lg focus:ring-blue-500 block p-2.5 ${
                      formik.touched.client && formik.errors.client
                        ? 'border-red-500 bg-red-200'
                        : 'border-gray-300 bg-transparent'
                    }`}
                  >
                    {accounts?.map((account: AccountMinimal) => (
                      <option key={account.id} value={account.id}>
                        {account.name}
                      </option>
                    ))}
                  </select>
                </div>
                {showSave.client &&
                  account.id !== formik.values.client &&
                  SaveButton(formik.handleSubmit as any)}
              </div>
            </div> */}
            <div className='w-full flex items-center justify-between'>
              <div className='w-1/2 flex items-center gap-x-6'>
                <LabelField>Supervisor</LabelField>

                <div className='flex items-center justify-between w-60 bg-gray-200 rounded-md p-2 lg:w-40 xl:w-60'>
                  <input
                    name='supervisor'
                    id='supervisor'
                    type='text'
                    value={supervisor?.username}
                    onChange={(e) => {
                      console.log(e.target.value)
                    }}
                    className='text-sm bg-transparent w-full outline-none'
                  />
                </div>
              </div>
            </div>

            <Divider />

            <AutoCancelSwitch />
          </>
        )}
      </div>

      {/* Map */}
      {showInfos && (
        <div
          className={`bg-gray-200 rounded-md relative ${
            showInfos && 'col-span-2 '
          }`}
        >
          <BranchMap
            id={address.id}
            location={{
              lat: address.latitude || 0,
              lng: address.longitude || 0,
            }}
          />
        </div>
      )}
    </div>
  )
}

const SaveButton = (submit: MouseEventHandler<HTMLButtonElement>) => {
  return (
    <button
      onClick={submit}
      className='bg-primary-500 text-black px-6 py-2 rounded-md hover:bg-primary'
      type='button'
    >
      Save
    </button>
  )
}

export const SearchBranch = () => {
  const { handleFilterClient, handleFilterCountry } =
    useClientsBranchesContext()
  const { countries } = useAreasCountriesContext()
  const { accounts } = useClientsAccountsContext()

  return (
    <div className='mx-auto flex flex-col items-start gap-y-4 md:gap-y-0 md:pl-0 md:flex-row md:items-center  md:w-full gap-x-6'>
      {/* Country */}
      <div className='flex items-center gap-x-3 lg:ml-12'>
        <label className='w-40 text-sm md:w-fit'>Select Country</label>
        <div className='w-72 h-10 bg-white rounded-full px-4'>
          <select
            name='country'
            id='country'
            className='w-full h-full bg-transparent '
            onChange={(e) => handleFilterCountry(e.target.value)}
          >
            <option value=''>All</option>
            {countries?.map((country: Country, index: number) => (
              <option key={country.id} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Client */}
      <div className='flex items-center gap-x-3'>
        <label className='w-40 text-sm md:w-fit'>Select Client</label>
        <div className='w-72 h-10 bg-white rounded-full px-4'>
          <select
            name='account'
            id='account'
            className='w-full h-full bg-transparent '
            onChange={(e) => handleFilterClient(e.target.value)}
          >
            <option value=''>All</option>
            {accounts?.map((account: AccountMinimal, index: number) => (
              <option key={account.id} value={account.name}>
                {account.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

const AutoCancelSwitch = () => {
  const [enabled, setEnabled] = useState(false)
  const [value, setValue] = useState(10)

  return (
    <div className='relative flex flex-col items-start justify-center overflow-hidden gap-y-3'>
      <div className='flex'>
        <span className='mr-2 font-bold text-gray-900'>Auto Cancel Orders</span>
        <label className='inline-flex relative items-center mr-5 cursor-pointer'>
          <input
            type='checkbox'
            className='sr-only peer'
            checked={enabled}
            readOnly
          />
          <div
            onClick={() => setEnabled(!enabled)}
            className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-primary-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"
          />
        </label>
      </div>
      <p className='text-gray-500'>
        enabling this will cancel all orders automatically after{' '}
        <b>{value} minutes</b> for all orders related to this branch.
      </p>
      <div className='flex items-center justify-between gap-x-3'>
        <Input
          type='number'
          min={1}
          disabled={!enabled}
          value={value}
          onChange={(e: any) => setValue(parseInt(e.target.value))}
        />
        <button
          className={`px-4 py-2 bg-primary text-gray-700 rounded-lg ${
            !enabled && 'opacity-50 cursor-not-allowed'
          }`}
          disabled={!enabled}
        >
          Save
        </button>
      </div>
    </div>
  )
}

export default BranchCard
