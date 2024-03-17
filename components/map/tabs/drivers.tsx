import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Driver } from '../../../interfaces'
import { Card } from '@nextui-org/react'
import { useMapContext } from '../../../context/map'
import { DriverInboxIcon, DriverOrdersIcon } from '../../icons/drivers'
import { truncateTxt } from '../../../utils'

export const Drivers = ({ driverStatus }: { driverStatus: any }) => {
  const { drivers } = useMapContext()

  return (
    <div className='w-full h-full flex flex-col items-center gap-y-3 overflow-y-auto px-2'>
      {drivers
        ?.slice(0, drivers?.length / 2)
        ?.filter((dr: any) =>
          driverStatus.some(
            (status: any) => status.value === dr.status && status.checked
          )
        )
        ?.map((driver: any, index: number) => (
          <DriverCard key={driver?.id} driver={driver} />
        ))}
    </div>
  )
}

const DriverCard = ({ driver }: { driver: any }) => {
  const { username, image, status, orders } = driver
  const { handleSelectDriver, selectedDriver } = useMapContext()
  const [selected, setSelected] = useState(false)

  useEffect(() => {
    if (selectedDriver === driver?.id) setSelected(true)
    else setSelected(false)
  }, [selectedDriver])

  return (
    <Card
      isPressable
      isHoverable
      className='p-0 rounded-l-full overflow-hidden rounded-r-md'
      onClick={() => handleSelectDriver(driver?.id)}
    >
      <Card.Body className='p-0 w-full overflow-hidden'>
        <div
          className={`h-20 w-full ml-auto flex items-center gap-x-5 p-2 rounded-l-full  ${
            selected ? 'bg-primary-light' : ''
          }`}
        >
          {/* Image */}
          <Image
            src={image}
            alt='Driver Image'
            objectFit='cover'
            width={95}
            height={90}
            className='rounded-full m-auto'
          />

          {/* Infos */}
          <div className='h-full w-full flex flex-col text-gray-500'>
            <p className='text-sm'>{truncateTxt(username, 25)}</p>
            <div className='w-full flex items-center justify-between'>
              <div className='flex items-end gap-x-1'>
                <DriverOrdersIcon />
                <small>{orders}</small>
              </div>

              <DriverInboxIcon />
            </div>

            <div className='w-full flex items-center justify-between'>
              <div />
              <p className='mt-1 text-black font-medium tracking-wide'>
                {
                  <span
                    className={`py-1 px-3 rounded-full text-xs ${
                      status === 'Available'
                        ? 'bg-green-400'
                        : status === 'Busy'
                        ? 'bg-orange-500'
                        : 'bg-gray-400'
                    }`}
                  >
                    {status}
                  </span>
                }
              </p>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  )
}
