import { Text, Link } from '@nextui-org/react'
import NextLink from 'next/link'
import React from 'react'
import { Flex } from '../styles/flex'
import { useSidebarContext } from '../layout/layout-context'

interface SubLink {
  title: string
  isActive?: boolean
  href?: string
}
interface Props {
  title: string
  icon: React.ReactNode
  isActive: boolean
  href: string
  subLinks?: SubLink[]
  hidden: boolean
}

export const SidebarItem = ({
  icon,
  title,
  isActive,
  href = '',
  subLinks = [],
  hidden
}: Props) => {
  const { setCollapsed } = useSidebarContext()
  const handleClick = () => {
    if (window.innerWidth < 768) {
      setCollapsed()
    }
  }

  if (hidden) return null
  return (
    <NextLink href={href} className='relative'>
      <Link
        className='relative w-full flex flex-col'
        css={{
          color: '$accents9',
          maxWidth: '100%',
        }}
      >
        <Flex
          onClick={handleClick}
          css={{
            gap: '$6',
            width: '100%',
            minHeight: '44px',
            height: '100%',
            alignItems: 'center',
            px: '$7',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
            '&:active': {
              transform: 'scale(0.98)',
            },
            ...(isActive
              ? {
                  '& svg path': {
                    stroke: '#FFDB00 !important',
                  },
                }
              : { '&:hover': { bg: '$accents2' } }),
          }}
          align={'center'}
        >
          {icon}
          <Text
            span
            weight={'normal'}
            size={'$base'}
            css={{
              color: isActive ? '$accents9' : '$accents5',
            }}
          >
            {title}
          </Text>
        </Flex>
        {isActive && (
          <div className='absolute w-3 h-[68px] -top-3 -right-5 bg-primary transition-all duration-300' />
        )}
      </Link>
    </NextLink>
  )
}
