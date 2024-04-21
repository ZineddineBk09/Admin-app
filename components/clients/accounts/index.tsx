import { Account, BranchMinimal } from '../../../interfaces'
import { Divider, Tooltip } from '@nextui-org/react'
import React, { MouseEventHandler } from 'react'
import { AddAccount } from './add-account'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { useClientsAccountsContext } from '../../../context/clients/accounts'
import { BinIcon } from '../../../components/icons/areas'
import InfiniteScroll from 'react-infinite-scroll-component'
import { partialUpdateRecord } from '../../../lib/api'
import toast from 'react-hot-toast'
import { useFormik } from 'formik'
import { DeleteModal } from '../../modals/delete'
import { AddTeam } from './add-team'

const Accounts = () => {
  const { accounts, hasMore, fetchNextPage } = useClientsAccountsContext()

  return (
    <div className='w-full mx-auto flex flex-col items-center gap-y-6'>
      <div className='w-full'>
        <InfiniteScroll
          dataLength={accounts?.length}
          hasMore={hasMore}
          next={fetchNextPage}
          loader={
            <span className='font-bold text-lg text-center'>Loading...</span>
          }
          endMessage={<div className='w-1/2 h-1 bg-gray-500' />}
          className='w-full flex flex-col items-center gap-y-6'
        >
          {accounts?.map((account: Account) => (
            <AccountCard key={account.id} account={account} />
          ))}
        </InfiniteScroll>
      </div>
      {/* add account button */}
      <AddAccount />
    </div>
  )
}

