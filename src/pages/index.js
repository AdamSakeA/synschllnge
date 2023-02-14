import Layout from "../components/Layout"
import Link from "next/link"
import styles from '../styles/homePage.module.css'
import Image from "next/image"
import imagePic from '../styles/assets/home-img.jpg'

export default function Home() {
  const HandleLink = (props) => {
    return (
      <Link href={props.url} legacyBehavior><button className="btn-primary">{props.values}</button></Link>
    )
  }

  return (
    <Layout title="Home Page">
      <div className={styles.bg}></div>
      <div className={styles.homePage}>
        <h1 className="title">Hallo!</h1>
        <h1 className="title-homepage">Welcome to synapsis challange</h1>
        <p className="desc">Please read readme.md for usage this fake article & this fake article use from https://gorest.co.in/</p>
        <div className={styles.buttonHomeContainer}>
          <HandleLink url={"/blogs"} values={"Articles List"} />
          <HandleLink url={"/users"} values={"Users List"} />
          <Link href={"/users/register"} legacyBehavior><button className="btn-secondary">Register</button></Link>      </div>
        </div>
    </Layout>
  )
}
