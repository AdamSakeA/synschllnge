import SettingsUser from '../../../components/UserComponents/SettingsUser'
import Layout from '../../../components/Layout'
import { useRouter } from 'next/router'

export default function settings() {
  const router = useRouter()
  
  return (
    <Layout title={"Settings"}>
      <a className='btn-link' onClick={() => router.back()}>Go Back</a>
      <h1 className='title-homepage'>Settings</h1>
      <SettingsUser />
    </Layout>
  )
}
