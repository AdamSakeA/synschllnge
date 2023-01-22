import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Layout from '../../../components/Layout'

export default function BlogDetail() {
  const router = useRouter()
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
  }


  const ShowComments = () => {
    return (
      <div>
        {handleShowComments ? 
        userComments.map((item, i) => {
          return (
            <div key={i}>
              <h3>{item.name}</h3>
              <p>{item.body}</p>
            </div>
          )
        }) : "" }
      </div>
    )
  }

  const handleCloseComments = () => {
    setHandleShowComments(false)
  }

  return (
    <Layout title="Blog Detail">
      <a onClick={() => {router.back()}}>Go Back</a>
      <h1>Blog Detail</h1>
      {userDetail.map((item, i) => {
        return (
          <div key={i}>
            <p>{item.name}</p>
            <p>{item.email}</p>
            <p>{item.gender}</p>
          </div>
        )
      })}
      {userPost.map((item, i) => {
        return (
          <div key={i}>
            <h2>{item.title}</h2>
            <p>{item.body}</p>
            <button onClick={() => handleCommentPostUser(item.id)}>See Comments</button>
          </div>
        )
      })}
      <ShowComments />
      {handleShowComments ? <button onClick={() => handleCloseComments()}>Close Comments</button> : ""}
    </Layout>
  )
}
