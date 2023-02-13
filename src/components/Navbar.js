import Link from "next/link"
import { useRouter } from "next/router"

export default function Navbar() {
  const router = useRouter()
  return (
    <div className="navbar">
      <Link href="/" legacyBehavior><h3 className="company-name">Synapsis Challange</h3></Link>
      <div className="navbar-right">
        <Link href="/" legacyBehavior><a className={router.pathname == "/" ? "link-navbar active" : "link-navbar"}>Home</a></Link>
        <Link href="/blogs" legacyBehavior><a className={router.pathname == "/blogs" ? "link-navbar active" : "link-navbar"}>Articles</a></Link>
        <Link href="/users" legacyBehavior><a className={router.pathname == "/users" ? "link-navbar active" : "link-navbar"}>Users</a></Link>
        <Link href="/users/register" legacyBehavior><button className={router.pathname == "/users/register" ? "link-navbar active" : "link-navbar"}>Register</button></Link> 
      </div>
    </div>
  )
}
