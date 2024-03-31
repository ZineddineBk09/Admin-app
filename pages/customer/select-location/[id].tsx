import { NextPage } from 'next'
import React from 'react'
import LocationForm from '../../../components/customer/location-form'

const CustomerPage: NextPage<{ id: string }> = ({ id }: { id: string }) => {
  const [token, setToken] = React.useState<string>('')

  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get('token')
    if (token) setToken(token)
  }, [])

  return (
    <div className='w-screen h-[90vh]'>
      <LocationForm order_id={id} token={token} />
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
