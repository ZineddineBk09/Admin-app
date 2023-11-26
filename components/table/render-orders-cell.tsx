import { Checkbox, Col, Row, User } from '@nextui-org/react'
import React from 'react'
import { DeleteOrder } from '../orders/delete-order'
import { EditOrder } from '../orders/edit-order'
import { Order } from '@/interfaces'

interface Props {
  order: Order | any
  columnKey: string | React.Key
}

export const RenderCell = ({ order, columnKey }: Props) => {
  if (!order) return null
  // @ts-ignore
  const cellValue = order[columnKey]

  switch (columnKey) {
    case 'id':
      return <p>#{cellValue}</p>

    case 'client':
      return <p>{order.clientName}</p>

    case 'driver':
      return <p>{order.driverName}</p>

    case 'value':
      return (
        <p>
          {cellValue}
          <small className='ml-1 text-xs text-gray-400'>SAR</small>
        </p>
      )

    case 'deliveryFee':
      return (
        <p>
          {cellValue}
          <small className='ml-1 text-xs text-gray-400'>SAR</small>
        </p>
      )

    case 'distance':
      return (
        <p>
          {cellValue}
          <small className='ml-1 text-xs text-gray-400'>KM</small>
        </p>
      )

    case 'isPaid':
      // return a checkbox
      return (
        <Checkbox
          aria-label='Checkbox-driver-status'
          color='warning'
          labelColor='warning'
          defaultSelected={order.isPaid}
          //value={order.isPaid}
          onChange={() => {}}
          size='md'
        ></Checkbox>
      )

    case 'status':
      return (
        <span
          className={`text-xs font-semibold inline-flex px-2 py-1 rounded-full text-white capitalize ${
            cellValue === 'done'
              ? 'bg-green-400'
              : cellValue === 'delivering'
              ? 'bg-yellow-400'
              : 'bg-red-400'
          }`}
        >
          {cellValue}
        </span>
      )

    case 'actions':
      return (
        <Row
          justify='center'
          align='center'
          css={{ gap: '$8', '@md': { gap: 0 } }}
        >
          <Col css={{ d: 'flex' }}>
            <EditOrder order={order} />
          </Col>
          <Col css={{ d: 'flex' }}>
            <DeleteOrder id={order.id} />
          </Col>
        </Row>
      )
    default:
      return <p className='text-gray-600 text-sm'>{cellValue}</p>
  }
}
