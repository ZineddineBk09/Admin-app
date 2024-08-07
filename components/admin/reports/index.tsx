import { Loading, Text, Tooltip } from '@nextui-org/react'
import React from 'react'
import { Flex } from '../../styles/flex'
import { ReportsTable } from '../../table/admin/reports/reports-table'
import { PrintIcon } from '../../icons/table'
import { exportToExcel } from '../../../utils'
import { useReportsContext } from '../../../context/admin/reports'

export const ReportsPage = () => {
  const [openTab, setOpenTab] = React.useState(1)
  const tabs = ['Orders', 'Clients', 'Drivers', 'Areas', 'Customers', 'Teams']
  const { reports } = useReportsContext()
  const loading = false

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
      <div className='w-full grid grid-cols-5 grid-rows-2 gap-x-3'>
        <div className='w-full h-full col-span-3 row-span-2'>
          <div className='col-span-3 row-span-1 mb-3'>
            <SearchAndFilter />
          </div>

          <div className='col-span-3 row-span-1 lg:col-span-3 hidden lg:block'>
            <Tabs tabs={tabs} openTab={openTab} setOpenTab={setOpenTab} />
          </div>
        </div>

        <div className='col-span-2 row-span-2 lg:row-span-2 lg:col-span-1  mb-3'>
          <Royalties />
        </div>

        <div className='col-span-5 row-span-1 lg:hidden'>
          <Tabs tabs={tabs} openTab={openTab} setOpenTab={setOpenTab} />
        </div>

        <div className='w-full col-span-5 row-span-2 flex items-center gap-x-5 mt-6 lg:flex-col lg:items-end lg:col-span-1'>
          <div className='w-full col-span-1 row-span-1 h-12 flex items-center gap-x-4 bg-gray-200 rounded px-4 relative lg:ml-auto'>
            <input
              type='text'
              name='dateTo'
              id='dateTo'
              className='w-full h-full bg-transparent'
              placeholder='Select Client'
            />
          </div>
          <Tooltip content='Export'>
            <button
              className='flex items-center gap-x-2 ml-auto col-span-1 row-span-1 lg:mt-6'
              onClick={() =>
                exportToExcel({
                  name:
                    'FleetRun_Reports_' +
                    tabs[openTab] +
                    '_' +
                    new Date().toLocaleDateString(),
                  data: reports,
                })
              }
            >
              <span>Print</span>
              <PrintIcon />
            </button>
          </Tooltip>
        </div>
      </div>

      {loading ? (
        <Loading size='xl' className='mt-24 -mb-24'  />
      ) : reports?.length > 0 ? (
        <ReportsTable />
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
          <Text h3>No reports found</Text>
        </Flex>
      )}
    </Flex>
  )
}

export const SearchAndFilter = () => {
  return (
    <div className='w-full grid grid-cols-1 gap-6 lg:grid-cols-3'>
      {/* Search */}
      <input
        name='search'
        id='search'
        type='text'
        className='bg-gray-200 rounded-full px-4 py-2'
        placeholder='Search'
        // onChange={(e) => handleSearchOrders(e.target.value)}
      />

      {/* Date From */}

      <div className='h-10 flex items-center gap-x-4 bg-gray-200 rounded px-4 relative lg:ml-auto lg:max-w-xs'>
        <span className='text-gray-400'>Date From</span>
        <input
          type='date'
          name='dateFrom'
          id='dateFrom'
          className='w-fit h-full bg-transparent'
        />
      </div>
      {/* Date To */}
      <div className='h-10 flex items-center gap-x-4 bg-gray-200 rounded px-4 relative lg:ml-auto lg:max-w-xs'>
        <span className='text-gray-400'>Date To</span>
        <input
          type='date'
          name='dateTo'
          id='dateTo'
          className='w-fit h-full bg-transparent'
        />
      </div>
    </div>
  )
}

const Tabs = ({
  tabs = ['Orders', 'Clients', 'Drivers', 'Areas', 'Customers', 'Teams'],
  openTab,
  setOpenTab,
}: {
  tabs?: string[]
  openTab: number
  setOpenTab: React.Dispatch<React.SetStateAction<number>>
}) => {
  return (
    <ul className='flex -mb-3 list-none flex-wrap flex-row' role='tablist'>
      {tabs?.map((tab: any, index: number) => (
        <li className='flex-auto text-center' key={index}>
          <a
            className={
              'text-sm font-bold uppercase px-4 py-4 block leading-normal ' +
              (openTab === index ? 'bg-primary' : 'bg-gray-200') +
              (index === 0 ? ' rounded-l-xl' : '') +
              (index === tabs?.length - 1 ? ' rounded-r-xl' : '')
            }
            onClick={(e) => {
              e.preventDefault()
              setOpenTab(index)
            }}
            data-toggle='tab'
            href='#link2'
            role='tablist'
          >
            {tab}
          </a>
        </li>
      ))}
    </ul>
  )
}

const Royalties = () => {
  return (
    <div className='w-full h-full flex flex-col items-start justify-between rounded-lg p-4 bg-primary'>
      <p className='text-gray-600 text-sm'>Unpaid Royalties</p>
      <h1 className='text-4xl font-bold'>
        12450.00 <small className='text-xs text-gray-400'>SAR</small>
      </h1>
    </div>
  )
}
