import { DriverTeam } from '@/interfaces'
import { Divider, Tooltip } from '@nextui-org/react'
import React from 'react'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { AddDriverTeam } from './add-team'
import { DeleteDriverTeam } from './delete-team'
import { useDriversContext } from '@/context/driver'
import { BinIcon } from '@/components/icons/areas'
import { AddMember } from './add-member'

const DriversTeams = () => {
  const { teams } = useDriversContext()

  return (
    <div className='w-full mx-auto flex flex-col items-center gap-y-6'>
      <SearchAccount />
      <div className='w-full flex flex-col items-center gap-y-6'>
        {teams?.map((team: DriverTeam, index: number) => (
          <DriverTeamCard key={index} team={team} />
        ))}
      </div>
      {/* add account button */}
      <AddDriverTeam />
    </div>
  )
}

const DriverTeamCard = ({ team }: { team: DriverTeam }) => {
  const [showInfos, setShowInfos] = React.useState(false)
  const {
    id,
    name,
    fixed,
    maxDistance,
    members,
    additional,
    pricePerKm,
    supervisor,
    areas,
  } = team
  const fields = [
    {
      name: 'Fixed',
      id: 'fixed',
      defaultValue: fixed,
    },
    {
      name: 'Price',
      id: 'pricePerKm',
      defaultValue: pricePerKm,
    },
    {
      name: 'Additional',
      id: 'additional',
      defaultValue: additional,
    },
    {
      name: 'Max Distance',
      id: 'maxDistance',
      defaultValue: maxDistance,
    },
  ]
  const units = [
    {
      name: 'Fixed',
      unit: 'SAR',
    },
    {
      name: 'Price',
      unit: 'SAR / km',
    },
    {
      name: 'Additional',
      unit: 'SAR / km',
    },
    {
      name: 'Max Distance',
      unit: 'km',
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
        <DeleteDriverTeam id={id} />
      </div>
      {showInfos && (
        <>
          <Divider />

          {/* Fixed, Price, ... */}
          <div className='w-full flex flex-col gap-y-3 items-center lg:flex-row'>
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
                    <span className='w-20 text-right text-xs text-gray-500'>
                      {units[index].unit}
                    </span>
                  </div>
                </div>
              </>
            ))}
          </div>
          <Divider />

          {/* Members */}
          <div className='w-full flex items-start gap-x-6'>
            <label className='mt-2 text-gray-600 text-sm'>Members</label>
            {members.length > 0 ? (
              <div className='w-full flex items-start gap-y-2'>
                {members?.map((member: any, index: number) => (
                  <div key={index}>
                    <div className='h-10 w-fit flex items-center gap-x-6 transition-all duration-300 hover:bg-gray-100 px-2 rounded-md'>
                      {/* <label className='text-gray-600 text-sm'>
                        Member #{index + 1}
                      </label> */}
                      <p className='text-sm'>
                        {member.name}{' '}
                        {/* <span className='ml-6 text-sm text-gray-400'>
                          #{member.id}
                        </span> */}
                      </p>
                      <Tooltip
                        content={'Delete "' + member.name + '"'}
                        color='error'
                      >
                        <button>
                          <BinIcon width={4} />
                        </button>
                      </Tooltip>
                      {index < members.length - 1 && (
                        <span className='-ml-4'>,</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className='text-sm'>No memberes found</p>
            )}

            <AddMember members={members} />
          </div>
          <Divider />
          {/* Areas */}
          <div className='w-full flex items-start gap-x-6'>
            <label className='mt-2 text-gray-600 text-sm'>Areas</label>
            {areas.length > 0 ? (
              <div className='w-full flex items-start gap-y-2'>
                {areas?.map((area: any, index: number) => (
                  <div key={index}>
                    <div className='h-10 w-fit flex items-center gap-x-6 transition-all duration-300 hover:bg-gray-100 px-2 rounded-md'>
                      {/* <label className='text-gray-600 text-sm'>
                        Area #{index + 1}
                      </label> */}
                      <p className='text-sm capitalize'>
                        {area}{' '}
                        {/* <span className='ml-6 text-sm text-gray-400'>
                          #{index}
                        </span> */}
                      </p>
                      <Tooltip content={'Delete "' + area + '"'} color='error'>
                        <button>
                          <BinIcon width={4} />
                        </button>
                      </Tooltip>
                      {index < areas.length - 1 && (
                        <span className='-ml-4'>,</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className='text-sm'>No areas found</p>
            )}

            <Tooltip content='Add Area'>
              <button className='h-10 w-16 flex items-center justify-center text-center text-4xl font-medium rounded-full'>
                +
              </button>
            </Tooltip>
          </div>
          <Divider />
          <div className='w-full flex items-center justify-between'>
            <div className='w-1/2 flex items-center gap-x-6'>
              <label className='text-gray-600 text-sm w-32 lg:w-fit'>
                Supervisor
              </label>
              <div className='flex items-center justify-between w-60 bg-gray-200 rounded-md p-2 lg:w-40 xl:w-60'>
                <input
                  name='supervisor'
                  id='supervisor'
                  type='text'
                  value={supervisor.name}
                  onChange={(e) => {
                    console.log(e.target.value)
                  }}
                  className='text-sm bg-transparent w-full outline-none'
                />
              </div>
            </div>

            <div className='w-1/2 flex items-center gap-x-6 text-sm'>
              <label className='text-gray-600'>City</label>
              <p>Abu Dhabi</p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

const SearchAccount = () => {
  return (
    <div className='w-full flex items-center gap-x-6 ml-12'>
      <label className='text-sm'>Select Country</label>
      <input
        name='search'
        id='search'
        type='text'
        className='w-72 bg-white rounded-full px-4 py-2'
        placeholder='Saudi Arabia'
        // onChange={(e) => {
        // handleSearchAccounts(e.target.value)
        // }}
      />
    </div>
  )
}

export default DriversTeams
