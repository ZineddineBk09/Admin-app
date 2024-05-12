import {
  Button,
  Modal,
  Text,
  Loading,
  Tooltip,
  Divider,
  Badge,
} from '@nextui-org/react'
import React from 'react'
import { Flex } from '../../../styles/flex'
import { Driver } from '../../../../interfaces'
import { searchMembers } from '../../../../lib/search'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useDriversContext } from '../../../../context/admin/drivers'
import { calculateDistance } from '../../../../utils'
import { useAutoCancelledOrdersContext } from '../../../../context/admin/auto-cancelled-orders'

export const AssignDriver = ({
  orderLocation,
}: {
  orderLocation: {
    latitude: number
    longitude: number
  }
}) => {
  const { drivers } = useDriversContext()
  const { driverStatusColor } = useAutoCancelledOrdersContext()
  const [visible, setVisible] = React.useState(false)
  const [loading, setLoading] = React.useState<boolean>(false)
  const [search, setSearch] = React.useState('')
  const [searchResults, setSearchResults] = React.useState<Driver[]>(drivers)
  const [selected, setSelected] = React.useState<Driver[]>([])

  const handler = () => setVisible(true)

  const closeHandler = () => setVisible(false)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    if (e.target.value === '') return setSearchResults(drivers)
    setSearchResults(searchMembers(drivers, e.target.value))
  }

  return (
    <div>
      <Tooltip content='' onClick={handler}>
        <button className='px-3 py-2 bg-primary text-gray-700 rounded-lg'>
          Assign to driver
        </button>
      </Tooltip>
      <Modal
        closeButton
        aria-labelledby='modal-title'
        width='700px'
        open={visible}
        onClose={closeHandler}
        className='rounded-md'
      >
        {/* Form */}
        {loading ? (
          <Loading size='xl' className='my-3' color='warning' />
        ) : (
          <>
            <Modal.Header css={{ justifyContent: 'center' }}>
              <Text
                id='modal-title'
                className='text-xl font-semibold capitalize'
                h4
              >
                `Available `Drivers
              </Text>
            </Modal.Header>
            {/* <Divider css={{ my: '$5' }} /> */}
            <Modal.Body css={{ py: '$10' }}>
              <Flex
                direction={'column'}
                css={{
                  flexWrap: 'wrap',
                  gap: '$8',
                  '@lg': { flexWrap: 'nowrap', gap: '$12' },
                }}
              >
                <Flex
                  css={{
                    gap: '$10',
                    flexWrap: 'wrap',
                    '@lg': { flexWrap: 'nowrap' },
                  }}
                >
                  <input
                    name='name'
                    id='name'
                    type='text'
                    placeholder='search'
                    value={search}
                    onChange={handleSearch}
                    className='w-full bg-gray-200 px-4 py-3 rounded-lg'
                  />
                </Flex>

                {/* Selected drivers */}
                <div className='max-w-full h-fit flex items-center gap-x-2 overflow-x-auto'>
                  {selected?.map((driver: any, index: number) => (
                    <Badge key={index}>
                      <span>{driver?.username}</span>
                      <XMarkIcon
                        className='w-4 ml-3 text-white hover:bg-gray-400 transition-all duration-300 rounded-full'
                        onClick={() => {
                          setSelected(
                            selected.filter((item) => item.id !== driver?.id)
                          )

                          // uncheck checkbox by triggering onChange
                          const checkbox = document.getElementById(
                            driver?.id
                          ) as HTMLInputElement
                        }}
                      />
                    </Badge>
                  ))}
                </div>

                {/* Search results */}
                <div className='w-full flex flex-col items-start max-h-64 overflow-y-auto'>
                  {searchResults?.map((driver: Driver, index: number) => (
                    <div className='w-full' key={index}>
                      <div className='w-full flex items-center justify-between'>
                        {/* Username + id */}
                        <div className='flex flex-col items-start gap-y-1'>
                          <span>{driver?.user.username}</span>
                          <span className='text-gray-500'>#{driver?.id}</span>
                        </div>
                        {/* Status */}
                        <span
                          className={`text-xs font-semibold inline-flex px-2 pt-[5px] pb-[2px] rounded-full text-white capitalize ${driverStatusColor(
                            driver.status
                          )}`}
                        >
                          {driver?.status}
                        </span>
                        {/* Distance from order */}
                        <span className='text-xs text-gray-500'>
                          {calculateDistance(
                            0,
                            0,
                            orderLocation?.latitude || 0,
                            orderLocation?.longitude || 0
                          )}{' '}
                          km
                        </span>
                        {/* Select driver */}
                        <input
                          type='checkbox'
                          id={driver?.id as string}
                          className='w-5 h-5 border-gray-400 border rounded-full'
                          checked={selected.includes(driver)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelected([...selected, driver])
                            } else {
                              setSelected(
                                selected.filter(
                                  (item) => item.id !== driver?.id
                                )
                              )
                            }
                          }}
                        />
                      </div>
                      <Divider className='mb-2' />
                    </div>
                  ))}
                </div>
              </Flex>
            </Modal.Body>
            <Modal.Footer>
              <Button
                auto
                type='submit'
                className={`bg-primary text-black ${
                  selected?.length === 0 && 'opacity-50 cursor-not-allowed'
                }`}
                disabled={selected?.length === 0}
              >
                Assign {selected?.length > 0 && `(${selected?.length})`}
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  )
}
