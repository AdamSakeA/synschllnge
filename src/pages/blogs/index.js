import BlogList from './bloglist'
import Layout from '../../components/Layout'

export default function Blogs() {
  return (
    <Layout title="Blogs Page">
        <h1>WELCOME TO BLOG</h1>  
        <BlogList />
    </Layout>
  )
}
