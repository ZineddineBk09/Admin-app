import { Text, Loading, Switch } from '@nextui-org/react'
import React from 'react'
import { Flex } from '../../styles/flex'
import { OrdersTable } from '../../table/orders/auto-cancel-orders-table'
import { Team } from '@/interfaces'
import { getRecords } from '@/lib/api'
import { useAutoCancelledOrdersContext } from '@/context/auto-cancelled-orders'

export const OrdersPage = () => {
  const { autoCancelledOrders, loading } = useAutoCancelledOrdersContext()

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
      className='relative w-full bg-white rounded-lg shadow-lg py-6 px-2 overflow-x-auto'
    >
      <div className='w-full h-full bg-red-500 flex items-center justify-between'>
        <SearchAndFilter />
        <AutoCancelSwitch />
      </div>

      {loading ? (
        <Loading size='xl' className='mt-24 -mb-24' color='warning' />
      ) : autoCancelledOrders.length > 0 ? (
        <OrdersTable />
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
          <Text h3>No orders found</Text>
        </Flex>
      )}
    </Flex>
  )
}

const SearchAndFilter = () => {
  const { autoCancelledOrders, handleSearchAutoCancelledOrders } =
    useAutoCancelledOrdersContext()
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
  }, [autoCancelledOrders])

  return (
    <input
      name='search'
      id='search'
      type='text'
      className='bg-gray-200 rounded-lg px-4 py-2'
      placeholder='Search'
      onChange={(e) => handleSearchAutoCancelledOrders(e.target.value)}
    />
  )
}

const AutoCancelSwitch = () => {
  return (
    <Switch
      color='warning'
      onChange={(e) => console.log(e.target.checked)}
    />
  )
}
