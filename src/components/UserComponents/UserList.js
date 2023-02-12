import { useState, useEffect } from "react"
import axios from "axios"
import Link from "next/link"
import button from '../../styles/button.module.css'

export default function UserList() {
  const [userList, setUserList] = useState([])
  const [page, setPage] = useState(1)

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
  }, [page])


  // const handleNextPagination = () => {
  //   setPage(prevPage => prevPage + 1)
  // }

  // const handlePrevPagination = () => {
  //   setPage(prevPage => prevPage - 1)
  // }

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
      {/* <div className={button.btnContainer}>
        {page === 1 ? 
          <button className={button.btn} onClick={() => handlePrevPagination()} disabled>Prev Page</button> :
          <button className={button.btn} onClick={() => handlePrevPagination()}>Prev Page</button>
        }
        <button className={button.btn} onClick={() => handleNextPagination()}>Next Page</button>
      </div> */}
    </div>
  )
}
