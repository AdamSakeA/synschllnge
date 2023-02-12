import RegisterUser from '../../components/UserComponents/RegisterUser'
import Layout from '../../components/Layout'

export default function register() {
  return (
    <Layout title={"Register Form"}>
      <h1>Register User</h1>
      <RegisterUser />
    </Layout>
  )
}
