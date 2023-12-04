import SupportPage from '@/components/support'
import { SupportContextProvider } from '@/context/support/support-context'
import { NextPage } from 'next'
import React from 'react'

const Support: NextPage = () => {
  return (
    <SupportContextProvider>
      <SupportPage />
    </SupportContextProvider>
  )
}

export default Support
