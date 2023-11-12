import { Navbar } from '@nextui-org/react'
import React from 'react'
import { Box } from '../styles/box'
import { BurguerButton } from './burguer-button'
import { DriversIcon, BagIcon } from '../icons/navbar'
import { useMapContext } from '@/context/MapContext'
import { useRouter } from 'next/router'

interface Props {
  children: React.ReactNode
}

export const NavbarWrapper = ({ children }: Props) => {
  const { showDrivers, showOrders, handleToggleDrivers, handleToggleOrders } =
    useMapContext()
  const path = useRouter().pathname.split('/')[1]
  const isDashboard = path === 'dashboard'

  return (
    <Box
      css={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        flex: '1 1 auto',
        overflowY: 'auto',
        overflowX: 'hidden',
        bg: 'transparent',
        paddingRight: '10px',
      }}
    >
      <Navbar
        css={{
          backgroundColor: 'gray',
          shadow: 'none',
          justifyContent: 'space-between',
          width: '100%',
          '@md': {
            justifyContent: 'space-between',
          },

          '& .nextui-navbar-container': {
            border: 'none',
            maxWidth: '100%',

            gap: '$6',
            '@md': {
              justifyContent: 'space-between',
            },
          },
        }}
      >
        <Navbar.Content>
          <BurguerButton />
        </Navbar.Content>
        {isDashboard && (
          <div className='w-fit flex items-center gap-x-5'>
            <button onClick={handleToggleDrivers}>
              <DriversIcon isActive={showDrivers} />
            </button>
            <button onClick={handleToggleOrders}>
              <BagIcon isActive={showOrders} />
            </button>
          </div>
        )}
      </Navbar>
      {children}
    </Box>
  )
}
