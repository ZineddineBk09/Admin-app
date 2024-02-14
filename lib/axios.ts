import axios from 'axios'

export default axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    // 'jwt-token':
    //   typeof window !== 'undefined'
    //     ? localStorage.getItem('jwt-token')?.slice(1, -1)
    //     : '',
  },
  withCredentials: false, // to change in prod
})
