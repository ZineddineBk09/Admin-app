import {
  Account,
  AutoCancelledOrder,
  Branch,
  Driver,
  DriverType,
  Order,
} from '../../interfaces'
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

export const searchAutoCancelledOrders = (
  list: AutoCancelledOrder[],
  pattern: string
) => {
  const fuse = new Fuse(list, {
    ...options,
    keys: ['clientName', 'city', 'id', 'phone', 'address'],
  })

  return fuse.search(pattern)?.map((item) => item.item)
}

export const searchDrivers = (list: Driver[], pattern: string) => {
  const fuse = new Fuse(list, {
    ...options,
    keys: ['username', 'email', 'team', 'phone'],
  })

  return fuse.search(pattern)?.map((item) => item.item)
}

export const searchReports = (list: any[], pattern: string) => {
  const fuse = new Fuse(list, {
    ...options,
    keys: ['id', 'clientEmail', 'clientPhone', 'client'],
  })

  return fuse.search(pattern)?.map((item) => item.item)
}

export const searchMembers = (list: any[], pattern: string) => {
  const fuse = new Fuse(list, {
    ...options,
    keys: ['id', 'name'],
  })

  return fuse.search(pattern)?.map((item) => item.item)
}
