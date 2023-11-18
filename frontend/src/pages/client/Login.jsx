import './login.css'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { AuthContext } from '../../context/client/AuthContext'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast, Zoom } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Link } from 'react-router-dom'
import Modal from 'react-modal'
import { ProfileModalStyles } from '../../ModelStyle'
import TextField from '@mui/material/TextField'
import SendIcon from '@mui/icons-material/Send'
// import Button from '@mui/material/Button';
import Swal from 'sweetalert2'
import LoadingButton from '@mui/lab/LoadingButton'

export default function Login () {
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined
  })

  const [openFirst, setOpenFrist] = useState(false)

  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [sndloading, setSendLoading] = useState(false)
  const navigate = useNavigate()
  const { user, loading, dispatch } = useContext(AuthContext)

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user])

  const handleChange = e => {
    setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleEmail = e => {
    setEmail(e.target.value)
  }

  const handleClick = async e => {
    e.preventDefault()
    dispatch({ type: 'LOGIN_START' })
    try {
      const res = await axios.post('/auth', credentials)

      if (res.status === 401) {
        // User is blocked, clear the session and navigate to login
        dispatch({ type: 'LOGOUT' })
        navigate('/login')
        return
      }

      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data })
      navigate('/')
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: error.response.data })
      toast.warn(error.response.data.message, {
        transition: Zoom,
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      })
    }
  }

  const openModal = () => {
    setOpenFrist(true)
  }

  const closeModal = () => {
    setOpenFrist(false)
    setSendLoading(false)
  }

  const handleSend = async () => {
    setSendLoading(true)
    const emailData = { email: email }
    try {
      const result = await axios.post('/forgotpassword', emailData)

      if (result.data) {
        await Swal.fire({
          title: 'Success!',
          text: 'Your password reset link has been sent to your email. Please check',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
      }
      setEmail('')
      closeModal()
    } catch (error) {
      setSendLoading(false)
      setError(error.response?.data?.message)

      setTimeout(() => {
        setError('')
      }, 3000)
    }
  }

  return (
    <>
      {user ? (
        <></>
      ) : (
        <div className='main'>
          <div className='base'>
            <div className='navlnavbar'>
              <div className='lnavContainer'>
                <Link to='/'>
                  <span style={{ color: 'white' }} className='lLogo'>
                    WANDERINN
                  </span>
                </Link>
                <div className='lnavItems'>
                  {/*         
    <button className="lnavButton">Login</button> 

    <button className="lnavButton">Register</button>  */}
                  LOGIN AND BOOK YOUR WAY
                </div>
              </div>
            </div>
            <div className='lbody'>
              <div className='limage'></div>
              <div className='lcontent'>
                <div className='nameContent'>
                  <div className='wrapper'>
                    <div className='siteName2'>
                      <div className='l'>
                        <Link to='/login'>
                          <a style={{ color: 'white' }} href=''>
                            Login
                          </a>
                        </Link>
                      </div>
                      <div className='r'>
                        <Link to='/register'>
                          <a style={{ color: 'black' }} href=''>
                            Register
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='inputContent'>
                  <div className='login'>
                    <div className='lContainer'>
                      <input
                        type='email'
                        placeholder='email'
                        id='email'
                        onChange={handleChange}
                        className='lInput'
                      />
                      <input
                        type='password'
                        placeholder='password'
                        id='password'
                        onChange={handleChange}
                        className='lInput'
                      />
                      <label
                        onClick={openModal}
                        style={{
                          textDecoration: 'none',
                          color: 'inherit',
                          fontSize: '500',
                          cursor: 'pointer'
                        }}
                      >
                        forgot password ?
                      </label>

                      <button
                        disabled={loading}
                        onClick={handleClick}
                        className='lButton'
                      >
                        Login
                      </button>
                      {/* { error && <span>{error.message}</span>} */}
                      <ToastContainer />
                      <Modal
                        isOpen={openFirst}
                        onRequestClose={closeModal}
                        style={ProfileModalStyles}
                        contentLabel='Edit Profile Modal'
                      >
                        <div className='modalIn'>
                          <p style={{ color: 'red' }}>{error}</p>
                          <div>
                            <TextField
                              id='email'
                              onChange={handleEmail}
                              label='Enter email'
                              variant='outlined'
                            />
                          </div>
                          <div>
                            {/* <Button onClick={handleSend} Button variant="contained" endIcon={<SendIcon />}>
        Send
      </Button> */}
                            <LoadingButton
                              size='small'
                              onClick={handleSend}
                              endIcon={<SendIcon />}
                              loading={sndloading}
                              // loadingIndicator="Loading…"
                              loadingPosition='end'
                              variant='contained'
                            >
                              <span>Send</span>
                            </LoadingButton>
                          </div>
                        </div>
                      </Modal>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
