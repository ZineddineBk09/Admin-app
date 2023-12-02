import { Account, Branch, Driver, Governorate } from '@/interfaces'
import Fuse from 'fuse.js'

const options = {
  isCaseSensitive: false,
  includeScore: false,
  shouldSort: true,
  includeMatches: false,
  findAllMatches: false,
  minMatchCharLength: 1,
  location: 0,
  threshold: 0.6,
  distance: 100,
  useExtendedSearch: false,
  ignoreLocation: false,
  ignoreFieldNorm: false,
  fieldNormWeight: 1,
}

export const searchAccounts = (list: Account[], pattern: string) => {
  const fuse = new Fuse(list, {
    ...options,
    keys: ['name', 'city', 'phone', 'website'],
  })

  return fuse.search(pattern).map((item) => item.item)
}

export const searchOrders = (list: any[], pattern: string) => {
  const fuse = new Fuse(list, {
    ...options,
    keys: ['name', 'email', 'phone', 'emirate', 'area', 'location'],
  })

  return fuse.search(pattern).map((item) => item.item)
}

export const searchBranches = (list: Branch[], pattern: string) => {
  const fuse = new Fuse(list, {
    ...options,
    keys: [
      'name',
      'country',
      'governorate',
      'city',
      'phone',
      'supervisor',
      'clientAccount',
    ],
  })

  return fuse.search(pattern).map((item) => item.item)
}

export const searchDrivers = (list: Driver[], pattern: string) => {
  const fuse = new Fuse(list, {
    ...options,
    keys: ['username', 'email', 'team', 'phone'],
  })

  return fuse.search(pattern).map((item) => item.item)
}

export const searchReports = (list: any[], pattern: string) => {
  const fuse = new Fuse(list, {
    ...options,
    keys: ['id', 'clientEmail', 'clientPhone', 'client'],
  })

  return fuse.search(pattern).map((item) => item.item)
}
