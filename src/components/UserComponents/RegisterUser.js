import axios from "axios"
import { useCookies } from 'react-cookie'

export default function RegisterUser() {
  const [cookies, setCookies] = useCookies(['name'])

  const handleFormOnSubmit = async(event) => {
    event.preventDefault()
    const user = {
      name : event.target.name.value,
      email : event.target.email.value,
      gender : event.target.gender.value,
      status : event.target.status.value,
    }
    const expires = new Date()
    
    await axios.post(`https://gorest.co.in/public/v1/users?access-token=c86bdd87d5714dddfdf57887c16ede322f59d3cb76c13b677c2a1f0a59cfe411`, {
      name : user.name,
      email : user.email,
      gender : user.gender,
      status : user.status
    }) 
    .then(response => {
      alert(`Register berhasil ${response.data.data.name}`)
      console.log(response.data.data.id)
      expires.setTime(expires.getTime() + (response.data.data.expires_in * 1000))
      setCookies([('name', user.name, { path : '/'})])
    })
    .catch(error => {
      error.response.data.data.map(item => alert(`${item.field} ${item.message}`))
    })

  }
  
  console.log(cookies.name)
  
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