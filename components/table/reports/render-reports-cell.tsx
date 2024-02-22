import React from 'react'
import { Order } from '../../../interfaces'
import { MakePayment } from '../../reports/payment'

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

    case 'unpaid':
      return (
        <p className='text-red-500'>
          {cellValue}
          <small className='ml-1 text-xs text-gray-400'>SAR</small>
        </p>
      )

    case 'paid':
      return (
        <p>
          {cellValue}
          <small className='ml-1 text-xs text-gray-400'>SAR</small>
        </p>
      )

    case 'branches':
      return <p className='text-gray-600 text-sm'>{cellValue.join(', ')}</p>

    case 'areas':
      return <p className='text-gray-600 text-sm'>{cellValue.join(', ')}</p>

    case 'countries':
      return <p className='text-gray-600 text-sm'>{cellValue.join(', ')}</p>

    case 'actions':
      return <MakePayment id={1} />
    default:
      return <p className='text-gray-600 text-sm'>{cellValue}</p>
  }
}
