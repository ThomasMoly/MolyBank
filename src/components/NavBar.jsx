import React, { useContext } from 'react'
import '../CSS/navbar.css'
import { Link } from 'react-router-dom'
import { UserContext } from './user'

const CustomLink = ({to, children, ...props}) => {
  
  return (
    <li>
        <Link to={to} {...props}>{children}</Link>
    </li>
  )
}


const NavBar = () => {
  const { user } = useContext(UserContext);


  return (
    <nav className='Nav'>
     <Link to='/' className='site-title'><img src='/logo.png'/><h2 className='name'>MolyBank</h2></Link>   
     
    <ul>
        <CustomLink to='/'>Movies</CustomLink>
        <CustomLink to='/Books'>Books</CustomLink>
        <CustomLink to='/TVShows'>TV Shows</CustomLink>
        {user ? (
          <li>Welcome {user.name}</li>
        ) : (
          <CustomLink to='/Login'>Login</CustomLink>
        )}  
    </ul>
    </nav>
  )
}

export default NavBar