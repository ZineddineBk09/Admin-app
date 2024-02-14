import { ChatMessage } from '../interfaces'
import exportFromJSON from 'export-from-json'

export const truncateTxt = (str: string, n: number) => {
  return str?.length > n ? str.substr(0, n - 1) + '...' : str
}

export const exportToExcel = ({ name, data }: { name: string; data: any }) => {
  exportFromJSON({
    data,
    fileName: name,
    exportType: 'xls',
    fields: {
      id: 'ID',
      client: 'Client',
      clientName: 'Client Name',
      clientPhone: 'Client Phone',
      clientEmail: 'Client Email',
      paid: 'Paid',
      unpaid: 'Unpaid',
      branches: 'Branches',
      areas: 'Areas',
      countries: 'Countries',
      orders: 'Orders',
      canceledOrders: 'Canceled Orders',
    },
  })
}

export const sortChat = (chatMessages: ChatMessage[]) => {
  return chatMessages.sort((a, b) => {
    return a.timestamp.seconds - b.timestamp.seconds
  })
}

export const renderBigNums = (num: number) => {
  // add , to big numbers
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) => {
  if (!lat1 || !lon1 || !lat2 || !lon2) return 0
  const R = 6371 // R is earth's radius in km
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)
  const lat1Rad = toRad(lat1)
  const lat2Rad = toRad(lat2)

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) *
      Math.sin(dLon / 2) *
      Math.cos(lat1Rad) *
      Math.cos(lat2Rad)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const d = R * c
  return d.toFixed(2)
}

const toRad = (value: number) => {
  return (value * Math.PI) / 180
}
