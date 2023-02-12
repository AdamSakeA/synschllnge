import React from 'react'
import Link from 'next/link'
import styles from '../../styles/blog.module.css'
import router from 'next/router'

export default function BlogContainer(props) {

  return (
    <div className={styles.blog}>
      {/* {props.list.map((item,i) => {
        return (
          <div key={i}>
            {router.push(
              {
                pathname: "/blogs/[blogId]",
                query: {
                  blogId: `${item.user_id}`,
                  postId: `${item.id}`
                }
              },
              `/blogs/${item.user_id}?postId=${item.id}`,
              {shallow: true}
            )}
          </div>
        )
      })} */}
      {props.list.map((item, i) => 
        (
        <>
          <Link href={{
            pathname: "/blogs/[blogId]",
            query: {
              blogId: `${item.user_id}`,
              postId: `${item.id}`
            }
          }} key={i} legacyBehavior>
            <div className={`blog-contents ${styles.blogListContents}`}>
              <h3 className={styles.blogLink}>{item.title}</h3>
              <p>{item.body.slice(0,130)} ...</p>
            </div>
          </Link>
        </>
        )
      )}
    </div>
  )
}
