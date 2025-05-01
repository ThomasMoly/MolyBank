import React, { use, useState, useEffect } from 'react'
import '../CSS/login.css'
import {createAccount} from '../appwrite/appwrite_SignUp'
import { Link, useNavigate } from 'react-router-dom'


const SignUp = () => {
  const [newEmail, setNewEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newUsername, setNewUsername] = useState('')
  const navigate = useNavigate()


  const emailChange = (event) => {
    const email = event.target.value;
    setNewEmail(email);
  }

  const passwordChange = (event) => {
    const password = event.target.value;
    setNewPassword(password);
  }

  const usernameChange = (event) => {
    const username = event.target.value;
    setNewUsername(username);
  }

  const create = async (event) => {
    try {
      event.preventDefault()
      const result = await createAccount(newEmail, newPassword, newUsername);
      console.log(result);
      navigate('/Login')
    } catch (error) {
      console.error(error);
    }
  }

  

  return ( 
    <main className='login-page'>
      
    <div className="login-container">
      <h2>Sign Up</h2>
      <form onSubmit={create}>
        <input type="email" placeholder="Email" required onChange={emailChange}/>
        <input type="password" placeholder="Password" required onChange={passwordChange}/>
        <input type="text" placeholder="username" required onChange={usernameChange}/>
        <button type="submit">Sign Up</button>
      </form>
      </div>
     </main>
  )
}

export default SignUp