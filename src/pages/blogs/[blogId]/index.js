import BlogDetail from '../../../components/blogdetail/BlogDetail'
import Layout from '../../../components/Layout'
import { useRouter } from 'next/router'

export default function Blog() {
  const router = useRouter()

  return (
    <Layout title="Blog Detail">
      <a onClick={() => {router.back()}}>Go Back</a>
      <h1>Blog Detail</h1>
      <BlogDetail />
    </Layout>
  )
}
