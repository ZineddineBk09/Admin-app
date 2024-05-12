import { Branch } from '../../../../interfaces'
import React from 'react'
import { AddBranch } from './add-branch'
import { SearchBranch } from './branch'
import dynamic from 'next/dynamic'
const BranchCard = dynamic(() => import('./branch'), {
  ssr: false,
  loading: () => <Loading />,
})
import { useClientsBranchesContext } from '../../../../context/admin/clients/branches'
import Loading from '../../../../components/shared/loading'
import InfiniteScroll from 'react-infinite-scroll-component'

const Branches = () => {
  const { branches, hasMore, fetchNextPage } = useClientsBranchesContext()

  return (
    <div className='w-full mx-auto flex flex-col items-center gap-y-6'>
      <SearchBranch />

      <div className='w-full'>
        <InfiniteScroll
          dataLength={branches?.length}
          hasMore={hasMore}
          next={fetchNextPage}
          loader={
            <span className='font-bold text-lg text-center'>Loading...</span>
          }
          endMessage={<div className='w-1/2 h-1 bg-gray-500' />}
          className='w-full flex flex-col items-center gap-y-6'
        >
          {branches?.map((branch: Branch, index: number) => (
            <BranchCard key={branch.id} branch={branch} />
          ))}
        </InfiniteScroll>
      </div>
      <AddBranch />
    </div>
  )
}

export default Branches
