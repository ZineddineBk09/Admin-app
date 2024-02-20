import {
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

export const sidebarLinks = [
  {
    title: 'Map',
    Icon: MapIcon,
    isActive: globalThis.window?.location.pathname === '/dashboard',
    href: '/dashboard',
    subLinks: [],
  },
  {
    title: 'Orders',
    Icon: OrdersIcon,
    isActive: globalThis.window?.location.pathname === '/orders',
    href: '/orders',
    subLinks: [],
  },
  {
    title: 'Reports',
    Icon: ReportsIcon,
    isActive: globalThis.window?.location.pathname === '/reports',
    href: '/reports',
    subLinks: [],
  },
  {
    title: 'Clients',
    Icon: ClientsIcon,
    isActive: globalThis.window?.location.pathname.includes('/clients'),
    href: '/clients',
    subLinks: [
      {
        title: 'Accounts',
        isActive: globalThis.window?.location.pathname === '/clients/accounts',
        href: '/clients/accounts',
      },
      {
        title: 'Branches',
        isActive: globalThis.window?.location.pathname === '/clients/branches',
        href: '/clients/branches',
      },
    ],
  },
  {
    title: 'Drivers',
    Icon: DriversIcon,
    isActive: globalThis.window?.location.pathname.includes('/drivers'),
    href: '/drivers',
    subLinks: [
      {
        title: 'Drivers',
        isActive: globalThis.window?.location.pathname === '/drivers/list',
        href: '/drivers/list',
      },
      {
        title: 'Teams',
        isActive: globalThis.window?.location.pathname === '/drivers/teams',
        href: '/drivers/teams',
      },
      {
        title: 'Vehicle Types',
        isActive: globalThis.window?.location.pathname === '/drivers/types',
        href: '/drivers/types',
      },
    ],
  },
  {
    title: 'Customers',
    Icon: CustomersIcon,
    isActive: globalThis.window?.location.pathname === '/customers',
    href: '/customers',
    subLinks: [],
  },
  {
    title: 'Areas',
    Icon: AreasIcon,
    isActive: globalThis.window?.location.pathname.includes('/areas'),
    href: '/areas',
    subLinks: [
      {
        title: 'Countries',
        isActive: globalThis.window?.location.pathname === '/areas/countries',
        href: '/areas/countries',
      },
      {
        title: 'Governorates',
        isActive:
          globalThis.window?.location.pathname === '/areas/governorates',
        href: '/areas/governorates',
      },
      {
        title: 'Cities',
        isActive: globalThis.window?.location.pathname === '/areas/cities',
        href: '/areas/cities',
      },
    ],
  },
  {
    title: 'Pricing',
    Icon: PricingIcon,
    isActive: globalThis.window?.location.pathname === '/pricing',
    href: '/pricing',
    subLinks: [],
  },
  {
    title: 'Support',
    Icon: SupportIcon,
    isActive: globalThis.window?.location.pathname === '/support',
    href: '/support',
    subLinks: [],
  },
  {
    title: 'Settings',
    Icon: SettingsIcon,
    isActive: globalThis.window?.location.pathname.includes('/settings'),
    href: '/settings',
    subLinks: [
      {
        title: 'Access Profiles',
        isActive:
          globalThis.window?.location.pathname === '/settings/access-profiles',
        href: '/settings/access-profiles',
      },
      {
        title: 'Users Access',
        isActive:
          globalThis.window?.location.pathname === '/settings/users-access',
        href: '/settings/users-access',
      },
      {
        title: 'Delivery Settings',
        isActive:
          globalThis.window?.location.pathname ===
          '/settings/delivery-settings',
        href: '/settings/delivery-settings',
      },
    ],
  },
]
