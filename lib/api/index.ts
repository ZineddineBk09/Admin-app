import { APIRecord, AuthSession } from '@/interfaces'
import { getSession } from 'next-auth/react'

export const createRecord = async (record: APIRecord, endpoint: string) => {
  const session: any = await getSession()
  console.log('createRecord session: ', session)
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.accessToken}`,
    },
    body: JSON.stringify(record),
  })
  const data = await response.json()
  console.log('createRecord data: ', data)
  return data
}
