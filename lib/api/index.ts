import { getSession } from 'next-auth/react'
import axios from '../axios'

export const createRecord = async (record: any, endpoint: string) => {
  const session: any = await getSession()

  try {
    const response = await axios.post(endpoint + '/', record)
    const data = await response.data
    return data
  } catch (error: any) {
    console.log('Error creating record', error)
    throw new Error(error.message || 'Error creating record')
  }
}

export const updateRecord = async (record: any, endpoint: string) => {
  const session: any = await getSession()

  try {
    const response = await axios.put(endpoint + '/' + record.id + '/', record)
    const data = await response.data
    return data
  } catch (error) {
    console.log('Error updating record', error)
    throw new Error('Error updating record')
  }
}

export const deleteRecord = async (id: string, endpoint: string) => {
  const session: any = await getSession()

  const response = await axios.delete(endpoint + '/' + id + '/')
  const data = await response.data
  return data
}

export const getRecords = async (endpoint: string) => {
  try {
    const response = await axios.get(endpoint + '/')
    const data = await response.data
    return data
  } catch (error) {
    console.log('Error retreiving records', error)
    return []
  }
}

export const filterRecords = async (params: any, endpoint: string) => {
  try {
    const response = await axios.get(endpoint + '/', {
      params,
    })
    const data = await response.data
    return data
  } catch (error) {
    console.log('Error filtering records', error)
    return []
  }
}
