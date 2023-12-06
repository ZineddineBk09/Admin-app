import { Account, Branch } from '@/interfaces'
import { Divider } from '@nextui-org/react'
import React from 'react'
import { AddAccount } from './add-account'
import { DeleteAccount } from './delete-account'
import CopyToClipboardButton from '@/components/shared/copy-to-clipboard'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { useClientsAccountsContext } from '@/context/clients/accounts'
import Link from 'next/link'

const Accounts = () => {
  const { accounts } = useClientsAccountsContext()

  return (
    <div className='w-full mx-auto flex flex-col items-center gap-y-6'>
      <SearchAccount />
      <div className='w-full flex flex-col items-center gap-y-6'>
        {accounts.map((account: Account) => (
          <AccountCard key={account.id} account={account} />
        ))}
      </div>
      {/* add account button */}
      <AddAccount />
    </div>
  )
}

const AccountCard = ({ account }: { account: Account }) => {
  const [showInfos, setShowInfos] = React.useState(false)
  const { id, name, city, discount, website, phone, branches } = account
  const fields = [
    {
      name: 'Discount',
      id: 'discount',
      defaultValue: discount,
    },
    {
      name: 'Website',
      id: 'website',
      defaultValue: website,
    },
    {
      name: 'Phone Number',
      id: 'phone',
      defaultValue: phone,
    },
  ]

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
        <DeleteAccount id={id} />
      </div>
      {showInfos && (
        <>
          <Divider></Divider>
          <div className='w-full flex items-center gap-x-6'>
            <label className='text-gray-600 text-sm'>Name</label>
            <p className='text-sm'>{name}</p>
          </div>
          <Divider></Divider>
          <div className='w-full flex items-center gap-x-6'>
            <label className='text-gray-600 text-sm'>City</label>
            <p className='text-sm'>{city}</p>
          </div>
          <Divider></Divider>
          {fields.map(({ name, id, defaultValue }: any, index: number) => (
            <>
              <div key={index} className='w-full flex items-center gap-x-6'>
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
                <CopyToClipboardButton text={defaultValue} />
              </div>
              <Divider></Divider>
            </>
          ))}

          <div className='w-full flex items-start gap-x-6'>
            <label className='mt-2 text-gray-600 text-sm'>Branches</label>
            {branches.length > 0 ? (
              <div className='w-full flex flex-col items-start gap-y-2'>
                {branches.map(
                  (branch: { id: string; name: string }, index: number) => (
                    <div key={index}>
                      <Link
                        href={`/clients/branches?branchId=${branch.id}`}
                        passHref
                      >
                        <a className='h-10 w-fit flex items-center gap-x-6 transition-all duration-300 hover:bg-gray-100 px-2 rounded-md'>
                          <label className='text-gray-600 text-sm'>
                            Branch #{index + 1}
                          </label>
                          <p className='text-sm'>
                            {branch.name}{' '}
                            <span className='ml-6 text-sm text-gray-400'>
                              #{branch.id}
                            </span>
                          </p>
                        </a>
                      </Link>
                    </div>
                  )
                )}
              </div>
            ) : (
              <p className='text-sm'>No branches found</p>
            )}
          </div>
          <Divider></Divider>

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

const SearchAccount = () => {
  const { handleSearchAccounts } = useClientsAccountsContext()
  return (
    <div className='w-full flex items-center gap-x-6 ml-12'>
      <label className='text-sm'>Select Country</label>
      <input
        name='search'
        id='search'
        type='text'
        className='w-72 bg-white rounded-full px-4 py-2'
        placeholder='Saudi Arabia'
        onChange={(e) => {
          handleSearchAccounts(e.target.value)
        }}
      />
    </div>
  )
}

const Btn = ({
  children,
  bg = '[#B4B4B4]',
}: {
  children: any
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
