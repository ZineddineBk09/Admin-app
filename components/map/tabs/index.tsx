import React from 'react'
import { useMapContext } from '../../../context/map'
import { Orders } from './orders'
import { Drivers } from './drivers'

const Lists = () => {
  const { showOrders } = useMapContext()

  if (!showOrders) return null
  return (
    <div className='w-full flex flex-col mx-auto'>
      <Tabs />
    </div>
  )
}

const Tabs = ({ color }: any) => {
  // driver status: 'active' | 'inactive' | 'PickingUp' | 'delivering' | 'waiting'
  const orderStatus = [
    { value: 'assigned', checked: true },
    { value: 'cancelled', checked: true },
    { value: 'new', checked: true },
    { value: 'done', checked: true },
  ]
  
  const { openTab, hansleSelectTab } = useMapContext()

  return (
    <>
      <div className='flex flex-wrap bg-transparent'>
        <div className='w-full'>
          <ul className='flex list-none flex-wrap pb-3 flex-row' role='tablist'>
            <li className='flex-auto text-center'>
              <a
                className={
                  'text-sm font-bold uppercase px-4 py-3 shadow-lg rounded-l-xl block leading-normal ' +
                  (openTab === 1
                    ? ' bg-primary'
                    : 'text-' + color + '-600 bg-white')
                }
                onClick={(e) => {
                  e.preventDefault()
                  hansleSelectTab(1)
                }}
                data-toggle='tab'
                href='#link1'
                role='tablist'
              >
                Orders
              </a>
            </li>
            <li className='flex-auto text-center'>
              <a
                className={
                  'text-sm font-bold uppercase px-4 py-3 shadow-lg rounded-r-xl block leading-normal ' +
                  (openTab === 2
                    ? 'bg-primary'
                    : 'text-' + color + '-600 bg-white')
                }
                onClick={(e) => {
                  e.preventDefault()
                  hansleSelectTab(2)
                }}
                data-toggle='tab'
                href='#link2'
                role='tablist'
              >
                Drivers
              </a>
            </li>
          </ul>
          <div>
            <div>
              <div className={openTab === 1 ? 'block' : 'hidden'} id='link1'>
                <Orders orderStatus={orderStatus} />
              </div>
              <div className={openTab === 2 ? 'block' : 'hidden'} id='link2'>
                <Drivers />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Lists
