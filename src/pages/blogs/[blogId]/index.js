import BlogDetail from '../../../components/BlogComponents/BlogDetail'
import Layout from '../../../components/Layout'
import { useRouter } from 'next/router'

export default function Blog() {
  const router = useRouter()

  return (
    <Layout title="Blog Detail">
      <a className='btn-link' onClick={() => {router.back()}}>Go Back</a>
      <h1 className='title-homepage'>Blog Detail</h1>
      <BlogDetail />
    </Layout>
  )
}
