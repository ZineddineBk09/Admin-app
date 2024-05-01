import { useRouter } from 'next/router'
import { useCurrentRole } from '../../hooks/current-role'

interface AdminGuardProps {
  children: React.ReactNode
}

export const AdminGuard = ({ children }: AdminGuardProps) => {
  const role = useCurrentRole()
  const router = useRouter()

  if (role !== 'admin') {
    return null
  }
  return <>{children}</>
}
