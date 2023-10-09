
import './AdminLogin.css'
import { useContext, useState } from 'react'
import axios from 'axios'
import { AdminUthContext } from '../../context/admin/AdminContext'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast,Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { Link} from 'react-router-dom';



export default function Login() {

    const [credentials,setCredentials]=useState({
        
        email:undefined,
        password:undefined
    })

   
    const navigate = useNavigate()
    const {loading,dispatch}=useContext( AdminUthContext)

   

    // useEffect(() => {
    //    if(user){
    //     navigate('/')
    //    }
    // }, [user]);



    


   const handleChange =(e)=>{
    
    setCredentials(prev=>({...prev,[e.target.id]:e.target.value}))

   

   }

   const handleClick= async e =>{
    e.preventDefault()
    dispatch({type:'LOGIN_START'})
    try {
        const res = await axios.post("/admin/login",credentials) 
        console.log(res)
        dispatch({type:"LOGIN_SUCCESS",payload: res.data})
        navigate("/admin")
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
  return (
         <div className='admincontainer'>
         
    <div className='adminlogin'>
       <div className='adminlogo'><h1>LOGIN</h1></div>
      <input type="email" placeholder='email' id='email'  onChange={handleChange} className="alInput" />
  <input type="password" placeholder='password' id='password' onChange={handleChange} className="alInput" />
  <button disabled={loading} onClick={handleClick} className="alButton">Login</button>
  <ToastContainer/>
      </div>
  
    </div>
     

    
  )
}

