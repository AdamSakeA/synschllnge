import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styles from '../../styles/settingsuser.module.css'

export default function SettingsUser() {
	const [isOpen, setIsOpen] = useState(true)
	const [userData, setUserData] = useState([])
	const router = useRouter()
	const userId = router.query.userId

	useEffect(() => {
		const getUser = async(userId) => {
			await axios.get(`https://gorest.co.in/public/v2/users/${userId}/?access-token=c86bdd87d5714dddfdf57887c16ede322f59d3cb76c13b677c2a1f0a59cfe411`)
			.then(response => {
				setUserData(response.data)
				console.log(response.data)
			})
			.catch(error => {
				console.log(error)
			})
		}

		getUser(userId)
	}, [userId])

	const submitDeleteUser = async() => {
		await axios.delete(`https://gorest.co.in/public/v2/users/${userId}/?access-token=c86bdd87d5714dddfdf57887c16ede322f59d3cb76c13b677c2a1f0a59cfe411`)
		.then(() => {
			alert("user berhasil di delete")
			router.push("/users")
		})
		.catch(error => {
			console.log(error)
		})
	}

	const handleSubmitUpdateUser = async(event) => {
		event.preventDefault()
		const user = {
			name : event.target.name.value,
			email : event.target.email.value,
			gender : event.target.gender.value,
			status : event.target.status.value,
		}
		await axios.put(`https://gorest.co.in/public/v2/users/${userId}/?access-token=c86bdd87d5714dddfdf57887c16ede322f59d3cb76c13b677c2a1f0a59cfe411`, {
			name : user.name,
			email : user.email,
			gender : user.gender,
			status : user.status
		})
		.then(() => {
			alert("Data berhasil di ubah")
			router.push(`/users/${userId}`)
		})
		.catch(error => {
			console.log(error)
		})
	}

	const UpdateUser = () => {
		return (
			<>
			<h3 className='title-h3'>Personal Information</h3>
			<form onSubmit={handleSubmitUpdateUser}>
				<div className={styles.formSettings}>
					<p>Name :</p>
					<input id="name" type="text" name="name" placeholder={userData.name} required/>
					<p>E-mail :</p>
					<input id="email" type="email" name="email" placeholder={userData.email}  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required/>
					<p>Gender male / female :</p>
					<input id="gender" type="text" name="gender" placeholder={userData.gender} required/>
					<p>Status active / inactive:</p>
					<input id="status" type="text" name="status" placeholder={userData.status} required/>
				</div>
					<button className='btn-secondary' type="submit">Update</button>
			</form>
			</>
		)
	}

	const DeleteUser = () => {
		return  (
			<div className={styles.deleteUserContainer}>
				<h3 className='title-h3'>Are your sure want to delete this user?</h3>
				<div className={styles.settingsBtnContainer}>
					<button className='btn-secondary' onClick={() => router.push(`/users/${userId}`)}>Cancel</button>
					<button className='btn-primary' onClick={() => submitDeleteUser()}>Delete</button>
				</div>
			</div>
		)
	}
  
    const BreadCrumbs = () => {
      return (
        <div className={styles.breadcrumbs}>
          <h4 className={isOpen ? "btn-link" : styles.titleBreadcrumbs} onClick={() => setIsOpen(true)}>Personal Information</h4>
          <h3>/</h3>
          <h4 className={!isOpen ? "btn-link" : styles.titleBreadcrumbs} onClick={() => setIsOpen(false)}>Delete User</h4>
        </div>
      )
    }
  return (
    <>
			<BreadCrumbs />
      {isOpen ? <UpdateUser /> : <DeleteUser />}
		</>
  )
}
