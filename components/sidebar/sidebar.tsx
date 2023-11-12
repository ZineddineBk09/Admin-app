import React from 'react'
import { Box } from '../styles/box'
import { Sidebar } from './sidebar.styles'
import { Flex } from '../styles/flex'
import { SidebarItem } from './sidebar-item'
import { useSidebarContext } from '../layout/layout-context'
import { useRouter } from 'next/router'
import {
  LogoutIcon,
  SettingsIcon,
  ClientsIcon,
  DriversIcon,
  CustomersIcon,
  AreasIcon,
  PricingIcon,
  MapIcon,
} from '../icons/sidebar'
import { Text } from '@nextui-org/react'
import { signOutUser } from '@/lib/auth'
import Image from 'next/image'
import { CollapseItems } from './collapse-items'

export const SidebarWrapper = () => {
  const router = useRouter()
  const { collapsed, setCollapsed } = useSidebarContext()
  const sidebarLinks = [
    {
      title: 'Map',
      icon: <MapIcon />,
      isActive: router.pathname === '/dashboard',
      href: '/dashboard',
      subLinks: [],
    },
    {
      title: 'Settings',
      icon: <SettingsIcon />,
      isActive: router.pathname === '/settings',
      href: '/settings',
      subLinks: [],
    },
    {
      title: 'Clients',
      icon: <ClientsIcon />,
      isActive: router.pathname.includes('/clients'),
      href: '/clients',
      subLinks: [
        {
          title: 'Accounts',
          isActive: router.pathname === '/clients/accounts',
          href: '/clients/accounts',
        },
        {
          title: 'Branches',
          isActive: router.pathname === '/clients/branches',
          href: '/clients/branches',
        },
      ],
    },
    {
      title: 'Drivers',
      icon: <DriversIcon />,
      isActive: router.pathname === '/drivers',
      href: '/drivers',
      subLinks: [],
    },
    {
      title: 'Customers',
      icon: <CustomersIcon />,
      isActive: router.pathname === '/cutomers',
      href: '/cutomers',
      subLinks: [],
    },
    {
      title: 'Areas',
      icon: <AreasIcon />,
      isActive: router.pathname.includes('/areas'),
      href: '/areas',
      subLinks: [
        {
          title: 'Countries',
          isActive: router.pathname === '/areas/countries',
          href: '/areas/countries',
        },
        {
          title: 'Governorates',
          isActive: router.pathname === '/areas/governorates',
          href: '/areas/governorates',
        },
        {
          title: 'Cities',
          isActive: router.pathname === '/areas/cities',
          href: '/areas/cities',
        },
      ],
    },
    {
      title: 'Pricing',
      icon: <PricingIcon />,
      isActive: router.pathname === '/pricing',
      href: '/pricing',
      subLinks: [],
    },
  ]

  return (
    <Box
      as='aside'
      css={{
        height: '100vh',
        zIndex: 202,
        position: 'sticky',
        top: '0',
      }}
    >
      {collapsed ? <Sidebar.Overlay onClick={setCollapsed} /> : null}

      <Sidebar collapsed={collapsed}>
        <Sidebar.Header className='w-full flex items-center justify-start'>
          <Image
            src='/images/logo.png'
            alt='Company'
            width={50}
            height={50}
            className='object-contain w-full h-full'
          />
          <p>Company name</p>
        </Sidebar.Header>
        <Flex direction={'column'} justify={'between'} css={{ height: '100%' }}>
          <Sidebar.Body className='w-full'>
            {sidebarLinks.map((link, index) => (
              <>
                {link.subLinks.length > 0 ? (
                  <CollapseItems
                    key={index}
                    title={link.title}
                    icon={link.icon}
                    isActive={link.isActive}
                    href={link.href}
                    subLinks={link.subLinks}
                  />
                ) : (
                  <SidebarItem
                    key={index}
                    title={link.title}
                    icon={link.icon}
                    isActive={link.isActive}
                    href={link.href}
                  />
                )}
              </>
            ))}
          </Sidebar.Body>

          <Sidebar.Footer className='w-full flex items-center justify-start py-2 mt-10 hover:bg-red-200 rounded-lg'>
            {/* logout */}
            <button className='w-full flex items-center justify-start gap-x-4'>
              <LogoutIcon />
              <Text span size={'$lg'} css={{ color: '$red600' }}>
                <button
                  className='border-none outline-none bg-transparent'
                  onClick={() => {
                    signOutUser()
                  }}
                >
                  Sign Out
                </button>
              </Text>
            </button>
          </Sidebar.Footer>
        </Flex>
      </Sidebar>
    </Box>
  )
}
