import { City } from '@/interfaces'
import React from 'react'
import { AddCity } from './add-city'
import { SearchCity } from './city'
import dynamic from 'next/dynamic'
import { useAreasCitiesContext } from '@/context/areas/CitiesContext'
const CityCard = dynamic(() => import('./city'), { ssr: false })

const Cities = () => {
  const { cities } = useAreasCitiesContext()

  return (
    <div className='w-full mx-auto flex flex-col items-center gap-y-6'>
      <SearchCity />
      <div className='w-full flex flex-col items-center gap-y-6'>
        {cities.map((city: City, index: number) => (
          <CityCard key={index} city={city} />
        ))}
      </div>
      <AddCity />
    </div>
  )
}

export default Cities
