import { BBox } from '@/interfaces'
import axios from 'axios'
import { getSession } from 'next-auth/react'

export const getDriversInArea = async (bbox: BBox) => {
  const drivers: any = []
  const { min_lat, max_lat, min_lng, max_lng } = bbox
  const url = 'http://194.233.173.78:8000/api/v1/map'
  const session: any = await getSession()

  try {
    //'http://194.233.173.78:2110/api/v1/map?min_lat=16.9&max_lat=30.9&min_lng=38.02&max_lng=50.03
    await axios
      .get(process.env.NEXT_PUBLIC_MAP_API_URL + '/map' || '', {
        params: {
          min_lat,
          max_lat,
          min_lng,
          max_lng,
        },
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      })
      .then((res) => {
        console.log('res 1: ', res.data)
        /* {
		          "id": "1",
		          "location": {
			        "lng": 38.026428,
			        "lat": 16.909683
		          },
		        "action": "inside"
	          } */
        if (res.data.length > 0) {
          res.data.map(async (driver: any) => {
            await axios
              .get(process.env.NEXT_PUBLIC_API_URL + `/driver/dis/${driver.id}`)
              .then((res) => {
                console.log('res 2: ', res.data)
                drivers.push(res.data)
              })
          })
        }
      })

    return drivers
  } catch (err) {
    console.log('err: ', err)
    return drivers
  }
}
