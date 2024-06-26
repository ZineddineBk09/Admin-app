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
    throw error
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
    throw error
  }
}

export const partialUpdateRecord = async (record: any, endpoint: string) => {
  const session: any = await getSession()

  try {
    const response = await axios.patch(endpoint + '/' + record.id + '/', record)
    const data = await response.data
    return data
  } catch (error) {
    console.log('Error updating record', error)
    throw error
  }
}

export const deleteRecord = async (id: string | number, endpoint: string) => {
  const session: any = await getSession()
  try {
    const response = await axios.delete(endpoint + '/' + id + '/')
    const data = await response.data
    return data
  } catch (error) {
    console.log('Error deleting record', error)
    throw error
  }
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

export const getRecord = async (id: string | number, endpoint: string) => {
  try {
    const response = await axios.get(endpoint + '/' + id + '/')
    const data = await response.data
    return data
  } catch (error) {
    console.log('Error retreiving record', error)
    return {}
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

export const searchRecords = async (search: string, endpoint: string) => {
  try {
    const response = await axios.get(endpoint + '/', {
      params: { search },
    })
    const data = await response.data
    return data
  } catch (error) {
    console.log('Error searching records', error)
    return []
  }
}

// http://194.233.173.78:8000/api/v1/order/2/?transition=cancel_order
export const cancelRecord = async (
  id: string | number,
  endpoint: string,
  note: string,
  transition: string
) => {
  try {
    const response = await axios.put(
      endpoint + '/' + id + '/?transition=' + transition,
      {
        transition_description_field: note,
      }
    )
    const data = await response.data
    return data
  } catch (error) {
    console.log('Error cancelling record', error)
    throw error
  }
}
