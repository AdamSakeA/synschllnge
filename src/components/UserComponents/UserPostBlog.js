import axios from "axios"
import { useRouter } from "next/router" 

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
    <>
      <h3>Post Article</h3>
      <form onSubmit={postArticle}>
        <p>Title</p>
        <input id="title" name="title" type="text" placeholder='Title Article'/>
        <p>Body</p>
        <input id="body" name="body" type="text" placeholder='Contents'/>
        <button type="submit">Post</button>
      </form>
    </>
  )
}
