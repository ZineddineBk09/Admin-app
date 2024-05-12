import Loading from '../../../components/shared/loading'
import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { MapContextProvider } from '../../../context/admin/map'
import { AdminGuard } from '../../../components/guards/admin'
const Content = dynamic(
  () =>
    import('../../../components/admin/map/content').then((mod) => mod.Content),
  {
    ssr: false,
    loading: () => <Loading />,
  }
)

const MapPage: NextPage = () => {
  return (
    <AdminGuard>
      <MapContextProvider>
        <Content />
      </MapContextProvider>
    </AdminGuard>
  )
}

export default MapPage
