
import './login.css'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { AuthContext } from '../../context/client/AuthContext'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast,Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link} from 'react-router-dom';



export default function Login() {

    const [credentials,setCredentials]=useState({
        
        email:undefined,
        password:undefined
    })

   
    const navigate = useNavigate()
    const {user,loading,dispatch}=useContext(AuthContext)

   

    useEffect(() => {
       if(user){
        navigate('/')
       }
    }, [user]);

 



    


   const handleChange =(e)=>{
    
    setCredentials(prev=>({...prev,[e.target.id]:e.target.value}))

   

   }

   const handleClick= async e =>{
    e.preventDefault()
    dispatch({type:'LOGIN_START'})
    try {
        const res = await axios.post("/auth",credentials)
      
        
         if (res.status === 401) {
          // User is blocked, clear the session and navigate to login
          dispatch({ type: "LOGOUT" });
          navigate("/login");
          return;
        }
        
      
        dispatch({type:"LOGIN_SUCCESS",payload: res.data})
        navigate("/")
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
   console.log(user);

  return (
   
<>
{user ? <></>:  <div className="main">
<div className="base">
<div className="navlnavbar">
<div className="lnavContainer">
  <Link to='/'>
  <span style={{color:'white'}} className="lLogo">WANDERINN</span>
  </Link>
  <div  className="lnavItems">
{/*         
    <button className="lnavButton">Login</button> 

    <button className="lnavButton">Register</button>  */}
  LOGIN AND BOOK YOUR WAY
    
  </div>
</div>
</div>
<div className="lbody">
<div className="limage"></div>
<div className="lcontent">
<div className="nameContent">
<div className="wrapper">
  
  <div className="siteName"><h2>WONDERIIN</h2></div>
  

<div className="siteName1"> <h3><b>LOGIN</b></h3></div>
<div className="siteName2">
  <div className="l">
    <Link to="/login"><a style={{color:'white'}} href="">Login</a></Link>
    
  </div>
  <div className="r">
  <Link to="/register"><a style={{color:'black'}} href="">Register</a></Link>
  </div>
</div>
</div>

</div>
<div className="inputContent">
<div className='login'>
  <div className="lContainer">
  
  <input type="email" placeholder='email' id='email'  onChange={handleChange} className="lInput" />
  <input type="password" placeholder='password' id='password' onChange={handleChange} className="lInput" />
  <button disabled={loading} onClick={handleClick} className="lButton">Login</button>
{/* { error && <span>{error.message}</span>} */}
<ToastContainer />

  </div>
</div>
</div>
</div>
</div>
</div>

</div>}

</>
  )
}
