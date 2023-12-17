import { getSession } from 'next-auth/react'
import axios from 'axios'

export const createRecord = async (record: any, endpoint: string) => {
  const session: any = await getSession()

  const response = await axios.post(
    process.env.NEXT_PUBLIC_API_URL + '/' + endpoint,
    record,
    {
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${session.accessToken}`,
      },
    }
  )
  const data = await response.data
  return data
}

export const updateRecord = async (record: any, endpoint: string) => {
  const session: any = await getSession()

  const response = await axios.put(
    process.env.NEXT_PUBLIC_API_URL + '/' + endpoint + '/edit/' + record.id,
    {},
    {
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${session.accessToken}`,
      },
    }
  )
  const data = await response.data
  return data
}

export const deleteRecord = async (id: string, endpoint: string) => {
  const session: any = await getSession()

  const response = await axios.delete(
    process.env.NEXT_PUBLIC_API_URL + '/' + endpoint + '/del/' + id,
    {
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${session.accessToken}`,
      },
    }
  )
  const data = await response.data
  return data
}

export const getRecords = async (endpoint: string) => {
  const session: any = await getSession()

  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + '/' + endpoint,
      {
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${session.accessToken}`,
        },
      }
    )
    const data = await response.data
    return data
  } catch (error) {
    return []
  }
}