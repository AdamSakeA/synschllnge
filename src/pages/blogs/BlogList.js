import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"
import styles from '../../styles/blog.module.css'

export default function BlogList() {
  const [blogList, setBlogList] = useState([])
  const [page, setPage] = useState(1)

  useEffect(() => {
    const getBlogList = async() => {
      await axios.get(`https://gorest.co.in/public/v2/posts?page=${page}&per_page=10`)
      .then(response => {
        setBlogList(response.data)
      })
      .catch((error) => {
        if (error) {
            console.log(error.response.data);
        }
      })
    }

    getBlogList()
    
  }, [page])
  
  const handleNextPagination = () => {
    setPage(prevPage => prevPage + 1)
  }

  const handlePrevPagination = () => {
    setPage(prevPage => prevPage - 1)
  }
  
  return (
    <>
      <div className={styles.blog}>
        {blogList.map((item, i) => {
          return (
            <div key={i} className={`blog-contents ${styles.blogListContents}`}>
              <Link href={{
                pathname: "/blogs/[blogId]",
                query: {
                  blogId: `${item.user_id}`,
                }
              }}
              legacyBehavior
            ><a className={styles.blogLink}>{item.title}</a></Link>
            </div>
          )
        })}
      </div>
      <div>
        {page === 1 ? 
          <button onClick={() => handlePrevPagination()} disabled>Prev Page</button> :
          <button onClick={() => handlePrevPagination()}>Prev Page</button>
        }
        <button onClick={() => handleNextPagination()}>Next Page</button>
      </div>
    </>
  )
}
