import { Col, Row } from '@nextui-org/react'
import React from 'react'
import { CancelOrder } from '../../../admin/orders/list/cancel-order'
import { EditOrder } from '../../../admin/orders/list/edit-order'
import { Order } from '../../../../interfaces'
import { AddNotes } from '../../../admin/orders/list/add-notes'
import { CheckedIcon } from '../../../icons/table'
import { XMarkIcon } from '@heroicons/react/24/outline'

interface Props {
  order: Order
  columnKey: string | React.Key
}

export const RenderCell = ({ order, columnKey }: Props) => {
  // @ts-ignore
  const cellValue = order[columnKey]

  if (!order) return null

  switch (columnKey) {
    case 'id':
      return <p>#{order.id}</p>

    case 'client':
      return <p>{order?.client.account.name}</p>

    case 'branch':
      return (
        <p>
          {order?.client.account.name + '-' + order?.client.address.city.name}
        </p>
      )

    case 'driver':
      return <p>{order?.currently_assigned_driver?.user.username}</p>

    case 'value':
      return (
        <p>
          {order.total_order_value}
          <small className='ml-1 text-xs text-gray-400'>SAR</small>
        </p>
      )

    // case 'delivery_fee':
    //   return (
    //     <p>
    //       {order.delivery}
    //       <small className='ml-1 text-xs text-gray-400'>SAR</small>
    //     </p>
    //   )

    case 'distance':
      return (
        <p>
          {order?.distance || 0}
          <small className='ml-1 text-xs text-gray-400'>KM</small>
        </p>
      )

    // case 'client_paid':
    //   // return a checkbox
    //   if (order.client_is_paid_at)
    //     return (
    //       <div className='w-6 h-6 flex items-center justify-center p-1 border-[3px] border-primary rounded-full'>
    //         <CheckedIcon />
    //       </div>
    //     )
    //   return (
    //     <div className='w-6 h-6 flex items-center justify-center p-1 border-[3px] border-red-500 rounded-full'>
    //       <XMarkIcon />
    //     </div>
    //   )

    // case 'driver_paid':
    //   if (order.paid_driver)
    //     return (
    //       <div className='w-6 h-6 flex items-center justify-center p-1 border-[3px] border-primary rounded-full'>
    //         <CheckedIcon />
    //       </div>
    //     )
    //   return (
    //     <div className='w-6 h-6 flex items-center justify-center p-1 border-[3px] border-red-500 rounded-full'>
    //       <XMarkIcon />
    //     </div>
    //   )

    case 'payment_type':
      return (
        <p className='capitalize text-black font-medium'>
          {order.payment_type}
        </p>
      )

    case 'city':
      return (
        <p className='capitalize text-black font-medium'>
          {order.delivery_address.city.name}
        </p>
      )

    case 'driver':
      return (
        <p className='capitalize text-black font-medium'>
          {order?.currently_assigned_driver?.user.username}
        </p>
      )

    case 'time':
      // the substraction of : delivered_at from reached_client_at
      return (
        <p className='capitalize text-black font-medium'>
          {new Date(
            new Date(order.delivered_at).getTime() -
              new Date(order.reached_client_at).getTime()
          ).getMinutes() + ' min'}
        </p>
      )

    case 'date':
      return (
        <p className='capitalize text-black font-medium'>
          {new Date(order.added_at).toLocaleDateString()}
        </p>
      )

    case 'status':
      return (
        <span
          className={`text-xs font-semibold inline-flex px-2 pt-1 pb-[2px] rounded-full text-white capitalize ${
            order.status === 'new'
              ? 'bg-blue-400'
              : order.status === 'searching'
              ? 'bg-yellow-400 !text-black'
              : order.status === 'prompting_driver'
              ? 'bg-yellow-400 !text-black'
              : order.status === 'assigned'
              ? 'bg-yellow-400 !text-black'
              : order.status === 'failed'
              ? 'bg-red-400'
              : order.status === 'order_failed'
              ? 'bg-red-400'
              : order.status === 'client_reached'
              ? 'bg-yellow-400 !text-black'
              : order.status === 'transitioning'
              ? 'bg-yellow-400 !text-black'
              : order.status === 'delivering'
              ? 'bg-yellow-400 !text-black'
              : order.status === 'driver_reached'
              ? 'bg-yellow-400 !text-black'
              : order.status === 'customer_reached'
              ? 'bg-yellow-400 !text-black'
              : order.status === 'paid'
              ? 'bg-green-400'
              : order.status === 'settled'
              ? 'bg-green-400'
              : order.status === 'cancelled'
              ? 'bg-red-400'
              : order.status === 'acquired'
              ? 'bg-green-400'
              : order.status === 'deposited'
              ? 'bg-green-400'
              : 'bg-red-400'
          }`}
        >
          {order.status}
        </span>
      )

    case 'actions':
      return (
        <Row
          justify='center'
          align='center'
          css={{ gap: '$8', '@md': { gap: 3 } }}
        >
          <Col css={{ d: 'flex' }}>
            <EditOrder order={order} />
          </Col>
          <Col css={{ d: 'flex' }}>
            <AddNotes order={order} />
          </Col>
          <Col css={{ d: 'flex' }}>
            <CancelOrder id={order?.id} />
          </Col>
        </Row>
      )
    default:
      return <p className='text-gray-600 text-sm'>{cellValue}</p>
  }
}
