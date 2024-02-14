import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { NextUIProvider, createTheme } from '@nextui-org/react'
import { Layout } from '../components/layout/layout'
import { useRouter } from 'next/router'
import CheckAuthGuard from '../components/guards/check-auth-guard'
import { MapContextProvider } from '../context/map'
import { SessionProvider } from 'next-auth/react'
import { Toaster } from 'react-hot-toast'
import 'rsuite/dist/rsuite-no-reset.min.css'
import { CustomProvider } from 'rsuite'

const theme = createTheme({
  type: 'light',
  theme: {
    colors: {
      yellow: '#000',
    },
  },
})

function MyApp({ Component, pageProps }: AppProps) {
  const path = useRouter().pathname.split('/')[1]
  const { session }: any = pageProps

  return (
    <SessionProvider session={session}>
      <CheckAuthGuard>
        <CustomProvider>
          <NextUIProvider theme={theme}>
            {path === '' ||
            // check if path contains 'admin' or 'customer'
            path === 'customer' ? (
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
        </CustomProvider>
      </CheckAuthGuard>
      <Toaster />
    </SessionProvider>
  )
}

export default MyApp
