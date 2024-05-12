import { NextPage } from 'next'
import React from 'react'
import { AdminGuard } from '../../../components/guards/admin'

const PricingPage: NextPage = () => {
  return (
    <AdminGuard>
      <div></div>
    </AdminGuard>
  )
}

export default PricingPage
