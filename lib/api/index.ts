import { APIRecord, AuthSession } from '@/interfaces'
import { getSession } from 'next-auth/react'

export const createRecord = async (record: APIRecord, endpoint: string) => {
  const session: any = await getSession()

  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL + '/' + endpoint,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify(record),
    }
  )
  const data = await response.json()
  console.log('createRecord data: ', data)
  return data
}

export const updateRecord = async (record: APIRecord, endpoint: string) => {
  const session: any = await getSession()

  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL + '/' + endpoint,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify(record),
    }
  )
  const data = await response.json()
  console.log('updateRecord data: ', data)
  return data
}

export const deleteRecord = async (record: APIRecord, endpoint: string) => {
  const session: any = await getSession()

  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL + '/' + endpoint,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify(record),
    }
  )
  const data = await response.json()
  console.log('deleteRecord data: ', data)
  return data
}

export const getRecords = async (endpoint: string) => {
  const session: any = await getSession()

  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + '/' + endpoint,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${session.accessToken}`,
        },
      }
    )
    const data = await response.json()
    return data
  } catch (error) {
    console.log('getRecords error: ', error)
    return []
  }
}
