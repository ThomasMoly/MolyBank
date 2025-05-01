import React, { useState, useEffect, use } from 'react'
import '../CSS/login.css'
import { Link, useNavigate } from 'react-router-dom'
import { accountLogin } from '../appwrite/appwrite_SignUp'
import { UserContext } from '../components/user.jsx'
import { useContext } from 'react'



const CustomLink = ({to, children, ...props}) => {
  
  return (
    <li>
        <Link to={to} {...props}>{children}</Link>
    </li>
  )
}

  
const Login = () => {
  const [newEmail, setNewEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate()

  const emailChange = (event) => {
    const email = event.target.value;
    setNewEmail(email);
  }

  const passwordChange = (event) => {
    const password = event.target.value;
    setNewPassword(password);
  }

  const create = async (event) => {
    event.preventDefault()
    try {
      const result = await accountLogin(newEmail, newPassword);
      console.log(result);
      setUser({
        name: result.name,
        userId: result.$id,
      });
  
      navigate('/')
    } catch (error) {
      console.error(error);
    }
  }

  return (
   <main className='login-page'>
      
  <div className="login-container">
    <h2>Login</h2>
    <form onSubmit={create}>
      <input type="email" placeholder="Email" required onChange={emailChange}/>
      <input type="password" placeholder="Password" required onChange={passwordChange}/>
      <button type="submit">Log In</button>
    </form>
    <p className='sign'>Don't have an account? <CustomLink to = {'/SignUp'}>SignUp</CustomLink></p>
    </div>
   </main>
  )
}

export default Login