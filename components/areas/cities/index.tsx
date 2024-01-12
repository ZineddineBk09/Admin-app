import { City } from '@/interfaces'
import React from 'react'
import { AddCity } from './add-city'
import { SearchCity } from './city'
import dynamic from 'next/dynamic'
import { useAreasCitiesContext } from '@/context/areas/cities'
import Loading from '@/components/shared/loading'
const CityCard = dynamic(() => import('./city'), {
  ssr: false,
  loading: () => <Loading />,
})

const Cities = () => {
  const { cities } = useAreasCitiesContext()

  return (
    <div className='w-full mx-auto flex flex-col items-center gap-y-6'>
      <SearchCity />

      {/* Cities list */}
      <div className='w-full flex flex-col items-center gap-y-6'>
        {cities?.map((city: City, index: number) => (
          <CityCard key={index} city={city} />
        ))}
      </div>

      {/* Add city btn */}
      <AddCity />
    </div>
  )
}

export default Cities
