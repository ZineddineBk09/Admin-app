import { number } from 'yup'

export interface Pricing {
  price_ratio_nominator: number
  price_ratio_denominator: number
  additional_ratio_nominator: number
  additional_ratio_denominator: number
}

//------------------------- Auth & Register -------------------------
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

export interface User {
  id: string
  username: string
}
//--------------------------------------------------------------------

//------------------------- Drivers ----------------------------
export interface Driver {
  id: string
  user: User
  city: City
  driver_type: DriverType
  team: DriverTeam
  code: string
  phone_number: string
  status: string
  image: string
  vehicle_license: string
  residency_id: string
  is_idle: boolean
}

export interface DriverMinimal {
  id: string
  user: User
}

export interface DriverType extends Pricing {
  id: string
  vehicle_type:
    | 'car'
    | 'van'
    | 'motor'
    | 'taxi'
    | 'helicopter'
    | 'truck'
    | 'bicycle'
    | 'ship'
    | 'scooter'
}

export interface DriverTeam extends Pricing {
  id: string
  name: string
  fixed: number
  supervisor: User
  city: {
    id: string
    name: string
  }
  areas?: Geofence[]
  accounts?: string[]
  parent: string | null
}

export interface DriverTeamMember {
  id: number
  name: string
}

export interface Team extends Pricing {
  id: string
  name: string
  fixed: number
  supervisor?: User
  city: City
  areas: Geofence[]
  accounts: AccountMinimal[]
}

export interface TeamMinimal {
  id: string
  name: string
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
  vehicle_id: string
  vehicle_type: string
  vehicle_license: string
  residency_id: string
}
//--------------------------------------------------------------------

//------------------------- Customers & Orders ----------------------------
export interface Item {
  id: string
  name: string
  quantity: number
}

interface Customer {
  id: string
  name: string
  number: string
}

export interface Order {
  id: string
  serial_number: number
  external_id: string
  COD: boolean
  currently_assigned_driver: Driver | null
  client: BranchMinimal
  delivery_address: Address
  pickup_address: Address
  customer: Customer
  total_order_value: number
  delivery: string
  distance: number | null
  status:
    | 'new'
    | 'searching_drivers'
    | 'prompting_driver'
    | 'assigned'
    | 'failed'
    | 'order_failed'
    | 'client_reached'
    | 'transitioning'
    | 'delivering'
    | 'driver_reached'
    | 'customer_reached'
    | 'paid'
    | 'settled'
    | 'cancelled'
    | 'acquired'
    | 'deposited'
  added_at: string
  reached_client_at: string
  delivered_at: string
  client_is_paid_at: string
  paid_driver: string
  added_by: User | null
  payment_type: 'cash' | 'visa' | 'mastercard'
  notes: Note[]
}

export interface OrderItem {
  id?: string
  name: string
  description: string
  price: number
  code: number
  qty: number
}

export interface AutoCancelledOrder {
  id: string
  date: string
  time: string
  customer: Customer
  client: Client
  distance: number
  city: string
  value: number
  delivery_fee: number
  location: Location | null
  paymentType: 'cash' | 'visa' | 'mastercard'
  timeLeft: number // the remained time before the order is auto cancelled
  items: Item[]
}
//--------------------------------------------------------------------

//------------------------- Areas ----------------------------
export interface Currency {
  id: string
  name: string
  symbol: string
  symbol_native: string
  code: string
  decimal_digits: number
  rounding: number
  name_plural: string
  is_supported: boolean
}

export interface CurrencyMinimal {
  id: string
  symbol: string
}

export interface Country extends Pricing {
  id: string
  name: string
  price_unit: CurrencyMinimal
  order_fees: number
  driver_fees: number
}

export interface CountryMinimal {
  id: string
  name: string
  price_unit: Currency
  order_fees: number
}

export interface Governorate extends Pricing {
  id: string
  name: string
  country: Country
  order_fees: number
}

export interface GovernorateMinimal {
  id: string
  name: string
}

export interface City extends Pricing {
  id: string
  name: string
  governorate: Governorate
  geofence: Geofence
  order_fees: number
  areas: Geofence[]
}

export interface CityMinimal {
  id: string
  name: string
  areas: Geofence[]
}

export interface Address {
  id: string
  decoded_address: string
  country: CountryMinimal
  governorate: GovernorateMinimal
  city: CityMinimal
  longitude: number
  latitude: number
  map_link: string
}
//--------------------------------------------------------------------

//------------------------- Clients ----------------------------
interface Client {
  id: string
  name: string
  image: string
  address: string
  phone: string
}

export interface Account {
  id: string
  name: string
  discount_percentage: number
  website: string
  phone_number: string
  teams: TeamMinimal[]
  branches: BranchMinimal[]
}

export interface AccountMinimal {
  id: string
  name: string
}

export interface Branch {
  id: string
  address: Address
  supervisor: User
  account: AccountMinimal
  order_fees: number
  driver_fees: number
  phone_number: string
  main: boolean
}

export interface BranchMinimal {
  id: string
  account: AccountMinimal
  supervisor: UserAccess
  address: Address
}
//--------------------------------------------------------------------

//------------------------- Reports --------------------------------
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
//--------------------------------------------------------------------

//------------------------- Support --------------------------------
export interface ChatMessage {
  id: string
  senderId: string
  content: string
  timestamp: {
    seconds: number
    nanoseconds: number
  }
  type: 'support' | 'customer'
}

export interface Chat {
  id: string
  customerName: string
  unread: number
  status: 'opened' | 'closed'
  messages?: ChatMessage[]
  lastUpdate: Date
}

export interface SupportTeamMember {
  id: number
  name: string
}
//--------------------------------------------------------------------

//------------------------- Settings --------------------------------
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
//--------------------------------------------------------------------

//------------------------- Additional Interfaces --------------------------------
export interface Location {
  latitude: number
  longitude: number
}

export interface Note {
  id: string
  added_at: string
  description: string
}

export interface SubLink {
  title: string
  isActive?: boolean
  href?: string
}

export interface Status {
  value: string
  checked: boolean
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

export interface GeofenceVertex extends Location {}

export interface Geofence {
  id: number
  name: string
  vertices: GeofenceVertex[]
}

export type APIRecord = APIDriver | Order | Account | Branch

export interface APIResponse {
  count: number
  next: string
  previous: string
  results: any[]
}

export interface GeoJSONObject {
  type: string
  properties: any
  geometry: {
    type: string
    coordinates: GeoJSONCoordinate[][]
  }
}

export type GeoJSONCoordinate = number[]
//--------------------------------------------------------------------
export interface Pagination {
  limit: number
  offset: number
  total: number
  page: number
}
