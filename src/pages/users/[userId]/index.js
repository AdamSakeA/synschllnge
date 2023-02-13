import UserDetail from '../../../components/UserComponents/UserDetail'
import Layout from '../../../components/Layout'
import { useRouter } from 'next/router'

export default function User() {
  const router = useRouter()
  return (
    <Layout title={"User Detail"}>
      <a className='btn-link' onClick={() => {router.back()}}>Go Back</a>
      <UserDetail />
    </Layout>
  )
}
