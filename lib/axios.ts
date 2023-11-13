import axios from 'axios'
import { getSession } from 'next-auth/react'

export default axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${(await getSession()?.accessToken) || ''}`,
  },
  withCredentials: false, // to change in prod
})
