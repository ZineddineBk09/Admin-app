// import Support from '../../components/support'
const Support = dynamic(() => import('../../components/support'), {
  ssr: false,
  loading: () => <Loading />,
})
import Loading from '../../components/shared/loading'
import { SupportContextProvider } from '../../context/support/support-context'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import React from 'react'

const SupportPage: NextPage = () => {
  return (
    <SupportContextProvider>
      <Support />
    </SupportContextProvider>
  )
}

export default SupportPage
