import React from 'react'
import { Box } from '../styles/box'
import { Sidebar } from './sidebar.styles'
import { Flex } from '../styles/flex'
import { SidebarItem } from './sidebar-item'
import { useSidebarContext } from '../layout/layout-context'
import { useRouter } from 'next/router'
import { LogoutIcon } from '../icons/sidebar'
import { Divider } from '@nextui-org/react'
import Image from 'next/image'
import { CollapseItems } from './collapse-items'
import { signOut } from 'next-auth/react'
import { useCurrentRole } from '../../hooks/current-role'
import { getSidebarLinks } from './data'

export const SidebarWrapper = () => {
  const router = useRouter()
  const { collapsed, setCollapsed } = useSidebarContext()
  const userRole = useCurrentRole()
  const role = userRole === 'branch' ? 'client' : userRole

  const sidebarLinks = getSidebarLinks(role, router.pathname)

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
            {sidebarLinks
              ?.filter((link) => !link.hidden)
              ?.map((link, index) => (
                <div key={index} className='w-full flex flex-col'>
                  <Divider className='-mt-3 absolute inset-x-0' />
                  {link.subLinks?.length > 0 ? (
                    <CollapseItems
                      title={link.title}
                      icon={link.icon}
                      isActive={link.isActive}
                      href={link.href}
                      subLinks={link.subLinks}
                      hidden={link.hidden}
                    />
                  ) : (
                    <SidebarItem
                      title={link.title}
                      icon={link.icon}
                      isActive={link.isActive}
                      href={link.href}
                      hidden={link.hidden}
                    />
                  )}
                </div>
              ))}
          </Sidebar.Body>

          <Sidebar.Footer
            className='w-full flex items-center justify-start py-2 mt-10 hover:bg-red-200 hover:cursor-pointer rounded-lg'
            onClick={() => {
              signOut({ callbackUrl: `/` })
            }}
          >
            {/* logout */}
            <div className='w-full flex items-center justify-start gap-x-4'>
              <LogoutIcon />
              <button className='border-none outline-none bg-transparent text-red-500'>
                Sign Out
              </button>
            </div>
          </Sidebar.Footer>
        </Flex>
      </Sidebar>
    </Box>
  )
}
