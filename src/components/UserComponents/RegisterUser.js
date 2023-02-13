import axios from "axios"
import { useRouter } from "next/router"

export default function RegisterUser() {
  const router = useRouter()
  const handleFormOnSubmit = async(event) => {
    event.preventDefault()
    const user = {
      name : event.target.name.value,
      email : event.target.email.value,
      gender : event.target.gender.value,
      status : event.target.status.value,
    }
    
    await axios.post(`https://gorest.co.in/public/v1/users?access-token=c86bdd87d5714dddfdf57887c16ede322f59d3cb76c13b677c2a1f0a59cfe411`, {
      name : user.name,
      email : user.email,
      gender : user.gender,
      status : user.status
    }) 
    .then(response => {
      alert(`Register berhasil ${response.data.data.name}`)
      router.push('/users')
    })
    .catch(error => {
      error.response.data.data.map(item => alert(`${item.field} ${item.message}`))
    })
  }
  
  return (
    <>
      <form onSubmit={handleFormOnSubmit}>
        <p>Name :</p>
        <input id="name" type="text" name="name" required/>
        <p>E-mail :</p>
        <input id="email" type="email" name="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required/>
        <p>Gender male / female :</p>
        <input id="gender" type="text" name="gender" required/>
        <p>Status active / inactive:</p>
        <input id="status" type="text" name="status" required/>
        <button type="submit">Register</button>
      </form>
    </>
  )
}
