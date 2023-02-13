import SettingsUser from '../../../components/UserComponents/SettingsUser'
import Layout from '../../../components/Layout'

export default function settings() { 
  return (
    <Layout title={"Settings"}>
      <h1 className='title-homepage'>Settings</h1>
      <SettingsUser />
    </Layout>
  )
}
