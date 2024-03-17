import { Navbar } from '@nextui-org/react'
import React from 'react'
import { Box } from '../styles/box'
import { BurguerButton } from './burguer-button'

interface Props {
  children: React.ReactNode
}

export const NavbarWrapper = ({ children }: Props) => {
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
          shadow: 'none',
          justifyContent: 'space-between',
          width: '100%',
          bgColor: 'gray',
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
      </Navbar>
      {children}
    </Box>
  )
}
