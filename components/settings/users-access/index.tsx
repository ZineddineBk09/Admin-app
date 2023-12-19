import { UserAccess } from '@/interfaces'
import { Divider, Tooltip } from '@nextui-org/react'
import React from 'react'
import { AddUserAccess } from './add-user-access'
import { DeleteUserAccess } from './delete-user-access'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { BinIcon } from '@/components/icons/areas'

const UsersAccess = () => {
  const users: UserAccess[] = [
    {
      id: 1296,
      username: 'Mohamed Ali',
      email: 'mohamed@gmail.com',
      accessProfile: 'Admin',
      clients: ['client1', 'client2'],
    },
    {
      id: 1297,
      username: 'Ahmed Ali',
      email: 'ahmed@gmail.com',
      accessProfile: 'Manager',
      clients: ['client1', 'client2'],
    },
    {
      id: 1298,
      username: 'Ali Ali',
      email: 'ali@outlook.com',
      accessProfile: 'Driver',
      clients: ['client1', 'client2'],
    },
  ]

  return (
    <div className='w-full mx-auto flex flex-col items-center gap-y-6'>
      <SearchTypes />
      <div className='w-full flex flex-col items-center gap-y-6'>
        {users?.map((user) => (
          <UserAccessCard key={user.id} user={user} />
        ))}
      </div>
      {/* add user button */}
      <AddUserAccess />
    </div>
  )
}

const UserAccessCard = ({ user }: { user: UserAccess }) => {
  const [showInfos, setShowInfos] = React.useState(false)
  const { id, username, email, accessProfile, clients } = user

  const fields = [
    {
      name: 'Name',
      id: 'username',
      defaultValue: username,
    },
    {
      name: 'Email',
      id: 'email',
      defaultValue: email,
    },
    {
      name: 'Access Profile',
      id: 'accessProfile',
      defaultValue: accessProfile,
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
              {username}{' '}
              <span className='ml-6 text-sm text-gray-400'>#{id}</span>
            </h1>
          </div>
        </button>
        <DeleteUserAccess id={id} />
      </div>
      {showInfos && <Divider />}
      <div className='w-full flex flex-col gap-y-3'>
        {showInfos && (
          <>
            <div className='w-full flex flex-col gap-y-3 items-center lg:flex-row'>
              {/* Fixed, Price, ... */}
              {fields?.map(({ name, id, defaultValue }: any, index: number) => (
                <>
                  <div key={index} className='w-full flex items-center gap-x-6'>
                    <label className='text-gray-600 text-sm w-32 lg:w-fit'>
                      {name}
                    </label>
                    <div className='flex items-center justify-between w-60 bg-gray-200 rounded-md p-2 lg:w-40 xl:w-60'>
                      <input
                        name={id}
                        id={id}
                        type='text'
                        value={defaultValue}
                        onChange={(e) => {
                          console.log(e.target.value)
                        }}
                        className='text-sm bg-transparent w-full outline-none'
                      />
                    </div>
                  </div>
                </>
              ))}
            </div>
            <Divider />
            {/* Clients */}
            <div className='w-full flex items-start gap-x-6'>
              <label className='mt-2 text-gray-600 text-sm'>Clients</label>
              {clients.length > 0 ? (
                <div className='w-full flex items-start gap-y-2'>
                  {clients?.map((client: any, index: number) => (
                    <div key={index}>
                      <div className='h-10 w-fit flex items-center gap-x-6 transition-all duration-300 hover:bg-gray-100 px-2 rounded-md'>
                        <p className='text-sm capitalize'>{client}</p>
                        <Tooltip
                          content={'Delete "' + client + '"'}
                          color='error'
                        >
                          <button>
                            <BinIcon width={4} />
                          </button>
                        </Tooltip>
                        {index < clients.length - 1 && (
                          <span className='-ml-4'>,</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className='text-sm'>No clients found</p>
              )}

              <Tooltip content='Add Client'>
                <button className='h-10 w-16 flex items-center justify-center text-center text-4xl font-medium rounded-full'>
                  +
                </button>
              </Tooltip>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

const SearchTypes = () => {
  return (
    <div className='w-full flex items-center gap-x-6 ml-12'>
      <div className='w-72 h-10 bg-white rounded-full px-4'>
        <input
          name='user'
          id='user'
          className='w-full h-full bg-transparent'
          placeholder='Search'
        />
      </div>
    </div>
  )
}

export default UsersAccess
