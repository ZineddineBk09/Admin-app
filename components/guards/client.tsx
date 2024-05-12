import { useRouter } from 'next/router'
import { useCurrentRole } from '../../hooks/current-role'

interface ClientGuardProps {
  children: React.ReactNode
}

export const ClientGuard = ({ children }: ClientGuardProps) => {
  const role = useCurrentRole()
  const router = useRouter()

  if (role !== 'client' && role !== 'branch') {
    // router.push('/404')
    return null
  }
  return <>{children}</>
}
