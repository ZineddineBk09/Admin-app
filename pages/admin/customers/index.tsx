import { NextPage } from 'next'
import React from 'react'
import { AdminGuard } from '../../../components/guards/admin'

const CustomersPage: NextPage = () => {
  return (
    <AdminGuard>
      <div></div>
    </AdminGuard>
  )
}

export default CustomersPage
