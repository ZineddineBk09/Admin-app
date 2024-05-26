import React from 'react'
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

export const getSidebarLinks = (role: string, pathname: string) => [
  {
    title: 'Map',
    icon: <MapIcon />,
    isActive: pathname === `/${role}/dashboard`,
    href: `/${role}/dashboard`,
    subLinks: [],
    hidden: role !== 'admin',
  },
  {
    title: 'Orders',
    icon: <OrdersIcon />,
    isActive: pathname.includes('/orders'),
    href: `/${role}/orders`,
    subLinks: [
      {
        title: 'Orders',
        isActive: pathname === `/${role}/orders/list`,
        href: `/${role}/orders/list`,
      },
      {
        title: 'Auto Cancel',
        isActive: pathname === `/${role}/orders/auto-cancel`,
        href: `/${role}/orders/auto-cancel`,
      },
    ],
    hidden: !['admin', 'client', 'branch'].includes(role),
  },
  {
    title: 'Reports',
    icon: <ReportsIcon />,
    isActive: pathname === `/${role}/reports`,
    href: `/${role}/reports`,
    subLinks: [],
    hidden: role !== 'admin',
  },
  {
    title: 'Clients',
    icon: <ClientsIcon />,
    isActive: pathname.includes('/clients'),
    href: `/${role}/clients`,
    subLinks: [
      {
        title: 'Accounts',
        isActive: pathname === `/${role}/clients/accounts`,
        href: `/${role}/clients/accounts`,
      },
      {
        title: 'Branches',
        isActive: pathname === `/${role}/clients/branches`,
        href: `/${role}/clients/branches`,
      },
    ],
    hidden: role !== 'admin',
  },
  {
    title: 'Drivers',
    icon: <DriversIcon />,
    isActive: pathname.includes('/drivers'),
    href: `/${role}/drivers`,
    subLinks: [
      {
        title: 'Drivers',
        isActive: pathname === `/${role}/drivers/list`,
        href: `/${role}/drivers/list`,
      },
      {
        title: 'Teams',
        isActive: pathname === `/${role}/drivers/teams`,
        href: `/${role}/drivers/teams`,
      },
      {
        title: 'Vehicle Types',
        isActive: pathname === `/${role}/drivers/types`,
        href: `/${role}/drivers/types`,
      },
    ],
    hidden: role !== 'admin',
  },
  {
    title: 'Customers',
    icon: <CustomersIcon />,
    isActive: pathname === `/${role}/customers`,
    href: `/${role}/customers`,
    subLinks: [],
    hidden: role !== 'admin',
  },
  {
    title: 'Areas',
    icon: <AreasIcon />,
    isActive: pathname.includes('/areas'),
    href: `/${role}/areas`,
    subLinks: [
      {
        title: 'Countries',
        isActive: pathname === `/${role}/areas/countries`,
        href: `/${role}/areas/countries`,
      },
      {
        title: 'Governorates',
        isActive: pathname === `/${role}/areas/governorates`,
        href: `/${role}/areas/governorates`,
      },
      {
        title: 'Cities',
        isActive: pathname === `/${role}/areas/cities`,
        href: `/${role}/areas/cities`,
      },
    ],
    hidden: role !== 'admin',
  },
  {
    title: 'Pricing',
    icon: <PricingIcon />,
    isActive: pathname === `${role}/pricing`,
    href: `${role}/pricing`,
    subLinks: [],
    hidden: role !== 'admin',
  },
  {
    title: 'Support',
    icon: <SupportIcon />,
    isActive: pathname === `${role}/support`,
    href: `/${role}/support`,
    subLinks: [],
    hidden: role !== 'admin',
  },
  {
    title: 'Settings',
    icon: <SettingsIcon />,
    isActive: pathname.includes('/settings'),
    href: `/${role}/settings`,
    subLinks: [
      {
        title: 'Access Profiles',
        isActive: pathname === `${role}/settings/access-profiles`,
        href: `/${role}/settings/access-profiles`,
      },
      {
        title: 'Users Access',
        isActive: pathname === `${role}/settings/users-access`,
        href: `/${role}/settings/users-access`,
      },
      {
        title: 'Delivery Settings',
        isActive: pathname === `${role}/settings/delivery-settings`,
        href: `/${role}/settings/delivery-settings`,
      },
    ],
    hidden: role !== 'admin',
  },
]
