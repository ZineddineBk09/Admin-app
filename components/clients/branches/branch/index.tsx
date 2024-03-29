import { Branch } from '../../../../interfaces'
import { Divider, Input } from '@nextui-org/react'
import React, { useState } from 'react'
import { DeleteBranch } from '../delete-branch'
import dynamic from 'next/dynamic'
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { useClientsBranchesContext } from '../../../../context/clients/branches'
import Loading from '../../../../components/shared/loading'
const BranchMap = dynamic(() => import('./map'), {
  ssr: false,
  loading: () => <Loading />,
})

export const BranchCard = ({ branch }: { branch: Branch }) => {
  const [showInfos, setShowInfos] = React.useState(false)
  const {
    id,
    name,
    country,
    governorate,
    city,
    customOrderFee,
    customDriverFee,
    phone,
    supervisor,
    clientAccount,
  } = branch
  const fields = [
    {
      name: 'Governorate',
      id: 'governorate',
      defaultValue: governorate,
      fees: true,
    },
    {
      name: 'City',
      id: 'city',
      defaultValue: city,
      fees: true,
    },
    {
      name: 'Custom Order Fees',
      id: 'customOrderFee',
      defaultValue: customOrderFee,
      includeNextField: true,
    },
    {
      name: 'Custom Driver Fees',
      id: 'customDriverFee',
      defaultValue: customDriverFee,
      hidden: true,
    },
    {
      name: 'Phone Number',
      id: 'phone',
      defaultValue: phone,
    },
    {
      name: 'Supervisor',
      id: 'supervisor',
      defaultValue: supervisor,
      includeNextField: true,
    },
    {
      name: 'Client Account',
      id: 'clientAccount',
      defaultValue: clientAccount,
      hidden: true,
    },
  ]

  return (
    <div
      className='w-full grid grid-cols-7 bg-white rounded-md p-4 shadow-lg gap-x-4'
      id={id}
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
                {name} <span className='ml-6 text-sm text-gray-400'>#{id}</span>
              </h1>
            </div>
          </button>
          <DeleteBranch id={id} />
        </div>

        {showInfos && (
          <>
            <Divider />
            <div className='w-full grid grid-cols-2 lg:grid-cols-4'>
              <div className='w-full flex items-center gap-x-6 col-span-2'>
                <label className='text-gray-600 text-sm'>Country</label>
                <p className='font-medium text-sm'>{country}</p>
              </div>

              <div className='w-full mx-auto flex justify-start gap-x-6 col-span-2 mt-4 lg:mt-0 lg:justify-evenly'>
                <div className='flex items-center gap-x-3'>
                  <label className='w-24 text-gray-600 text-sm'>
                    Order Fees
                  </label>
                  <p className='font-medium'>24</p>
                </div>
                <div className='flex items-center gap-x-3'>
                  <label className='w-24 text-gray-600 text-sm'>
                    Order Fees
                  </label>
                  <p className='font-medium'>24</p>
                </div>
              </div>
            </div>
            <Divider />
            {fields
              ?.filter(({ hidden }: any) => !hidden)
              ?.map((field, index: number) => {
                const { name, id, defaultValue, fees, includeNextField }: any =
                  field
                return (
                  <div
                    className='w-full flex flex-col items-start gap-y-3'
                    key={index}
                  >
                    <div className='w-full grid grid-cols-2 lg:grid-cols-4'>
                      <div className='w-full flex items-center gap-x-6 col-span-2'>
                        <label className='text-gray-600 text-sm'>{name}</label>
                        <input
                          name={id}
                          id={id}
                          type='text'
                          value={defaultValue}
                          onChange={(e) => {
                            console.log(e.target.value)
                          }}
                          className='w-60 bg-gray-200 rounded-md p-2 text-sm'
                        />
                      </div>
                      {includeNextField && (
                        <div className='w-full flex items-center gap-x-6 col-span-2 mt-4 lg:mt-0'>
                          <label className='text-gray-600 text-sm'>
                            {fields[fields.indexOf(field) + 1].name}
                          </label>
                          <input
                            name={id}
                            id={id}
                            type='text'
                            value={
                              fields[fields.indexOf(field) + 1].defaultValue
                                ? fields[fields.indexOf(field) + 1].defaultValue
                                : ''
                            }
                            onChange={(e) => {
                              console.log(e.target.value)
                            }}
                            className='w-60 bg-gray-200 rounded-md p-2 text-sm'
                          />
                        </div>
                      )}

                      {fees && (
                        <div className='w-full mx-auto flex justify-start gap-x-6 col-span-2 mt-4 lg:mt-0 lg:justify-evenly'>
                          <div className='flex items-center gap-x-3'>
                            <label className='w-24 text-gray-600 text-sm'>
                              Order Fees
                            </label>
                            <p className='font-medium'>24</p>
                          </div>
                          <div className='flex items-center gap-x-3'>
                            <label className='w-24 text-gray-600 text-sm'>
                              Order Fees
                            </label>
                            <p className='font-medium'>24</p>
                          </div>
                        </div>
                      )}
                    </div>
                    {index !==
                      fields.filter(({ hidden }: any) => !hidden)?.length -
                        1 && <Divider />}
                  </div>
                )
              })}
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
          <BranchMap />
        </div>
      )}
    </div>
  )
}

export const SearchBranch = () => {
  const { handleSearchBranches, countries, clientAccounts } =
    useClientsBranchesContext()

  return (
    <div className='mx-auto flex flex-col items-start  gap-y-4 lg:gap-y-0 lg:pl-0 lg:flex-row lg:items-center lg:justify-between lg:w-full'>
      {/* Country */}
      <div className='flex items-center gap-x-3 lg:ml-12'>
        <label className='w-40 text-sm lg:w-fit'>Select Country</label>
        <div className='w-72 h-10 bg-white rounded-full px-4'>
          <select
            name='country'
            id='country'
            className='w-full h-full bg-transparent '
          >
            <option value=''>All</option>
            {countries?.map((country: string, index: number) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Client */}
      <div className='flex items-center gap-x-3'>
        <label className='w-40 text-sm lg:w-fit'>Select Client</label>
        <div className='w-72 h-10 bg-white rounded-full px-4'>
          <select
            name='clientAccount'
            id='clientAccount'
            className='w-full h-full bg-transparent '
          >
            <option value=''>All</option>
            {clientAccounts?.map((clientAccount: string, index: number) => (
              <option key={index} value={clientAccount}>
                {clientAccount}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Search */}
      <div className='flex items-center gap-x-3 lg:mr-12'>
        <label className='w-40 text-sm lg:w-fit'>Search</label>
        <input
          name='search'
          id='search'
          type='text'
          className='w-72 bg-white rounded-full px-4 py-2'
          placeholder='Search'
          onChange={(e) => handleSearchBranches(e.target.value)}
        />
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
          onChange={(e) => setValue(parseInt(e.target.value))}
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
