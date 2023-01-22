import Link from "next/link"

export default function Navbar() {

  return (
    <div className="navbar">
      <Link href="/" legacyBehavior><a className="link-navbar">Synapsis Challange</a></Link>
      <div className="navbar-right">
        <Link href="/" legacyBehavior><a className="link-navbar">Home</a></Link>
        <Link href="/blogs" legacyBehavior><a className="link-navbar">Blogs</a></Link>
        <Link href="/users" legacyBehavior><a className="link-navbar">Users</a></Link>
      </div>
    </div>
  )
}
