import { Text, Loading } from '@nextui-org/react'
import React from 'react'
import { Flex } from '../../styles/flex'
import { DriversTable } from '../../table/drivers/drivers-table'
import { AddDriver } from './add-driver'
import { useDriversContext } from '../../../context/drivers'
import { Team } from '../../../interfaces'
import { getRecords } from '../../../lib/api'

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
      ) : drivers?.length > 0 ? (
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
  const [teams, setTeams] = React.useState<Team[]>([])

  React.useEffect(() => {
    const fetchTeams = async () => {
      await getRecords('team')
        .then((res: { teams: Team[] }) => setTeams(res.teams))
        .catch((err: any) => {
          setTeams([])
          console.log('Error in fetching teams: ', err)
        })
    }
    fetchTeams()
  }, [drivers])

  return (
    <div className='w-full grid grid-cols-1 gap-6 lg:grid-cols-3 px-6'>
      {/* Team */}
      <div className='h-10 bg-white rounded-full px-4'>
        <select
          name='team'
          id='team'
          className='w-full h-full bg-transparent'
          onChange={(e) => handleSelectTeam(e.target.value)}
        >
          <option value=''>Select Team All</option>
          {teams?.map((team: Team, index: number) => (
            <option key={index} value={team?.id}>
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
          onChange={(e) => handleSelectStatus(e.target.value)}
        >
          <option value=''>Select Status (All)</option>
          <option value='available'>Available</option>
          <option value='busy'>Busy</option>
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
