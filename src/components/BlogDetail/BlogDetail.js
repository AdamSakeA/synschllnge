import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import CommentsPost from './CommentsPost'
import blogDetail from '../../styles/blogDetail.module.css'
import axios from 'axios'

export default function BlogDetail() {
  const router = useRouter()
  const commentsRef = useRef(null)
  const userId = router.query.blogId
  const [userDetail, setUserDetail] = useState([])
  const [userPost, setUserPost] = useState([])
  const [userComments, setUserComments] = useState([])
  const [handleShowComments, setHandleShowComments] = useState(false)
  
  useEffect(() => {
    const handleUserDetail = async(userId) => {
      await axios(`https://gorest.co.in/public/v2/users/${userId}`)
      .then(response => {
        setUserDetail([response.data])
      })
      .catch((error) => {
        if(error) {
          console.log(error.response.data)
        }
      })
    }
    
    handleUserDetail(userId)
  },[userId])
  

  useEffect(() => {
    const handlePostUser = async(userId) => {
      await axios(`https://gorest.co.in/public/v2/users/${userId}/posts`)
      .then(response => {
        setUserPost(response.data)
      })
      .catch(error => {
        if(error) {
          console.log(error.response.data)
        }
      })
    }
    
    handlePostUser(userId)
  }, [userId])

  const handleCommentPostUser = async(postId) => {
    await axios(`https://gorest.co.in/public/v2/posts/${postId}/comments`)
    .then(response => {
      setUserComments(response.data)
      setHandleShowComments(true)
    })
    .catch(error => {
      if(error) {
        console.log(error.response.data)
      }
    })
    handleClickCommentsRef()
  }

  // const ShowComments = () => {
  //   return (
  //     <div ref={commentsRef} className={blogDetail.commentsUser}>
  //       {handleShowComments ? 
  //       userComments.map((item, i) => {
  //         return (
  //           <div key={i}>
  //             <h3>{item.name}</h3>
  //             <p>{item.body}</p>
  //           </div>
  //         )
  //       }) : "" }
  //       {handleShowComments ? <button onClick={() => handleCloseComments()}>Close Comments</button> : ""}
  //     </div>
  //   )
  // }

  const handleClickCommentsRef = () => {
    commentsRef.current.scrollIntoView({ behavior:"smooth" })
  }

  const handleCloseComments = () => {
    setHandleShowComments(false)
  }

  return (
    <>
      {userDetail.map((item, i) => {
        return (
          <div key={i}>
            <h2>{item.name}</h2>
            <p>{item.email}</p>
            <p>{item.gender}</p>
          </div>
        )
      })}
      {userPost.map((item, i) => {
        return (
          <div className={blogDetail.test} key={i}>
            <h2>{item.title}</h2>
            <p>{item.body}</p>
            {handleShowComments ? 
              <button onClick={() => handleCommentPostUser(item.id)} disabled>See Comments</button> : 
              <button onClick={() => handleCommentPostUser(item.id)}>See Comments</button>  
            }
          </div>
        )
      })}
      {handleShowComments ? <CommentsPost userComments={userComments} handleCloseComments={handleCloseComments} ref={commentsRef}/> : "" }
    </>
  )
}
