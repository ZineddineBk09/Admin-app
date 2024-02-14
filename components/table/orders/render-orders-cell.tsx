import { Col, Row } from '@nextui-org/react'
import React from 'react'
import { CancelOrder } from '../../orders/list/cancel-order'
import { EditOrder } from '../../orders/list/edit-order'
import { Order } from '../../../interfaces'
import { AddNotes } from '../../orders/list/add-notes'
import { CheckedIcon } from '../../icons/table'
import Image from 'next/image'

interface Props {
  order: Order
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
      return <p>{order.client.name}</p>

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

    case 'clientPaid':
      // return a checkbox
      return (
        // <Checkbox
        //   aria-label='Checkbox-driver-status'
        //   color='warning'
        //   labelColor='warning'
        //   defaultSelected={order.isPaid}
        //   //value={order.isPaid}
        //   onChange={() => {}}
        //   size='md'
        // ></Checkbox>
        <div className='w-6 h-6 flex items-center justify-center p-1 border-[3px] border-primary rounded-full'>
          <CheckedIcon />
        </div>
      )

    case 'driverPaid':
      return (
        <div className='w-6 h-6 flex items-center justify-center p-1 border-[3px] border-primary rounded-full'>
          <CheckedIcon />
        </div>
      )

    case 'paymentType':
      // return an icon: cash, visa, mastercard
      return (
        // <Image
        //   src={`/images/icons/${cellValue}.png`}
        //   width={cellValue === 'visa' ? 30 : 24}
        //   height={24}
        //   alt={cellValue}
        //   className='w-full mx-auto'
        // />
        <p className='capitalize text-black font-medium'>
          {cellValue}
        </p>
      )

    case 'status':
      return (
        <span
          className={`text-xs font-semibold inline-flex px-2 pt-1 pb-[2px] rounded-full text-white capitalize ${
            cellValue === 'done'
              ? 'bg-green-400'
              : cellValue === 'assigned'
              ? 'bg-yellow-400'
              : cellValue === 'new'
              ? 'bg-blue-400'
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
          css={{ gap: '$8', '@md': { gap: 3 } }}
        >
          <Col css={{ d: 'flex' }}>
            <EditOrder order={order} />
          </Col>
          <Col css={{ d: 'flex' }}>
            <AddNotes order={order} />
          </Col>
          <Col css={{ d: 'flex' }}>
            <CancelOrder id={order.id} />
          </Col>
        </Row>
      )
    default:
      return <p className='text-gray-600 text-sm'>{cellValue}</p>
  }
}
