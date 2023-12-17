import { BBox } from '@/interfaces'
import axios from 'axios'
import { getSession } from 'next-auth/react'

export const getDriversInArea = async (bbox: BBox) => {
  const { min_lat, max_lat, min_lng, max_lng } = bbox
  const session: any = await getSession()

  try {
    const res = await axios.get(
      process.env.NEXT_PUBLIC_MAP_API_URL + '/map' || '',
      {
        params: {
          min_lat,
          max_lat,
          min_lng,
          max_lng,
        },
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }
    )

    if (res.data.length > 0) {
      const drivers = res.data.map(async (driver: any) => {
        // Take driver location from the map API
        const location = {
          latitude: driver.location.lat || 0,
          longitude: driver.location.lng || 0,
        }

        // Get driver details from the driver API
        const driverRes = await axios.get(
          process.env.NEXT_PUBLIC_API_URL + `/driver/dis/${driver.id}`,
          {
            headers: {
              Authorization: `Bearer ${session?.accessToken}`,
            },
          }
        )

        return {
          ...driverRes.data.data,
          location,
        }
      })

      // Use Promise.all to wait for all Promises to resolve
      const arrayDrivers = await Promise.all(drivers)

      return arrayDrivers
    }
  } catch (err) {
    console.log('error in getDriversInArea', err)
    return [] as any
  }
}
