import { useRouter } from 'next/router'
import axios from 'axios';
import styles from '../../styles/comments.module.css'
import btn from '../../styles/blogDetail.module.css'


export default function CommentsPost({ userComments, ...props }) {
  const router = useRouter();
  const postId = router.query.postId;

  const handleCommentPostUser = async(event) => {
    event.preventDefault()
    const comment = {
      post_id : postId,
      name : event.target.name.value,
      email : event.target.email.value,
      body : event.target.comment.value
    }
    
    await axios.post(`https://gorest.co.in/public/v2/posts/${postId}/comments/?access-token=c86bdd87d5714dddfdf57887c16ede322f59d3cb76c13b677c2a1f0a59cfe411`, {
      post_id : postId,
      name : comment.name,
      email : comment.email,
      body : comment.body
    })
    .then(() => {
      alert(`Berhasil comment`)
      router.reload(window.location.pathname)
    })
    .catch(error => {
      console.log(error)
    })
    console.log(comment)
  }

  return (
    <>
      <div className={styles.commentsContainer}>
        <h3 className='title-h3'>Comments</h3>
        {userComments.map((item, i) => {
            return (
              <div key={i} className={styles.userComments}>
                <h3>{item.name}</h3>
                <p>{item.body}</p>
              </div>
            )
          })}
        <form className={styles.formComment} onSubmit={handleCommentPostUser}>
          <h3>Create a comment</h3>
          <div className={styles.formCommentData}>
            <div className={styles.form}>
              <p>Name</p>
              <input id="name" name='name' type="text" placeholder='Input your name...' required />
            </div>
            <div className={styles.form}>
              <p>Email</p>
              <input id="email" name='email' type="text" placeholder='Input your email...' required />
            </div>
          </div>
          <div className={styles.formSubmitData}>
            <textarea id="comment" name='comment' type="text" placeholder='Comments..' required />
            <button className='btn-secondary' type='submit'>Post Comment</button>
          </div>
        </form>
        <button className={btn.btnLink} onClick={() => props.handleCloseComments()}>Close Comments</button>
      </div>
    </>
  )
}
