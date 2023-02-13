import axios from "axios"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Link from "next/link"
import styles from '../../styles/blog.module.css'
import UserPostBlog from "./UserPostBlog"

export default function UserDetail() {
  const router = useRouter()
  const userId = router.query.userId
  const [userData, setUserData] = useState({})
  const [userPost, setUserPost] = useState([])

  useEffect(() => {
    const getUser = async(userId) => {
      await axios.get(`https://gorest.co.in/public/v2/users/${userId}/?access-token=c86bdd87d5714dddfdf57887c16ede322f59d3cb76c13b677c2a1f0a59cfe411`)
      .then(response => {
        setUserData(response.data)
      })
      .catch(error => {
        console.log(error)
      })
    }

    getUser(userId)
  }, [userId])

  useEffect(() => {
    const getUserPost = async(userId) => {
      await axios.get(`https://gorest.co.in/public/v2/users/${userId}/posts/?access-token=c86bdd87d5714dddfdf57887c16ede322f59d3cb76c13b677c2a1f0a59cfe411`)
      .then(response => {
        setUserPost(response.data)
      })
      .catch(error => {
        console.log(error)
      })
    }

    getUserPost(userId)
  }, [userId])

  const UserPosts = () => {
    return (
      <div>
        {userPost.length !== 0 ? 
          <div className={styles.blog}>
            {userPost.map((item,  i) => {
              return (
                <>
                  <Link href={{
                    pathname: "/blogs/[blogId]",
                    query: {
                      blogId: `${item.user_id}`,
                      postId: `${item.id}`
                    }
                  }} legacyBehavior>
                    <div key={i} className={`blog-contents ${styles.blogListContents}`}>
                      <h3 className={styles.blogLink}>{item.title}</h3>
                      <p>{item.body.slice(0,130)} ...</p>
                    </div>
                  </Link> 
                </>
              )
            })}
          </div> : 
          <p>No article</p>
        }
      </div>
    )
  }

  return (
    <>
    <div>
      <h2>{userData.name}</h2>
      <h3>{userData.email}</h3>
      <p>{userData.gender}</p>
      <p>{userData.status}</p>
    </div>
    <UserPostBlog />
    {userData.gender === "male" ? <h2>Him Articles</h2> : <h2>Her Articles</h2>}
    <UserPosts />
    </>
  )
}
