import  './hotellogin.css'
import { Link } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast,Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HotelAuthContext } from '../../context/hotel/HotelContext'




export default function HotelLogin() {

    const [credentials,setCredentials]=useState({
        
        email:undefined,
        password:undefined
    })

   
    const navigate = useNavigate()
    const {hotel,dispatch}=useContext(HotelAuthContext)

   

    useEffect(() => {
       if(hotel){
        navigate('/hotel')
       }
    }, [hotel]);



    


   const handleChange =(e)=>{
    
    setCredentials(prev=>({...prev,[e.target.id]:e.target.value}))

   

   }

   const handleClick= async e =>{
    e.preventDefault()
    dispatch({type:'LOGIN_START'})
    try {
        const res = await axios.post("/hotel/login",credentials) 
        console.log(res)
        dispatch({type:"LOGIN_SUCCESS",payload: res.data})
        navigate("/hotel")
    } catch (error) {
        dispatch({type:'LOGIN_FAILURE',payload:error.response.data})
        toast.warn(error.response.data.message, {
          transition:Zoom,
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          
        });
    }

  
   
        
   }
   console.log(hotel);

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="illustration-wrapper">
          <img src="https://thumbs.dreamstime.com/b/d-hotel-tropics-building-palm-trees-white-40076095.jpg" alt="Login" />
        </div>
        <form  id="login-form">
          <p className="form-title">Welcome back</p>
          
          <div className="form-item">
            <label htmlFor="username">Email</label>
            <input
              onChange={handleChange}
              type="email"
              name="email"
              id="email"
              placeholder="email"
              required
            />
          </div>
          <div className="form-item">
            <label htmlFor="password">Password</label>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              id="password"
              placeholder="password"
              required
            />
            
          </div>
          <div>
          <Link style={{textDecoration:'none',color:''}} to='/hotelregister'>
            <p  className='tage'>Don't have an account ? Sign Up</p>
            </Link>
          </div>
        
          <div className="form-item">
            <input type="checkbox" id="remember" name="remember" />
            <label htmlFor="remember">Remember me</label>
          </div>
          <div className="form-item">
         
            
            <button onClick={handleClick} type="submit" className="login-form-button-hotel">LOGIN</button>
          </div>
        </form>
      </div>
      < ToastContainer/>
    </div>
  
  )
}
