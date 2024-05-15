import { ChatMessage, Order } from '../interfaces'
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

export const generateOrdersReport = (orders: Order[], fileName: string) => {
  const flat_orders = orders.map((order) => ({
    id: order.id,
    COD: order.COD,
    'Added At': order.added_at,
    'Client Account': order.client.account.name,
    'Client Address':
      order.client.address.country.name +
      '-' +
      order.client.address.governorate.name +
      '-' +
      order.client.address.city.name,
    'Client Supervisor': order.client.supervisor.username,
    'Customer Name': order.customer.name,
    'Customer Phone Number': order.customer.number,
    'Total Order Value': order.total_order_value,
    Status: order.status,
    'Pickup Address':
      order.pickup_address.country.name +
      '-' +
      order.pickup_address.governorate.name +
      '-' +
      order.pickup_address.city.name,
  }))

  exportFromJSON({
    data: flat_orders,
    fileName,
    exportType: 'xls',
    fields: {
      id: 'ID',
      COD: 'COD',
      'Added At': 'Added At',
      'Client Account': 'Client Account',
      'Client Address': 'Client Address',
      'Client Supervisor': 'Client Supervisor',
      'Customer Name': 'Customer Name',
      'Customer Phone Number': 'Customer Phone Number',
      'Total Order Value': 'Total Order Value',
      Status: 'Status',
      'Pickup Address': 'Pickup Address',
    },
  })
}

export const checkValidImageUrl = (url: string) => {
  const urlRegex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g
  return urlRegex.test(url)
}
