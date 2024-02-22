import { Collapse, Text } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { Flex } from '../styles/flex'
import { useRouter } from 'next/router'
import Link from 'next/link'

export const CollapseItems = ({
  icon,
  subLinks,
  title,
  href = '',
  isActive,
}: any) => {
  const router = useRouter()
  const [open, setOpen] = useState(
    subLinks.some((item: any) => item.href === router.pathname)
  )

  const handleToggle = () => setOpen(!open)

  // if user navigates to a page that is not the parent of the collapse, close the collapse
  useEffect(() => {
    if (href === router.pathname) setOpen(true)
    else if (!subLinks.some((item: any) => item.href === router.pathname))
      setOpen(false)
  }, [router.pathname])

  return (
    <Flex
      css={{
        gap: '$6',
        height: '100%',
        alignItems: 'center',
        cursor: 'pointer',
      }}
      align={'center'}
      className='relative'
    >
      <Collapse
        className='relative'
        title={
          <Flex
            css={{
              bg: open && subLinks?.length == 0 ? '$green200' : 'transparent',
              color: open && subLinks?.length == 0 ? '$green600' : '$accents9',
              gap: '$6',
              width: '100%',
              py: '$5',
              px: '$7',
              borderRadius: '8px',
              transition: 'all 0.15s ease',
              '&:active': {
                transform: 'scale(0.98)',
              },
              '&:hover': {
                bg: '$accents2',
              },
              ...(isActive
                ? {
                    '& svg path': {
                      stroke: '#FFDB00 !important',
                    },
                  }
                : { '&:hover': { bg: '$accents2' } }),
            }}
            justify={'between'}
            onClick={handleToggle}
          >
            <Flex css={{ gap: '$6' }}>
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
          </Flex>
        }
        css={{
          width: '100%',
          '& .nextui-collapse-view': {
            p: '0',
          },
          '& .nextui-collapse-content': {
            marginTop: '$1',
            padding: '0px',
          },
        }}
        divider={false}
        showArrow={subLinks?.length > 0}
        expanded={open}
      >
        {subLinks?.map(({ title, href, isActive }: any, index: number) => (
          <div className='pl-8' key={index}>
            <SubItem
              key={index}
              isActive={router.pathname === href}
              title={title}
              href={href}
            />
          </div>
        ))}
      </Collapse>
      {isActive && (
        <div className='absolute w-3 h-[68px] -top-3 -right-5 bg-primary transition-all duration-300' />
      )}
    </Flex>
  )
}

const SubItem = ({ title, isActive, href = '' }: any) => {
  return (
    <Link className='relative w-full flex flex-col' href={href}>
      <Flex
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
                  stroke: '#FFDB00',
                },
              }
            : { '&:hover': { bg: '$accents2' } }),
        }}
        align={'center'}
      >
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
        {isActive && (
          <div className='absolute w-3 h-11 -right-5 bg-primary transition-all duration-300' />
        )}
      </Flex>
    </Link>
  )
}
