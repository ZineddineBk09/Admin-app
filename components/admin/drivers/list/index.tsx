import { Text, Loading } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { Flex } from '../../../styles/flex'
import { AddDriver } from './add-driver'
import { useDriversContext } from '../../../../context/admin/drivers'
import { Driver, Sort, Team } from '../../../../interfaces'
import { DriverCard } from './driver/card'
import { useTeamsContext } from '../../../../context/admin/drivers/teams'

export const DriversPage = () => {
  const { drivers, handleSortDrivers, loading } = useDriversContext()
  const [sorting, setSorting] = useState<Sort>({ column: '', direction: '' })

  useEffect(() => {
    if (sorting.column === '') return
    handleSortDrivers(sorting)
  }, [sorting])

  return (
    <Flex
      css={{
        mt: '$5',
        '@sm': {
          mt: '$10',
        },
        gap: '$6',
      }}
      justify={'center'}
      direction={'column'}
      className='w-full'
    >
      <div className='w-full flex justify-between px-6'>
        <h1 className='font-semibold text-2xl'>Drivers</h1>
        <AddDriver />
      </div>

      <SearchAndFilter />

      {loading ? (
        <Loading size='xl' className='mt-24 -mb-24' color='warning' />
      ) : drivers?.length > 0 ? (
        <div className='w-full mx-auto flex flex-col items-center gap-y-6'>
          <div className='w-full flex flex-col items-center gap-y-6'>
            {drivers?.map((driver: Driver, index: number) => (
              <DriverCard key={driver?.id || index} driver={driver} />
            ))}
          </div>
        </div>
      ) : (
        <Flex
          css={{
            gap: '$6',
            mt: '$6',
            '@sm': { mt: '$10' },
          }}
          direction={'column'}
          align={'center'}
        >
          <Text h3>No drivers found</Text>
        </Flex>
      )}
    </Flex>
  )
}

export const SearchAndFilter = () => {
  const {
    handleSearchDrivers,
    handleSelectTeam,
    handleSelectStatus,
    filters,
    setFilters,
  } = useDriversContext()
  // get unique teams
  const { teams } = useTeamsContext()

  return (
    <div className='w-full grid grid-cols-1 gap-6 lg:grid-cols-3 px-6'>
      {/* Team */}
      <div className='h-10 bg-white rounded-full px-4'>
        <select
          name='team'
          id='team'
          className='w-full h-full bg-transparent'
          onChange={(e) => {
            setFilters({
              ...filters,
              team: e.target.value,
            })
            handleSelectTeam(e.target.value)
          }}
        >
          <option value='all'>Select Team All</option>
          {teams?.map((team: Team, index: number) => (
            <option key={team.id} value={team?.name}>
              {team?.name}
            </option>
          ))}
        </select>
      </div>

      {/* Driver State */}
      <div className='h-10 bg-white rounded-full px-4'>
        <select
          name='driverStatus'
          id='driverStatus'
          className='w-full h-full bg-transparent'
          onChange={(e) => {
            setFilters({
              ...filters,
              status: e.target.value,
            })
            handleSelectStatus(e.target.value)
          }}
        >
          <option value='all'>Select Status (All)</option>
          <option value='active'>Active</option>
          <option value='inactive'>Inactive</option>
        </select>
      </div>

      {/* Search */}
      <input
        name='search'
        id='search'
        type='text'
        className='bg-white rounded-full px-4 py-2'
        placeholder='Search'
        onChange={(e) => handleSearchDrivers(e.target.value)}
      />
    </div>
  )
}
