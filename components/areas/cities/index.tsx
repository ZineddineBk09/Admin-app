import { City } from '../../../interfaces'
import React from 'react'
import { AddCity } from './add-city'
import { SearchCity } from './city/card'
import dynamic from 'next/dynamic'
import { useAreasCitiesContext } from '../../../context/areas/cities'
import Loading from '../../../components/shared/loading'
import InfiniteScroll from 'react-infinite-scroll-component'
const CityCard = dynamic(() => import('./city/card'), {
  ssr: false,
  loading: () => <Loading />,
})

const Cities = () => {
  const { cities, hasMore, fetchNextPage, isFetching } = useAreasCitiesContext()

  return (
    <div className='w-full mx-auto flex flex-col items-center gap-y-6'>
      <SearchCity />

      {/* Cities list */}
      <div className='w-full'>
        <InfiniteScroll
          dataLength={cities?.length}
          hasMore={hasMore}
          next={fetchNextPage}
          loader={
            <span className='font-bold text-lg text-center'>Loading...</span>
          }
          endMessage={<div className='w-1/2 h-1 bg-gray-500' />}
          className='w-full flex flex-col items-center gap-y-6'
        >
          {cities?.map((city: City) => (
            <CityCard key={city?.id} city={city} />
          ))}
        </InfiniteScroll>
      </div>

      {/* Add city btn */}
      <AddCity />
    </div>
  )
}

export default Cities
