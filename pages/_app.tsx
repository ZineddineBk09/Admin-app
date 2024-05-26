import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { NextUIProvider, createTheme } from '@nextui-org/react'
import { Layout } from '../components/layout/layout'
import { useRouter } from 'next/router'
import AuthGuard from '../components/guards/auth'
import { SessionProvider } from 'next-auth/react'
import { Toaster } from 'react-hot-toast'
import 'rsuite/dist/rsuite-no-reset.min.css'
import { CustomProvider } from 'rsuite'
import { publicRoutes } from '../routes'
import Head from 'next/head'
import { getPageTitle } from '../utils'

const theme = createTheme({
  type: 'light',
  theme: {
    colors: {
      yellow: '#000',
    },
  },
})

function MyApp({ Component, pageProps }: AppProps) {
  const pathname: string = useRouter().pathname
  const path: string = pathname.split('/')[1]
  const pageTitle: string = getPageTitle(pathname)
    ? 'FleetRun | ' + getPageTitle(pathname)
    : 'FleetRun'
  const { session }: any = pageProps

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <SessionProvider session={session}>
        <AuthGuard>
          <CustomProvider>
            <NextUIProvider theme={theme}>
              {publicRoutes.includes(path) ? (
                <main className='w-full h-fit flex flex-col items-center'>
                  <Component {...pageProps} />
                </main>
              ) : (
                <Layout>
                  <main className='w-full h-fit flex flex-col items-center'>
                    <Component {...pageProps} />
                  </main>
                </Layout>
              )}
            </NextUIProvider>
          </CustomProvider>
        </AuthGuard>
        <Toaster />
      </SessionProvider>
    </>
  )
}

export default MyApp
