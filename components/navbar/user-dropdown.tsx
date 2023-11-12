import { Avatar, Dropdown, Navbar, Text } from '@nextui-org/react'
import React from 'react'
import { signOutUser } from '@/lib/auth'
import { useAuthContext } from '@/context/AuthContext'
import Link from 'next/link'

export const UserDropdown = () => {
  const { user } = useAuthContext() as any

  return (
    <Dropdown placement='bottom-right'>
      <Navbar.Item>
        <Dropdown.Trigger>
          <Avatar bordered as='button' color='secondary' size='md' src='' />
        </Dropdown.Trigger>
      </Navbar.Item>
      <Dropdown.Menu
        aria-label='User menu actions'
        onAction={(actionKey) => console.log({ actionKey })}
      >
        <Dropdown.Item key='profile' css={{ height: '$18' }}>
          <Text b color='inherit' css={{ d: 'flex' }}>
            Signed in as
          </Text>
          <Text b color='inherit' css={{ d: 'flex' }}>
            {user?.email || ''}
          </Text>
        </Dropdown.Item>
        {/* <Dropdown.Item key='settings' withDivider>
          My Settings
        </Dropdown.Item>
        <Dropdown.Item key='team_settings'>Team Settings</Dropdown.Item> */}
        <Dropdown.Item key='orders' withDivider>
          <Link href='/orders'>Orders</Link>
        </Dropdown.Item>
        <Dropdown.Item key='menu'>
          <Link href='/menu'>My Menu</Link>
        </Dropdown.Item>
        <Dropdown.Item key='reports'>
          <Link href='/reports'>My Reports</Link>
        </Dropdown.Item>
        {/* <Dropdown.Item key='help_and_feedback' withDivider>
          Help & Feedback
        </Dropdown.Item> */}
        <Dropdown.Item key='logout' withDivider color='error'>
          <button
            className='border-none outline-none bg-transparent'
            onClick={() => {
              signOutUser()
            }}
          >
            Sign Out
          </button>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}
