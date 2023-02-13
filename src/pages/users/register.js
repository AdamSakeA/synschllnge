import RegisterUser from '../../components/UserComponents/RegisterUser'
import Layout from '../../components/Layout'

export default function register() {
  return (
    <Layout title={"Register Form"}>
      <h1 className='title-homepage'>Register User</h1>
      <p className='desc'>Please do not post your personal data</p>
      <RegisterUser />
    </Layout>
  )
}
