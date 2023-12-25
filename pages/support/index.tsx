import Support from '@/components/support'
import { SupportContextProvider } from '@/context/support/support-context'
import { NextPage } from 'next'
import React from 'react'

const SupportPage: NextPage = () => {
  return (
    <SupportContextProvider>
      <Support />
    </SupportContextProvider>
  )
}

export default SupportPage
