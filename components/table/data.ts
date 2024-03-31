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
  { name: 'Delivery', uid: 'delivery_fee' },
  { name: 'Payment', uid: 'payment_type' },
  { name: 'Status', uid: 'status' },
  { name: 'Client Paid', uid: 'client_paid' },
  { name: 'Driver Paid', uid: 'driver_paid' },
  { name: 'Actions', uid: 'actions' },
]

export const autoCancelOrdersTableCols = [
  { name: 'Order No', uid: 'id' },
  { name: 'Date', uid: 'date' },
  { name: 'Time', uid: 'time' },
  { name: 'Client', uid: 'client' },
  { name: 'Distance', uid: 'distance' },
  { name: 'City', uid: 'city' },
  { name: 'Value', uid: 'value' },
  { name: 'Delivery', uid: 'delivery_fee' },
  { name: 'Payment', uid: 'paymentType' },
  { name: 'Time Left', uid: 'timeLeft' },
  { name: 'Assign Driver', uid: 'assign' },
  { name: 'Bonus', uid: 'bonus' },
  { name: 'Actions', uid: 'actions' },
]

export const reportsTableCols = [
  { name: 'No', uid: 'id' },
  { name: 'Client', uid: 'client' },
  { name: 'Name', uid: 'clientName' },
  { name: 'Phone', uid: 'clientPhone' },
  { name: 'Email', uid: 'clientEmail' },
  { name: 'Branches', uid: 'branches' },
  { name: 'Areas', uid: 'areas' },
  { name: 'Countries', uid: 'countries' },
  { name: 'Orders', uid: 'orders' },
  { name: 'Canceled', uid: 'canceledOrders' },
  { name: 'Paid', uid: 'paid' },
  { name: 'Unpaid', uid: 'unpaid' },
  { name: 'Actions', uid: 'actions' },
]

export const paymentTableCols = [
  { name: 'Order No', uid: 'id' },
  { name: 'Date', uid: 'date' },
  { name: 'Time', uid: 'time' },
  { name: 'Driver', uid: 'driver' },
  { name: 'Distance', uid: 'distance' },
  { name: 'City', uid: 'city' },
  { name: 'Value', uid: 'value' },
]
