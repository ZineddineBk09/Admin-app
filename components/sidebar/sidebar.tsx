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
  SupportIcon,
  OrdersIcon,
  ReportsIcon,
} from '../icons/sidebar'
import { Divider, Text } from '@nextui-org/react'
import Image from 'next/image'
import { CollapseItems } from './collapse-items'
import { signOut } from 'next-auth/react'

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
      title: 'Orders',
      icon: <OrdersIcon />,
      isActive: router.pathname === '/orders',
      href: '/orders',
      subLinks: [
        {
          title: 'Orders',
          isActive: router.pathname === '/orders/list',
          href: '/orders/list',
        },
        {
          title: 'Auto Cancel',
          isActive: router.pathname === '/orders/auto-cancel',
          href: '/orders/auto-cancel',
        },
      ],
    },
    {
      title: 'Reports',
      icon: <ReportsIcon />,
      isActive: router.pathname === '/reports',
      href: '/reports',
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
      isActive: router.pathname.includes('/drivers'),
      href: '/drivers',
      subLinks: [
        {
          title: 'Drivers',
          isActive: router.pathname === '/drivers/list',
          href: '/drivers/list',
        },
        {
          title: 'Teams',
          isActive: router.pathname === '/drivers/teams',
          href: '/drivers/teams',
        },
        {
          title: 'Driver Types',
          isActive: router.pathname === '/drivers/types',
          href: '/drivers/types',
        },
      ],
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
    {
      title: 'Support',
      icon: <SupportIcon />,
      isActive: router.pathname === '/support',
      href: '/support',
      subLinks: [],
    },
    {
      title: 'Settings',
      icon: <SettingsIcon />,
      isActive: router.pathname.includes('/settings'),
      href: '/settings',
      subLinks: [
        {
          title: 'Access Profiles',
          isActive: router.pathname === '/settings/access-profiles',
          href: '/settings/access-profiles',
        },
        {
          title: 'Users Access',
          isActive: router.pathname === '/settings/users-access',
          href: '/settings/users-access',
        },
        {
          title: 'Delivery Settings',
          isActive: router.pathname === '/settings/delivery-settings',
          href: '/settings/delivery-settings',
        },
      ],
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

      <Sidebar collapsed={collapsed} className='relative'>
        <Sidebar.Header className='w-full flex items-center justify-start mb-3'>
          <Image
            src='/images/logo.png'
            alt='Company'
            width={50}
            height={50}
            className='object-contain w-full h-full'
          />
          <p className='text-2xl font-medium'>
            <span className='text-primary'>Fleet</span>Run
          </p>
        </Sidebar.Header>
        <Flex direction={'column'} justify={'between'} css={{ height: '95%' }}>
          <Sidebar.Body className='w-full'>
            {sidebarLinks?.map((link, index) => (
              <div key={index} className='w-full flex flex-col'>
                <Divider className='-mt-3 absolute inset-x-0' />
                {link.subLinks?.length > 0 ? (
                  <CollapseItems
                    title={link.title}
                    icon={link.icon}
                    isActive={link.isActive}
                    href={link.href}
                    subLinks={link.subLinks}
                  />
                ) : (
                  <SidebarItem
                    title={link.title}
                    icon={link.icon}
                    isActive={link.isActive}
                    href={link.href}
                  />
                )}
              </div>
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
                    signOut({ callbackUrl: `/` })
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
