import { Text, Loading } from '@nextui-org/react'
import React from 'react'
import { Flex } from '../styles/flex'
import { DriversTable } from '../table/drivers-table'
import { AddDriver } from './add-driver'
import { useDriversContext } from '@/context/driver/DriversContext'
import { Driver } from '@/interfaces'

export const DriversPage = () => {
  const { drivers, loading } = useDriversContext()

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
      ) : drivers.length > 0 ? (
        <DriversTable />
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
  const { drivers, handleSearchDrivers, handleSelectTeam, handleSelectStatus } =
    useDriversContext()
  // get unique teams
  const teams: string[] = Array.from(
    new Set(drivers.map((driver: Driver) => driver.team))
  ).sort() as string[]

  return (
    <div className='w-full grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 px-6'>
      {/* Date */}
      <div className='h-10 bg-white rounded-full px-4'>
        <select name='date' id='date' className='w-full h-full bg-transparent '>
          <option
            value={new Date().toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          >
            {new Date().toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </option>
        </select>
      </div>

      {/* Team */}
      <div className='h-10 bg-white rounded-full px-4'>
        <select
          name='team'
          id='team'
          className='w-full h-full bg-transparent'
          onChange={(e) => handleSelectTeam(e.target.value)}
        >
          <option value=''>Select Team</option>
          {teams.map((team: string, index: number) => (
            <option key={index} value={team}>
              {team}
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
          onChange={(e) => handleSelectStatus(e.target.value)}
        >
          <option value=''>Select Driver State</option>
          <option value='Available'>Available</option>
          <option value='Busy'>Busy</option>
          <option value='Inactive'>Inactive</option>
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
