import { Branch } from '@/interfaces'
import React from 'react'
import { AddBranch } from './add-branch'
import { SearchBranch } from './branch'
import dynamic from 'next/dynamic'
const BranchCard = dynamic(() => import('./branch'), { ssr: false })
import { useClientsBranchesContext } from '@/context/clients/branches'
import { useRouter } from 'next/router'

const Branches = () => {
  const { branches } = useClientsBranchesContext()
  // get the ?branchId= query param
  const router = useRouter()
  const { branchId } = router.query
  
  
  // if branches contains the branchId, then scroll to it
  React.useEffect(() => {
    if (branchId && branches.some((branch: Branch) => branch.id === branchId)) {
      const branchElement = document.getElementById(branchId as string)
      branchElement?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [branchId, branches])
  
  return (
    <div className='w-full mx-auto flex flex-col items-center gap-y-6'>
      <SearchBranch />
      <div className='w-full flex flex-col items-center gap-y-6'>
        {branches?.map((branch: Branch, index: number) => (
          <BranchCard key={index} branch={branch} />
        ))}
      </div>
      <AddBranch />
    </div>
  )
}

export default Branches
