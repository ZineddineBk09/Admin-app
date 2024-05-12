import dynamic from 'next/dynamic'
import { useCurrentRole } from '../../hooks/current-role'
const Link = dynamic(() => import('next/link'))
const Image = dynamic(() => import('next/image'))

const Logo = ({ className = '' }: { className?: string }) => {
  const role = useCurrentRole()
  return (
    <Link
      href={role === 'admin' ? '/admin/dashboard' : ''}
      prefetch={false}
      passHref
      className={`relative w-20 sm:w-24 md:w-40 ${className}`}
    >
      <Image
        src='/images/logo.png'
        alt='Company'
        width={150}
        height={150}
        className='object-contain w-full h-full'
      />
    </Link>
  )
}

export default Logo
