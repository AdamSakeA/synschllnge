import { useState, useEffect } from "react"
import axios from "axios"
import Link from "next/link"
import styles from '../../styles/userList.module.css'

export default function UserList() {
  const [userList, setUserList] = useState([])

  useEffect(() => {
    const getUsersList = async() => {
      await axios.get(`https://gorest.co.in/public/v2/users/?access-token=c86bdd87d5714dddfdf57887c16ede322f59d3cb76c13b677c2a1f0a59cfe411`)
      .then(response => {
        setUserList(response.data)
      })
      .catch((error) => {
        if (error) {
            console.log(error.response.data);
        }
      })
    }

    getUsersList()
  }, [])

  const searchUserByName = async(search) => {
    if(search.length > 0) {
      await axios.get(`https://gorest.co.in/public/v2/users?name=${search}`)
      .then(response => {
        setUserList(response.data)
      })
      .catch(error => {
        console.log(error)
      })
    } else {
      await axios.get(`https://gorest.co.in/public/v2/users/?access-token=c86bdd87d5714dddfdf57887c16ede322f59d3cb76c13b677c2a1f0a59cfe411`)
      .then(response => {
        setUserList(response.data)
      })
      .catch((error) => {
        if (error) {
          console.log(error.response.data);
        }
      })
    }
  }

  return (
    <>
      <input className={styles.inputUser} type="text" id="name" name="name" placeholder="Search user by name" onChange={(e) => searchUserByName(e.target.value)}/>
      <div className={styles.userListContainer}>
        {userList.map((item, i) => {
          return (
            <>
              <Link href={{
                pathname: "/users/[userId]",
                query: {
                  userId: `${item.id}`
                }
              }} legacyBehavior>
                <div key={i} className={styles.userContainer}>
                  <h2 className="title-h3">{item.name}</h2>
                  <p className="desc">{item.email}</p>
                  <p className={styles.statusUser}>{item.status}</p>
                  <a className="btn-link">See Details</a>
                </div>
              </Link>
            </>
          )
        })}
      </div>
    </>
  )
}
