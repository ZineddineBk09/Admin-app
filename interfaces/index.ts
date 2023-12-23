export interface AuthUser {
  email: string | null
  uid: string | null
}

export interface AuthSession {
  user: any
  accessToken: string
  refreshToken?: string
}

export interface RegisterUser {
  uid: string | null
  email: string | null
  username: string | null
  storeName: string | null
  storeAddress: string | null
  storeManager: string | null
  storePhone: string | null
  status: boolean
}

export interface Driver {
  id: string
  username: string
  email: string
  image: string
  status: 'available' | 'inactive' | 'busy' | string
  team: string
  completedTasks: number
  inProgressTasks: number
  location?: {
    latitude: number
    longitude: number
  }
  orders: number
  phone: string
  firstName: string
  lastName: string
  vehicleId: string
  vehicleType: string
  vehicleLicense: string
  residencyId: string
  isFreelance: boolean
  isActive: boolean
  isStaff: boolean
  code: string
  areas: string[]
  salary: number
  city: string
}

export interface DriverType {
  id: number
  name: string
  fixed: number
  pricePerKm: number
  additional: number
  maxDistance: number
}

export interface DriverTeam {
  id: number
  name: string
  members: DriverTeamMember[]
  supervisor: DriverTeamMember
  fixed: number
  pricePerKm: number
  additional: number
  maxDistance: number
  areas: string[]
  city: string
  country: string
}

export interface DriverTeamMember {
  id: number
  name: string
}

export interface Item {
  id: string
  name: string
  quantity: number
}

interface Client {
  id: string
  name: string
  image: string
  address: string
  phone: string
}

interface Customer {
  id: string
  name: string
  image: string
  address: string
  phone: string
}

export interface Order {
  id: string
  date: string
  time: string
  customer: Customer
  client: Client
  driverId: string
  driverName: string
  distance: number
  city: string
  value: number
  deliveryFee: number
  status: string
  clientPaid: boolean
  driverPaid: boolean
  location: {
    latitude: number
    longitude: number
  } | null
  duration: number
  startTime: number
  endTime: number
  items: Item[]
}

export interface Status {
  value: string
  checked: boolean
}

export interface Country {
  id: string
  name: string
  priceUnit: string
  orderFee: number
  driverFee: number
}

export interface Governorate {
  id: string
  name: string
  countryId: string
  countryName: string
  orderFee: number
  price: number
  additional: number
}

export interface City {
  id: string
  name: string
  governorateId: string
  governorateName: string
  orderFee: number
  price: number
  additional: number
}

export interface Account {
  id: string
  name: string
  city: string
  discount: number
  website: string
  phone: string
  branches: { id: string; name: string }[]
  teams: { id: string; name: string }[]
  admins: { id: string; name: string }[]
}

export interface Branch {
  id: string
  name: string
  country: string
  governorate: string
  city: string
  customOrderFee: number
  customDriverFee: number
  phone: string
  supervisor: string
  clientAccount: string
  location: {
    latitude: number
    longitude: number
  }
}

export interface Sort {
  column: string
  direction: string
}

export interface BBox {
  min_lat: number
  min_lng: number
  max_lat: number
  max_lng: number
}

export interface Team {
  model: string
  pk: string
  fields: {
    name: string
  }
}

interface APIDriver {
  id: string
  username: string
  first_name: string
  last_name: string
  email: string
  phone_number: string
  team_id: string
  password: string
  is_freelance: boolean
  vehicle_id: string
  vehicle_type: string
  vehicle_license: string
  residency_id: string
}

export type APIRecord = APIDriver | Order | Account | Branch

interface Report {
  id: string
  client: string
  clientName: string
  clientPhone: string
  clientEmail: string
  paid: number
  unpaid: number
}

export interface ClientsReport extends Report {
  branches: string[]
  areas: string[]
  countries: string[]
  orders: number
  canceledOrders: number
}

export interface OrdersReport extends ClientsReport {}

export interface DriversReport extends ClientsReport {}

export interface AreasReport extends ClientsReport {}

export interface CustomersReport extends ClientsReport {}

export interface TeamsReport extends ClientsReport {}

export interface SupportChat {
  id: number
  text: string
  date?: string
}

export interface SupportTeamMember {
  id: number
  name: string
  chats: SupportChat[]
  unread: number
}

export interface AccessProfile {
  id: number
  name: string
  permissions: string[]
}

export interface UserAccess {
  id: number
  username: string
  email: string
  accessProfile: string
  clients: string[]
}

export interface Note {
  date: string
  time: string
  text: string
}

export interface SubLink {
  title: string
  isActive?: boolean
  href?: string
}
