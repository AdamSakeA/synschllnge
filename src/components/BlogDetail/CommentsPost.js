import {useRef, useState, forwardRef} from 'react'
import blogDetail from '../../styles/blogDetail.module.css'


function CommentsPost({ userComments, ...props }, commentsRef) {
  // const commentsRef = useRef(null)
  // const [userComments, setUserComments] = useState([])
  // const [handleShowComments, setHandleShowComments] = useState(false)

  // const handleCommentPostUser = async(postId) => {
  //   await axios(`https://gorest.co.in/public/v2/posts/${postId}/comments`)
  //   .then(response => {
  //     setUserComments(response.data)
  //     setHandleShowComments(true)
  //   })
  //   .catch(error => {
  //     if(error) {
  //       console.log(error.response.data)
  //     }
  //   })
  //   handleClickCommentsRef()
  // }

  // const handleClickCommentsRef = () => {
  //   commentsRef.current.scrollIntoView({ behavior:"smooth" })
  // }

  // const handleCloseComments = () => {
  //   setHandleShowComments(false)
  // }

  return (
    <div ref={commentsRef} className={blogDetail.commentsUser}>
      {userComments.map((item, i) => {
        return (
          <div key={i}>
            <h3>{item.name}</h3>
            <p>{item.body}</p>
          </div>
        )
      })}
      <button onClick={() => props.handleCloseComments()}>Close Comments</button>
    </div>
  )
}

export default forwardRef(CommentsPost)