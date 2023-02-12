import Layout from "../components/Layout"
import Link from "next/link"

export default function Home() {

  const HandleLink = (props) => {
    return (
      <Link href={props.url} legacyBehavior><button className="link-navbar">{props.values}</button></Link>
    )
  }

  return (
    <Layout title="Home Page">
      <h1>WELCOME TO BLOG SYNOPSIS CHALLANGE</h1>
      <HandleLink url={"/blogs"} values={"Articles"} />
      <HandleLink url={"/users"} values={"Users"} />
    </Layout>
  )
}
