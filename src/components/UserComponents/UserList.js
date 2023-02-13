import { useState, useEffect } from "react"
import axios from "axios"
import Link from "next/link"

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


  return (
    <div>
      {userList.map((item, i) => {
        return (
          <div key={i}>
            <h2>{item.name}</h2>
            <p>{item.email}</p>
            <p>{item.status}</p>
            <Link href={{
                  pathname: "/users/[userId]",
                  query: {
                    userId: `${item.id}`
                  }
                }} legacyBehavior>See Details</Link>
          </div>
        )
      })}
    </div>
  )
}
