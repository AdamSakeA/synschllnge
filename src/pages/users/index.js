import UserList from '../../components/UserComponents/UserList'
import Layout from '../../components/Layout'

export default function Users() {

  return (
    <Layout title="Users Page">
      <h1 className='title-homepage'>Blog Users List</h1>
      <UserList />
    </Layout>
  )
}