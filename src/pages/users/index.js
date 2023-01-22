import UserList from "@/pages/users/UserList"
import Layout from "@/components/layout"

export default function Users() {

  return (
    <Layout title="Users Page">
      <h1>Blog Users List</h1>
      <UserList />
    </Layout>
  )
}