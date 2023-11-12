import { Col, Row, User } from '@nextui-org/react'
import React from 'react'
import { DeleteDriver } from '../drivers/delete-driver'
import { EditDriver } from '../drivers/edit-driver'
import { Driver } from '@/interfaces'

interface Props {
  driver: Driver | any
  columnKey: string | React.Key
}

export const RenderCell = ({ driver, columnKey }: Props) => {
  if (!driver) return null
  // @ts-ignore
  const cellValue = driver[columnKey]

  switch (columnKey) {
    case 'name':
      return (
        <User squared src={driver.image} name={driver.fullName} css={{ p: 0 }}>
          #{driver.id}
        </User>
      )

    case 'status':
      return (
        <span
          className={`text-xs font-semibold inline-flex px-2 py-1 rounded-full text-white ${
            cellValue === 'Available'
              ? 'bg-green-400'
              : cellValue === 'Busy'
              ? 'bg-orange-500'
              : 'bg-gray-400'
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
            <EditDriver driver={driver} />
          </Col>
          <Col css={{ d: 'flex' }}>
            <DeleteDriver id={driver.id} />
          </Col>
        </Row>
      )
    default:
      return <p className='text-gray-600 text-sm'>{cellValue}</p>
  }
}
