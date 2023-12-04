import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { NextUIProvider } from '@nextui-org/react'
import { Layout } from '../components/layout/layout'
import { useRouter } from 'next/router'
import CheckAuthGuard from '@/components/guards/check-auth-guard'
import { MapContextProvider } from '@/context/map/MapContext'
import { SessionProvider } from 'next-auth/react'

function MyApp({ Component, pageProps }: AppProps) {
  const path = useRouter().pathname.split('/')[1]
  const { session }: any = pageProps

  return (
    <SessionProvider session={session}>
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
    </SessionProvider>
  )
}

export default MyApp
