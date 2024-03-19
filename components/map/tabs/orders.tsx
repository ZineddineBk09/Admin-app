import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import {
  BagCheckedIcon,
  BagCrossedIcon,
  BagIcon,
  TrajectoryIcon,
} from '../../icons/orders'
import { Order } from '../../../interfaces'
import { useMapContext } from '../../../context/map'
import { FilterIcon } from '../../icons/map'
import {
  Card,
  Button,
  Loading,
  Modal,
  Text,
  Tooltip,
  Checkbox,
} from '@nextui-org/react'
import { Flex } from '../../../components/styles/flex'

export const Orders = ({ orderStatus }: { orderStatus: any }) => {
  const { filterOrders } = useMapContext()

  return (
    <div className='w-full h-full flex flex-col items-center gap-y-3 overflow-y-auto'>
      {/* Render filter */}
      <OrdersFilter />
      {filterOrders?.map((order: any, index: number) => (
        <OrderCard key={order?.id} order={order} />
      ))}
    </div>
  )
}

const OrderCard = ({ order }: { order: Order }) => {
  const { client, customer, startTime, endTime, status, location, driverName } =
    order
  const driverInitials =
    driverName.split(' ')?.length > 1
      ? driverName.split(' ')[0][0] + driverName.split(' ')[1][0]
      : driverName[0] + driverName[1]
  // status color: green ==> done, yellow ==> assigned, red ==> cancelled, gray ==> new
  const statusColor =
    status === 'done'
      ? '#64EA8A'
      : status === 'assigned'
      ? '#FFDB00'
      : status === 'cancelled'
      ? '#F04646'
      : '#5E5E5E'

  const { handleSelectOrder, selectedOrder } = useMapContext()
  const [selected, setSelected] = useState(false)

  useEffect(() => {
    if (selectedOrder === order?.id) setSelected(true)
    else setSelected(false)
  }, [selectedOrder])

  return (
    <Card
      isPressable
      onClick={() => handleSelectOrder(order?.id)}
      className={`rounded-md ${
        selected
          ? !location
            ? ' bg-red-200 border-[3px] border-red-500'
            : 'bg-primary-light'
          : ''
      }`}
    >
      <Card.Body className='p-0 w-full'>
        <div className={`w-full flex flex-col items-center p-2 gap-y-2`}>
          {/* Restaurant and customer */}
          <div className='w-full flex items-center justify-between'>
            <div className='flex items-center gap-x-2'>
              <Image
                src={client?.image || '/images/logo.png'}
                alt='restaurant'
                objectFit='cover'
                className='rounded-md'
                width={40}
                height={40}
              />
              <p className='text-xs font-medium'>{client?.name}</p>
            </div>
            <div className='flex items-center gap-x-2'>
              <p className='text-xs font-medium'>{customer?.name}</p>
              <Image
                src={customer?.image || '/images/logo.png'}
                alt='customer'
                objectFit='cover'
                className='rounded-md'
                width={40}
                height={40}
              />
            </div>
          </div>

          {/* Duration */}
          <div className='w-full mx-auto flex items-center justify-center gap-x-2'>
            <div className='flex flex-col items-center gap-y-1'>
              <BagIcon color={statusColor} />
              <span className='text-xs font-medium'>
                {new Date(startTime).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>

            <div className='relative'>
              <TrajectoryIcon color={statusColor} />
              {location ? (
                <div className='flex items-center justify-center font-semibold absolute left-[calc(50%-18px)] top-[calc(50%-18px)] bg-gray-300 rounded-full w-9 h-9 z-10 uppercase'>
                  <Tooltip content={driverName}>{driverInitials}</Tooltip>
                </div>
              ) : (
                <span className='absolute -bottom-6 left-[35%] mx-auto text-sm font-medium text-center'>
                  No location
                </span>
              )}
            </div>

            <div className='flex flex-col items-center gap-y-1'>
              {
                //@ts-ignore
                {
                  done: <BagCheckedIcon color={statusColor} />,
                  assigned: <BagCheckedIcon />,
                  cancelled: <BagCrossedIcon />,
                  new: <BagCheckedIcon />,
                }[status]
              }
              <span className='text-xs font-medium'>
                {new Date(endTime).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  )
}

const OrdersFilter = () => {
  const { handleFilterOrders } = useMapContext()
  const [visible, setVisible] = React.useState(false)
  const [selected, setSelected] = useState<string[]>([])
  const handler = () => setVisible(true)

  const status = [
    { value: 'assigned', checked: true },
    { value: 'cancelled', checked: true },
    { value: 'new', checked: true },
    { value: 'done', checked: true },
  ]

  const closeHandler = () => setVisible(false)
  return (
    <>
      <button
        onClick={handler}
        className='flex items-center py-[6px] px-3 mb-2 rounded-full gap-x-16 bg-white shadow-lg text-sm ml-auto hover:bg-gray-100 transition-all duration-300'
      >
        <span>Filter</span> <FilterIcon />
      </button>

      <Modal
        closeButton
        aria-labelledby='modal-title'
        width='500px'
        open={visible}
        onClose={closeHandler}
        className='rounded-md'
      >
        <Modal.Header>
          <Text id='modal-title' className='text-xl font-semibold uppercase' h4>
            Filters
          </Text>
        </Modal.Header>

        <Modal.Body>
          <Flex
            direction='column'
            css={{
              flexWrap: 'wrap',
              gap: '$6',
              '@lg': { flexWrap: 'nowrap', gap: '$12' },
            }}
          >
            <Checkbox.Group
              label='Select one or more status to filter orders'
              color='warning'
              value={selected}
              onChange={(e: string[]) => setSelected(e)}
            >
              {status.map((s, index) => (
                <div className='w-full flex items-center gap-x-2' key={index}>
                  <BagIcon
                    color={
                      s.value === 'done'
                        ? '#64EA8A'
                        : s.value === 'assigned'
                        ? '#FFDB00'
                        : s.value === 'cancelled'
                        ? '#F04646'
                        : '#5E5E5E'
                    }
                  />
                  <p className='text-sm font-medium capitalize'>{s.value}</p>
                  <Checkbox value={s.value} className='ml-auto' />
                </div>
              ))}
            </Checkbox.Group>
          </Flex>
        </Modal.Body>
        <Modal.Footer>
          <Flex justify={'end'}>
            <Button
              auto
              className='bg-primary'
              onClick={() => {
                handleFilterOrders(selected)
                closeHandler()
              }}
            >
              Filter
            </Button>
          </Flex>
        </Modal.Footer>
      </Modal>
    </>
  )
}