const AccountCard = ({ account }: { account: Account }) => {
  const { refreshAccounts } = useClientsAccountsContext()
  const [showInfos, setShowInfos] = React.useState(false)
  const {
    id,
    name,
    discount_percentage,
    website,
    phone_number,
    teams,
    branches,
  } = account
  const [showSave, setShowSave] = React.useState({
    discount_percentage: false,
    website: false,
    phone_number: false,
  })
  const formik = useFormik({
    initialValues: {
      discount_percentage,
      website,
      phone_number,
    },
    onSubmit: async (values) => {
      await partialUpdateRecord(
        {
          ...values,
          id: account?.id,
        },
        'account'
      )
        .then((res) => {
          if (res) {
            toast.success('Account updated successfully')

            refreshAccounts()
            setShowSave({
              discount_percentage: false,
              website: false,
              phone_number: false,
            })
          }
        })
        .catch((err) => {
          toast.error('Error updating account!')
        })
    },
  })

  return (
    <div className='w-full flex flex-col items-start gap-y-3 bg-white rounded-md p-4 shadow-lg'>
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
        <DeleteModal id={id} name='account' refresh={refreshAccounts} />
      </div>
      {showInfos && (
        <>
          <Divider />
          <div className='w-full flex items-center gap-x-6'>
            <label className='text-gray-600 text-sm'>Name</label>
            <p className='text-sm'>{name}</p>
          </div>
          <Divider />
          <>
            <div className='flex items-center gap-x-6'>
              <label className='text-gray-500 capitalize'>Discount</label>
              <div className='h-11 max-w-xs bg-gray-200 rounded px-4 flex justify-between items-center'>
                <input
                  id='discount_percentage'
                  name='discount_percentage'
                  type='text'
                  onChange={(e) => {
                    formik.handleChange(e)
                    setShowSave({ ...showSave, discount_percentage: true })
                  }}
                  value={formik.values.discount_percentage}
                  placeholder='0'
                  className='bg-transparent w-full h-full outline-none'
                />
              </div>
              {showSave.discount_percentage &&
                discount_percentage !== formik.values.discount_percentage &&
                SaveButton(formik.handleSubmit as any)}
            </div>
            <Divider />
          </>
          <div className='w-full flex '>
            <>
              <div className='w-1/2 flex items-center gap-x-6'>
                <label className='text-gray-500 capitalize'>Website</label>
                <div className='h-11 max-w-xs bg-gray-200 rounded px-4 flex justify-between items-center'>
                  <input
                    id='website'
                    name='website'
                    type='text'
                    onChange={(e) => {
                      formik.handleChange(e)
                      setShowSave({ ...showSave, website: true })
                    }}
                    value={formik.values.website}
                    placeholder='0'
                    className='bg-transparent w-full h-full outline-none'
                  />
                </div>
                {showSave.website &&
                  website !== formik.values.website &&
                  SaveButton(formik.handleSubmit as any)}
              </div>
            </>
            <>
              <div className='w-1/2 flex items-center gap-x-6'>
                <label className='text-gray-500 capitalize'>Phone Number</label>
                <div className='h-11 max-w-xs bg-gray-200 rounded px-4 flex justify-between items-center'>
                  <input
                    id='phone_number'
                    name='phone_number'
                    type='text'
                    onChange={(e) => {
                      formik.handleChange(e)
                      setShowSave({ ...showSave, phone_number: true })
                    }}
                    value={formik.values.phone_number}
                    placeholder='0'
                    className='bg-transparent w-full h-full outline-none'
                  />
                </div>
                {showSave.phone_number &&
                  phone_number !== formik.values.phone_number &&
                  SaveButton(formik.handleSubmit as any)}
              </div>
            </>
          </div>
          <Divider />

          {/* Teams */}
          <div className='w-full flex items-start gap-x-6'>
            <label className='mt-2 text-gray-600 text-sm'>Teams</label>
            {teams?.length > 0 ? (
              <div className='flex items-start gap-y-2 flex-wrap'>
                {teams?.map(
                  (
                    team: { id: string | number; name: string },
                    index: number
                  ) => (
                    <div key={id}>
                      <div className='h-10 w-fit flex items-center gap-x-6 transition-all duration-300 hover:bg-gray-100 px-2 rounded-md'>
                        <p className='text-sm capitalize'>{team?.name}</p>
                        <Tooltip
                          content={'Delete "' + team?.name + '"'}
                          color='error'
                        >
                          <button>
                            <BinIcon width={4} />
                          </button>
                        </Tooltip>
                        {index < teams?.length - 1 && (
                          <span className='-ml-4'>,</span>
                        )}
                      </div>
                    </div>
                  )
                )}
              </div>
            ) : (
              <p className='text-sm my-auto'>No teams found</p>
            )}
            <AddTeam id={id} refresh={refreshAccounts} />
          </div>

          <Divider />
          {/* Admins */}

          <div className='w-full flex items-start gap-x-6'>
            <label className='mt-2 text-gray-600 text-sm'>Admins</label>
            {branches?.length > 0 ? (
              <div className='flex items-start gap-y-2 flex-wrap'>
                {branches?.map((branch: BranchMinimal, index: number) => (
                  <div key={branch.id}>
                    <div className='h-10 w-fit flex items-center gap-x-6 transition-all duration-300 hover:bg-gray-100 px-2 rounded-md'>
                      <p className='text-sm capitalize'>
                        {branch.supervisor.username}
                      </p>
                      <Tooltip
                        content={'Delete "' + branch.account.name + '"'}
                        color='error'
                      >
                        <button>
                          <BinIcon width={4} />
                        </button>
                      </Tooltip>
                      {index < branches?.length - 1 && (
                        <span className='-ml-4'>,</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className='text-sm my-auto'>No branches found</p>
            )}
          </div>

          <Divider />

          <div className='w-full flex items-center gap-x-6'>
            <label className='text-gray-600 text-sm'>Contract</label>
            <div className='flex items-center gap-x-3'>
              <Btn>
                Upload New
                <input
                  type='file'
                  className='absolute inset-0 opacity-0 cursor-pointer'
                />
              </Btn>
              <Btn>Download</Btn>
              <Btn bg='primary'>Print</Btn>
            </div>
          </div>
        </>
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

const Btn = ({
  children,
  bg = '[#B4B4B4]',
}: {
  children: React.ReactNode
  bg?: string
}) => {
  return (
    <button
      className={`min-w-[128px] relative font-medium text-xs shadow-md shadow-black/30 rounded-md text-center py-2 bg-${bg} px-2 transition-all duration-300 hover:bg-opacity-90 cursor-pointer`}
    >
      {children}
    </button>
  )
}

export default Accounts
