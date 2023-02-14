import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import styles from '../styles/navbar.module.css'

export default function Navbar() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(true)

  const HamburgerMenu = () => {
    return (
      <>
      {isOpen ? 
        <div className={styles.container} onClick={() => setIsOpen(false)}>
          <div className={styles.bar1}></div>
          <div className={styles.bar2}></div>
          <div className={styles.bar3}></div>
        </div>
        :
        <div className={styles.change} onClick={() => setIsOpen(true)}>
          <div className={styles.bar1}></div>
          <div className={styles.bar2}></div>
          <div className={styles.bar3}></div>
        </div>
      }
      </>
    )
  }

  const NavDropDown = () => {
    return (
      !isOpen ? 
        <div id="mySidenav" className={styles.sidenav}>
          {/* <a className={styles.clsBtn} onclick="closeNav()">&times;</a> */}
          <Link href="/" legacyBehavior>
            <a className={router.pathname == "/" ? styles.linkNavbarActive : styles.linkNavbar}>
              Home
            </a>
            </Link>
          <Link href="/blogs" legacyBehavior>
            <a className={router.pathname == "/blogs" ? styles.linkNavbarActive : styles.linkNavbar}>
              Articles
            </a>
          </Link>
          <Link href="/users" legacyBehavior>
            <a className={router.pathname == "/users" ? styles.linkNavbarActive : styles.linkNavbar}>
              Users
            </a>
          </Link>
          <Link href="/users/register" legacyBehavior>
            <button className={router.pathname == "/users/register" ? "btn-secondary" : "btn-secondary"}>
              Register
            </button>
          </Link> 
        </div>
      : null
        // <div id="mySideNav" className={styles.sidenavClose}>
        //   {/* <a className={styles.clsBtn} onclick="closeNav()">&times;</a> */}
        //   <a>About</a>
        //   <a>Services</a>
        //   <a>Clients</a>
        //   <a>Contact</a>
        // </div>
    )
  }

  return (
    <div className={styles.navbar}>
      <Link href="/" legacyBehavior><h3 className={styles.companyName}>Synapsis Challange</h3></Link>
      <HamburgerMenu />
      <NavDropDown />
      <div className={styles.navbarRight}>
        <Link href="/" legacyBehavior>
          <a className={router.pathname == "/" ? styles.linkNavbarActive : styles.linkNavbar}>
            Home
          </a>
          </Link>
        <Link href="/blogs" legacyBehavior>
          <a className={router.pathname == "/blogs" ? styles.linkNavbarActive : styles.linkNavbar}>
            Articles
          </a>
        </Link>
        <Link href="/users" legacyBehavior>
          <a className={router.pathname == "/users" ? styles.linkNavbarActive : styles.linkNavbar}>
            Users
          </a>
        </Link>
        <Link href="/users/register" legacyBehavior>
          <button className={router.pathname == "/users/register" ? "btn-secondary" : "btn-secondary"}>
            Register
          </button>
        </Link> 
      </div>
    </div>
  )
}
