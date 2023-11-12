import { styled } from '@nextui-org/react'

export const SidebarWrapper = styled('div', {
  backgroundColor: '$background',
  transition: 'transform 0.5s ease',
  height: '100%',
  position: 'fixed',
  transform: 'translateX(-100%)',
  width: '0',
  flexShrink: 0,
  zIndex: '202',
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  borderRight: '1px solid $border',
  flexDirection: 'column',
  py: '$10',
  px: '$6',
  '@md': {
    marginLeft: '0',
    display: 'flex',
    position: 'static',
    height: '100vh',
    transform: 'translateX(-100%)',
  },
  variants: {
    collapsed: {
      true: {
        display: 'inherit',
        marginRight: '1rem',
        marginLeft: '0',
        transform: 'translateX(0)',
        width: '16rem',
      },
      false: {
        display: 'flex',
        transform: 'translateX(-100%)',
        width: '0',
        margin: '0',
      },
    },
  },
})

export const Overlay = styled('div', {
  backgroundColor: 'rgb(15 23 42 / 0.3)',
  position: 'fixed',
  inset: 0,
  zIndex: '201',
  transition: 'opacity 0.3s ease',
  opacity: 0.8,
  '@md': {
    display: 'none',
    zIndex: 'auto',
    opacity: 1,
  },
})

export const Header = styled('div', {
  display: 'flex',
  gap: '$8',
  alignItems: 'center',
  // 'justifyContent': 'center',
  px: '$10',
})

export const Body = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$10',
  mt: '$13',
  px: '$4',
  // pt: '$4',
})

export const Footer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '$12',
  pt: '$18',
  pb: '$8',
  '@md': {
    pt: 0,
    pb: 0,
  },
  px: '$10',
})

export const Sidebar = Object.assign(SidebarWrapper, {
  Header,
  Body,
  Overlay,
  Footer,
})
