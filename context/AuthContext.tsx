import React from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/firebase/clientApp'
import Loading from '@/components/shared/Loading'
import { AuthUser } from '@/interfaces'
import { fetchAccount } from '@/utils'
import { useRouter } from 'next/router'

export const AuthContext = React.createContext({})

export const useAuthContext = () => React.useContext(AuthContext)

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [user, setUser] = React.useState<AuthUser>({ email: null, uid: null })
  const [loading, setLoading] = React.useState(true)
  const path = useRouter().pathname.split('/')[1]

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // get the other data from firestore collection "accounts" with user uid
        const userData = await fetchAccount(user!.uid)
        setUser({ uid: user.uid, ...userData } as any)
      } else {
        setUser({
          uid: null,
          email: null,
        })
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [path])

  return (
    <AuthContext.Provider value={{ user }}>
      {loading ? <Loading /> : children}
    </AuthContext.Provider>
  )
}
