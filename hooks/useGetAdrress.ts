// use https://api.geoapify.com/v1/geocode/autocomplete?REQUEST_PARAMS geo api to get all addresses
// return array of addresses
import { useEffect, useState } from 'react'

export function useGetAddresses(address: string) {
  const [addresses, setAddresses] = useState<any[]>([])
  const GEO_API_KEY = process.env.NEXT_PUBLIC_GEO_API_KEY || ''

  useEffect(() => {
    async function getAddresses() {
      await fetch(
        'https://api.geoapify.com/v1/geocode/autocomplete?text=' +
          address +
          '&format=json&apiKey=' +
          GEO_API_KEY
      )
        .then((res) => res.json())
        .then((data) => {
          const addresses = data.results.map((result: any) => {
            return {
              district: result.address_line1 || '',
              country: result.address_line2 || '',
            }
          })
          setAddresses(addresses)
        })
    }

    if (address.length < 3) return setAddresses([])

    getAddresses()
  }, [address, GEO_API_KEY])
  return {
    addresses,
    setAddresses,
  }
}
