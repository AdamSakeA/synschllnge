import axios from "axios"
import { useRouter } from "next/router" 
import styles from '../../styles/articlePost.module.css'

export default function UserPostBlog() {
  const router = useRouter()
  const userId = router.query.userId

  const postArticle = async(event) => {
    event.preventDefault()
    const userPostArticle = {
      user_id : userId,
      title : event.target.title.value,
      body : event.target.body.value,
    }

    await axios.post(`https://gorest.co.in/public/v2/users/${userId}/posts/?access-token=c86bdd87d5714dddfdf57887c16ede322f59d3cb76c13b677c2a1f0a59cfe411`, 
    {
      user_id : userId,
      title : userPostArticle.title,
      body : userPostArticle.body,
    })
    .then(() => {
      alert(`Article success to post`)
      router.reload(window.location.pathname)
    })
    .catch(error => {
      console.log(error)
    })
  }
  return (
    <form className={styles.formPostArticle} onSubmit={postArticle}>
      <div className={styles.articlePostContainer}>
        <h3 className="title-h3">Post Article</h3>
        <div className={styles.titlePostContainer}>
          <p>Title</p>
          <input id="title" name="title" type="text" placeholder='Title Article' required/>
          <p>Body</p>
          <textarea id="body" name="body" type="text" placeholder='Contents' required/>
        </div>
      </div>
      <button className="btn-secondary" type="submit">Post</button>
    </form>
  )
}
