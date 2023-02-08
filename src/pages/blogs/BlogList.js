import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"
import styles from '../../styles/blog.module.css'
import button from '../../styles/button.module.css'

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
            <>
            <Link href={{
              pathname: "/blogs/[blogId]",
              query: {
                blogId: `${item.user_id}`,
              }
            }}
            legacyBehavior>
              <div key={i} className={`blog-contents ${styles.blogListContents}`}>
                <h3 className={styles.blogLink}>{item.title}</h3>
                <p>{item.body.slice(0,130)} ...</p>
                <p>See Details</p>
              </div>
            </Link>
            </>
          )
        })}
      </div>
      <div className={button.btnContainer}>
        {page === 1 ? 
          <button className={`${button.btn}`} onClick={() => handlePrevPagination()} disabled>Prev Page</button> :
          <button className={`${button.btn}`} onClick={() => handlePrevPagination()}>Prev Page</button>
        }
        <button className={`${button.btn}`} onClick={() => handleNextPagination()}>Next Page</button>
      </div>
    </>
  )
}
