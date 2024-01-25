import { AccessProfile } from '@/interfaces'
import {
  Divider,
  Tooltip,
  Collapse,
  Grid,
  Loading,
  Modal,
  Text,
  Checkbox,
} from '@nextui-org/react'
import React from 'react'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { AddDriverProfile } from './add-profile'
import { DeleteDriverType } from './delete-profile'
import { NotesIcon as EditIcon } from '@/components/icons/table'
import { ArrowIcon } from '@/components/icons/permissions'

const Profiles = () => {
  const profiles: AccessProfile[] = [
    {
      id: 3654,
      name: 'Admin',
      permissions: [
        'create client',
        'edit client',
        'remove client',
        'add order',
        'edit order',
        'remove order',
        'add driver',
        'edit driver',
        'remove driver',
        'add vehicle',
        'edit vehicle',
        'remove vehicle',
        'add driver type',
        'edit driver type',
        'remove driver type',
        'add vehicle type',
        'edit vehicle type',
        'remove vehicle type',
        'add access profile',
        'edit access profile',
        'remove access profile',
        'add user',
        'edit user',
        'remove user',
        'add role',
        'edit role',
        'remove role',
        'add permission',
        'edit permission',
        'remove permission',
      ],
    },
    {
      id: 1816,
      name: 'Area Manager',
      permissions: [
        'create client',
        'edit client',
        'remove client',
        'add order',
        'edit order',
        'remove order',
      ],
    },
    {
      id: 9234,
      name: 'Client',
      permissions: ['view order', 'view driver', 'view vehicle'],
    },
  ]

  return (
    <div className='w-full mx-auto flex flex-col items-center gap-y-6'>
      <SearchTypes />
      <div className='w-full flex flex-col items-center gap-y-6'>
        {profiles?.map((profile: AccessProfile, index: number) => (
          <CountryCard key={index} profile={profile} />
        ))}
      </div>
      {/* add profile button */}
      <AddDriverProfile />
    </div>
  )
}

const CountryCard = ({ profile }: { profile: AccessProfile }) => {
  const [showInfos, setShowInfos] = React.useState(false)
  const { id, name, permissions } = profile

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
        <DeleteDriverType id={id} />
      </div>
      {showInfos && <Divider />}
      {showInfos && (
        <div className='w-full flex gap-x-3 items-center'>
          <label className='w-48 text-gray-500'>Access Permissions</label>
          <div className='w-full flex flex-wrap gap-x-3 items-center'>
            {renderPermissions(permissions)}
          </div>
        </div>
      )}
    </div>
  )
}

const SearchTypes = () => {
  return (
    <div className='w-full flex items-center gap-x-6 ml-12'>
      <div className='w-72 h-10 bg-white rounded-full px-4'>
        <input
          name='profile'
          id='profile'
          className='w-full h-full bg-transparent'
          placeholder='Search'
        />
      </div>
    </div>
  )
}

const renderPermissions = (permissions: string[]) => {
  const screenW = window.innerWidth
  const isMobile = screenW < 768
  const maxPermissions = isMobile ? 2 : 5

  return permissions?.map((permission, index) => {
    if (index < maxPermissions) {
      return (
        <span key={index} className='capitalize text-gray-600'>
          {permission + (index === permissions?.length - 1 ? '' : ',')}
        </span>
      )
    } else if (index === maxPermissions) {
      return (
        <div
          className='w-16 flex items-start justify-center gap-x-2'
          key={index}
        >
          <span className='text-gray-600'>
            ...+{permissions?.length - maxPermissions}
          </span>

          <SelectPermissions />
        </div>
      )
    }
  })
}

