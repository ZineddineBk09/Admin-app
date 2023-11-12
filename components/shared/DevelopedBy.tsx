import Link from 'next/link'
import React from 'react'

const DevelopedBy = () => {
  return (
    <div className='my-5 flex items-center gap-1'>
      Developed by{' '}
      <Link
        href='https://www.linkedin.com/in/zineddine-benkhaled-b9b1a8195/'
        target='_blank'
        className='cursor-pointer'
      >
        <p className='text-primary-600 cursor-pointer hover:underline'>
          Zineddine Benkhaled
        </p>
      </Link>
    </div>
  )
}

export default DevelopedBy
