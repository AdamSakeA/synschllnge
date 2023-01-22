import { useState, useEffect } from "react"
import axios from "axios"
import Link from "next/link"

export default function UserList() {
  const [userList, setUserList] = useState([])
  const [page, setPage] = useState(1)

  useEffect(() => {
    const getUsersList = async() => {
      await axios.get(`https://gorest.co.in/public/v2/users?page=${page}&per_page=10`)
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
  }, [page])


  const handleNextPagination = () => {
    setPage(prevPage => prevPage + 1)
  }

  const handlePrevPagination = () => {
    setPage(prevPage => prevPage - 1)
  }

  console.log(userList)
  return (
    <div>
      {userList.map((item, i) => {
        return (
          <div key={i}>
            <h2>{item.name}</h2>
            <p>{item.email}</p>
            <p>{item.status}</p>
            <Link href={`blogs/${item.id}`} legacyBehavior><a>See Details</a></Link>
          </div>
        )
      })}
      <div>
        <button onClick={() => handlePrevPagination()}>Prev Page</button>
        <button onClick={() => handleNextPagination()}>Next Page</button>
      </div>
    </div>
  )
}
