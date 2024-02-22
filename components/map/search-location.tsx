import React, { useEffect, useMemo, useState } from 'react'
import { OpenStreetMapProvider } from 'leaflet-geosearch'
import { MapPinIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { truncateTxt } from '../../utils'
import { Divider, Tooltip } from '@nextui-org/react'
import { debounce, throttle } from 'lodash'

const SearchLocation = ({ formik }: { formik: any }) => {
  const [search, setSearch] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [abortController, setAbortController] =
    useState<AbortController | null>(null)

  // Debounce search requests
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSearch(value)
    formik.setValues({ ...formik.values, search: value })

    if (value?.length < 2) return setResults([])

    // Create a new AbortController for each request
    const newAbortController = new AbortController()
    setAbortController(newAbortController)

    const provider = new OpenStreetMapProvider()
    provider
      .search({ query: value })
      .then((results) => {
        setResults(results)
      })
      .catch((error) => console.error('Error searching location:', error))
  }

  const debouncedSearch = useMemo(() => debounce(handleSearch, 500), [])

  const handleCancel = () => {
    setResults([])
  }

  const handleSelect = (result: any) => {
    formik.setValues({
      ...formik.values,
      search: result.label,
      latitude: result.raw.lat,
      longitude: result.raw.lon,
    })
    setSearch(result.label)
    setResults([])
  }

  useEffect(() => {
    return () => abortController?.abort()
  }, [abortController])

  return (
    <div className='max-w-[380px] flex flex-col items-center gap-y-2'>
      <div className='w-full h-10 flex items-center gap-x-4 bg-gray-200 rounded px-4 shadow-md'>
        <input
          type='text'
          // value={search}
          onChange={debouncedSearch}
          className='h-full bg-transparent w-full outline-none'
          placeholder='Search Location'
        />
        {results?.length == 0 ? (
          <MapPinIcon className='h-8 text-gray-400' />
        ) : (
          <button
            className='h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-100'
            onClick={handleCancel}
          >
            <XMarkIcon />
          </button>
        )}
      </div>

      {/* Search results */}
      {results?.length > 0 && (
        <div className='w-full h-fit max-h-[300px] bg-white rounded shadow-lg overflow-y-auto'>
          {results?.map((result: any, index: number) => (
            <Tooltip key={index} content={result.label} trigger='hover'>
              <button
                className={`w-full h-fit flex flex-col items-start px-4 z-10 ${
                  index === 0 ? 'mt-2' : ''
                }`}
                onClick={() => handleSelect(result)}
              >
                <div className='w-full flex items-center justify-between text-left text-gray-500 rounded-md hover:bg-gray-100 hover:text-black'>
                  <span>{truncateTxt(result.label, 35)}</span>
                  <MapPinIcon className='h-4 ml-auto' />
                </div>
                {index !== results?.length - 1 ? (
                  <Divider className='w-[315px] mx-auto my-2' />
                ) : (
                  <div className='w-[315px] mx-auto my-2' />
                )}
              </button>
            </Tooltip>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchLocation
