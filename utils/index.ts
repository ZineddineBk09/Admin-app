import { Chat, ChatMessage } from '@/interfaces'
import exportFromJSON from 'export-from-json'

export const truncateTxt = (str: string, n: number) => {
  return str.length > n ? str.substr(0, n - 1) + '...' : str
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

export const orderChat = (chatMessages: ChatMessage[]) => {
  return chatMessages.sort((a, b) => {
    return a.timestamp.seconds - b.timestamp.seconds
  })
}
