import { NextPage } from 'next'
import React from 'react'
import LocationForm from '../../../components/customer/location-form'

const CustomerPage: NextPage<{ id: string }> = ({ id }: { id: string }) => {
  return (
    <div className='w-screen h-[90vh]'>
      <LocationForm />
    </div>
  )
}

export default CustomerPage

// get id from the query
export async function getServerSideProps({ query }: { query: { id: string } }) {
  const { id } = query

  return {
    props: {
      id,
    },
  }
}
