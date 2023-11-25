import { Driver } from '@/interfaces'

export const driversTableCols = [
  { name: 'DRIVER', uid: 'name' },
  { name: 'EMAIL', uid: 'email' },
  { name: 'PHONE', uid: 'phone' },
  { name: 'TEAM', uid: 'team' },
  { name: 'STATUS', uid: 'status' },
  { name: 'COMPLETED', uid: 'completedTasks' },
  { name: 'IN PROGRESS', uid: 'inProgressTasks' },
  { name: 'ACTIONS', uid: 'actions' },
]

export const ordersTableCols = [
  { name: 'Order No', uid: 'id' },
  { name: 'Date', uid: 'date' },
  { name: 'Time', uid: 'time' },
  { name: 'Client', uid: 'client' },
  { name: 'Driver', uid: 'driver' },
  { name: 'Distance', uid: 'distance' },
  { name: 'City', uid: 'city' },
  { name: 'Value', uid: 'value' },
  { name: 'Delivery', uid: 'deliveryFee' },
  { name: 'Status', uid: 'status' },
  { name: 'Is Paid', uid: 'isPaid' },
  { name: 'Actions', uid: 'actions' },
]