export const SelectPermissions = () => {
  const [visible, setVisible] = React.useState(false)
  const handler = () => setVisible(true)
  const [loading, setLoading] = React.useState<boolean>(false)
  const permissions = [
    {
      name: 'basic',
      list: [
        {
          name: 'all drivers',
          read: true,
          add: false,
          edit: true,
          delete: false,
        },
        {
          name: 'all vehicles',
          read: true,
          add: false,
          edit: true,
          delete: false,
        },
        {
          name: 'all orders',
          read: true,
          add: false,
          edit: true,
          delete: false,
        },
        {
          name: 'all clients',
          read: true,
          add: false,
          edit: true,
          delete: false,
        },
      ],
    },
    {
      name: 'related',
      list: [
        {
          name: 'all drivers',
          read: true,
          add: false,
          edit: true,
          delete: false,
        },
        {
          name: 'all vehicles',
          read: true,
          add: false,
          edit: true,
          delete: false,
        },
        {
          name: 'all orders',
          read: true,
          add: false,
          edit: true,
          delete: false,
        },
        {
          name: 'all clients',
          read: true,
          add: false,
          edit: true,
          delete: false,
        },
      ],
    },
    {
      name: 'dynamic',
      list: [
        {
          name: 'all drivers',
          read: true,
          add: false,
          edit: true,
          delete: false,
        },
        {
          name: 'all vehicles',
          read: true,
          add: false,
          edit: true,
          delete: false,
        },
        {
          name: 'all orders',
          read: true,
          add: false,
          edit: true,
          delete: false,
        },
        {
          name: 'all clients',
          read: true,
          add: false,
          edit: true,
          delete: false,
        },
      ],
    },
  ]
  const closeHandler = () => {
    setVisible(false)
  }

  return (
    <>
      <Tooltip content='Edit' onClick={handler}>
        <button className='w-5'>
          <EditIcon />
        </button>
      </Tooltip>

      <Modal
        closeButton
        aria-labelledby='modal-title'
        width='900px'
        open={visible}
        onClose={closeHandler}
        className='rounded-md'
        css={{
          backgroundColor: '#EEEEEE !important',
        }}
      >
        <Modal.Header>
          <Text id='modal-title' className='text-xl font-semibold' h4>
            Select Access Permissions
          </Text>
        </Modal.Header>
        {loading ? (
          <Loading size='xl' className='my-3' color='warning' />
        ) : (
          <Modal.Body>
            <Grid.Container gap={2}>
              <Grid>
                <Collapse.Group splitted animated>
                  {permissions?.map((permission: any, index: number) => (
                    <Collapse
                      key={index}
                      title={
                        <span className='capitalize'>{permission.name}</span>
                      }
                      shadow
                      css={{
                        backgroundColor: '#FFFFFF !important',
                        width: '800px !important',
                        shadow: '0px 0px 10px #AEAEAE !important',
                      }}
                      arrowIcon={<ArrowIcon />}
                    >
                      <div className='w-full'>
                        {permission?.list?.map((item: any, index: number) => (
                          <div key={index} className='w-full grid grid-cols-7'>
                            <label className='col-span-3 capitalize'>
                              {item.name}
                            </label>
                            <Checkbox
                              defaultChecked={item.read}
                              value={item.read ? 'read' : ''}
                              size='sm'
                              color='warning'
                            >
                              Read
                            </Checkbox>
                            <Checkbox
                              defaultChecked={item.add}
                              value={item.add ? 'add' : ''}
                              size='sm'
                              color='warning'
                            >
                              Add
                            </Checkbox>
                            <Checkbox
                              defaultChecked={item.edit}
                              value={item.edit ? 'edit' : ''}
                              size='sm'
                              color='warning'
                            >
                              Edit
                            </Checkbox>
                            <Checkbox
                              defaultChecked={item.delete}
                              value={item.delete ? 'delete' : ''}
                              size='sm'
                              color='warning'
                            >
                              Delete
                            </Checkbox>
                          </div>
                        ))}
                      </div>
                    </Collapse>
                  ))}
                </Collapse.Group>
              </Grid>
            </Grid.Container>
          </Modal.Body>
        )}
        <Modal.Footer>
          {!loading && (
            <div className='w-full flex items-center justify-center gap-x-3'>
              <button
                className='h-11 px-12 bg-gray-400 rounded font-medium text-lg shadow-lg hover:bg-opacity-90 transition-all duration-300'
                onClick={closeHandler}
              >
                Cancel
              </button>
              <button className='h-11 px-12 bg-primary rounded font-medium text-lg shadow-lg hover:bg-opacity-90 transition-all duration-300'>
                Save
              </button>
            </div>
          )}
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Profiles
