import { useContext } from 'react'
import { AuthContext } from '../../context/client/AuthContext'
import './navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Navbar() {


  const navigate =useNavigate()

  const { user, dispatch } = useContext(AuthContext)

  const handleLogout = () => {
   
    dispatch({ type: "LOGOUT" });
  
   
    axios.post('/logout')
      .then((response) => {
        
        console.log("Logout successful", response.data);
     
        navigate("/login"); 
      })
      .catch((error) => {
       
        console.error("Logout failed", error);

      });
  };

 
  return (
    <div className='navbar'>
     <div className="navContainer">
        <span className="logo">WANDERINN</span>
        <div className="navItems">
        {user ? (
  <>
    <div className='userName'>{user.name}</div>
    <button className="navButton" onClick={handleLogout} >Logout</button>
  </>
) : (
  <>
    <Link to="/login">
      <button className="navButton">Login</button>
    </Link>
    <Link to="/register">
      <button className="navButton">Register</button>
    </Link>
  </>
)}

           
           
        </div>
     </div>
    </div>
  )
}
