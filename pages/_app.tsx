import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { NextUIProvider } from '@nextui-org/react'
import { Layout } from '../components/layout/layout'
import { AuthContextProvider } from '@/context/AuthContext'
import { useRouter } from 'next/router'
import CheckAuthGuard from '@/components/guards/CheckAuthGuard'
import { MapContextProvider } from '@/context/MapContext'

function MyApp({ Component, pageProps }: AppProps) {
  const path = useRouter().pathname.split('/')[1]

  return (
    <AuthContextProvider>
      <CheckAuthGuard>
        <NextUIProvider>
          {path === '' || path === 'register' ? (
            <main className='w-full h-fit flex flex-col items-center'>
              <Component {...pageProps} />
            </main>
          ) : (
            <MapContextProvider>
              <Layout>
                <main className='w-full h-fit flex flex-col items-center'>
                  <Component {...pageProps} />
                </main>
              </Layout>
            </MapContextProvider>
          )}
        </NextUIProvider>
      </CheckAuthGuard>
    </AuthContextProvider>
  )
}

export default MyApp
