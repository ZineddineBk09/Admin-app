import Loading from '../../components/shared/loading'
import type { NextPage } from 'next'
// import { Content } from '../../components/map/content'
import dynamic from 'next/dynamic'
const Content = dynamic(
  () => import('../../components/map/content').then((mod) => mod.Content),
  {
    ssr: false,
    loading: () => <Loading />,
  }
)

const MapPage: NextPage = () => {
  return <Content />
}

export default MapPage
