import './register.css'
import  { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/client/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ToastContainer ,toast,Zoom} from 'react-toastify';
import { Link } from 'react-router-dom';
export default function Register() {
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
  });

  const { loading, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.id]: e.target.value });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: 'LOGIN_START' }); 
    try {
      const res = await axios.post('/register', credentials);
      console.log(res);
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
      navigate('/login');
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: error.response.data });
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
  };

  return (
    <div className="rmain">
  <div className="rbase">
  <div className="rnavlnavbar">
  <div className="lnavContainer">
         <Link to='/'>
         <span style={{color:'white'}} className="rLogo">WANDERINN</span>
         </Link>
        
        <div className="lnavItems">
{/*         
          <button className="lnavButton">Login</button> 
  
          <button className="lnavButton">Register</button>  */}
      LOGIN AND BOOK YOUR WAY
        </div>
     </div>
</div>
<div className="rbody">
  <div className="rimage"></div>
  <div className="rcontent">
    <div className="rnameContent">
      <div className="rwrapper">
      <div className="rsiteName"><h2>WONDERIIN</h2></div>
      <div className="rsiteName1"> <h3><b>LOGIN</b></h3></div>
      <div className="rsiteName2">
        <div className="rl">
          <Link to="/login"><a style={{color:'black'}} href="">Login</a></Link>
          
        </div>
        <div className="rr">
        <Link to="/register"><a style={{color:'white'}} href="">Register</a></Link>
        </div>
      </div>
      </div>

    </div>
    <div className="inputContent">
    <div className='register'>
       <div className="rContainer">
       
        <input type="text" placeholder='name' id='name'  onChange={handleChange} className="rInput" />
        <input type="email" placeholder='email' id='email'  onChange={handleChange} className="rInput" />
        <input type="number" placeholder='mobile number' id='number'  onChange={handleChange} className="rInput" />

        <input type="password" placeholder='password' id='password' onChange={handleChange} className="rInput" />
        <input type="password" placeholder='confirm-password' id='Cpassword' onChange={handleChange} className="rInput" />
        <button disabled={loading} onClick={handleClick} className="rButton">Register</button>
      {/* { error && <span>{error.message}</span>} */}
      <ToastContainer />
    
       </div>
    </div>
    </div>
  </div>
</div>
  </div>

 </div>
  );
}


