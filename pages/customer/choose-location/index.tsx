import { NextPage } from 'next'
import React from 'react'
import LocationForm from '../../../components/customer/location-form'

const CustomerPage: NextPage = () => {
  return (
    <div className='w-screen h-screen'>
      <LocationForm />
    </div>
  )
}

export default CustomerPage
