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
}

export interface Order {
  id: string
  restaurant: string
  restaurantId: string
  restaurantImage: string
  customer: string
  customerId: string
  customerImage: string
  startTime: number
  endTime: number
  driverId: string
  status: string
  duration: number
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
  driverFee: number
}

export interface City {
  id: string
  name: string
  governorateId: string
  governorateName: string
  orderFee: number
  driverFee: number
}

export interface Account {
  id: string
  name: string
  city: string
  discount: number
  website: string
  phone: string
  branches: { id: string; name: string }[]
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
