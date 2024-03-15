import { Col, Row } from '@nextui-org/react'
import React from 'react'
import { CancelOrder } from '../../orders/auto-cancel/cancel-order'
import { AutoCancelledOrder } from '../../../interfaces'
import { renderBigNums } from '../../../utils'
import { AssignDriver } from '../../../components/orders/auto-cancel/assign-driver'
import { AddBonus } from '../../../components/orders/auto-cancel/add-bonus'

interface Props {
  order: AutoCancelledOrder
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
      return <p>{order?.client.name}</p>

    case 'value':
      return (
        <p>
          {renderBigNums(cellValue)}
          <small className='ml-1 text-xs text-gray-400'>SAR</small>
        </p>
      )

    case 'deliveryFee':
      return (
        <p>
          {renderBigNums(cellValue)}
          <small className='ml-1 text-xs text-gray-400'>SAR</small>
        </p>
      )

    case 'timeLeft':
      return (
        <p>
          {renderBigNums(cellValue)}
          <small className='ml-1 text-xs text-gray-400'>
            {cellValue === 1 ? 'Minute' : 'Minutes'}
          </small>
        </p>
      )

    case 'distance':
      return (
        <p>
          {renderBigNums(cellValue)}
          <small className='ml-1 text-xs text-gray-400'>KM</small>
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

    // add column with button to assign order to driver
    case 'assign':
      return (
        <AssignDriver
          orderLocation={
            order?.location as {
              latitude: number
              longitude: number
            }
          }
        />
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
        <p className='capitalize text-black font-medium'>{cellValue}</p>
      )

    case 'bonus':
      return <AddBonus order={order} />

    case 'actions':
      return (
        <Row
          justify='center'
          align='center'
          css={{ gap: '$8', '@md': { gap: 3 } }}
        >
          <Col css={{ d: 'flex' }}>
            <CancelOrder id={order?.id} />
          </Col>
        </Row>
      )
    default:
      return <p className='text-gray-600 text-sm'>{cellValue}</p>
  }
}
