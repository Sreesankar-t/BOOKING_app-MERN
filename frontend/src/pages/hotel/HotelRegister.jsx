import './hotelregister.css'
import { useContext, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast, Zoom } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { HotelAuthContext } from '../../context/hotel/HotelContext'

export default function HotelRegister () {
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined
  })

  const navigate = useNavigate()
  const { hotel, loading, dispatch } = useContext(HotelAuthContext)
  const [data, setData] = useState(false)
  const [togleButton, setogleButton] = useState(false)

  const handleChange = e => {
    setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleClick = async e => {
    e.preventDefault()

    try {
      const res = await axios.post('/hotel/register', credentials)
      console.log(res)

      let approve = res.data.approveHotel

      if (approve == false) {
        setData(true)
        setogleButton(true)
      }
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
  console.log(hotel)

  const handlEnter = async () => {
    navigate('/hotellogin')
  }

  return (
    <div className='login-page'>
      <div className='login-box'>
        <div className='illustration-wrapper'>
          {data === true && (
            <div>
              <p style={{ backgroundColor: 'yellow' }}>
                You can access the page after admin approved !!
              </p>
            </div>
          )}

          <img
            src='https://thumbs.dreamstime.com/b/d-hotel-tropics-building-palm-trees-white-40076095.jpg'
            alt='Login'
          />
        </div>
        <form id='login-form'>
          <div className='form-item'>
            <label htmlFor='username'>Hotel Name</label>
            <input
              type='text'
              id='name'
              onChange={handleChange}
              placeholder='name'
            />
          </div>
          <div className='form-item'>
            <label htmlFor='username'>Email</label>
            <input
              onChange={handleChange}
              type='email'
              name='email'
              id='email'
              placeholder='email'
              required
            />
          </div>
          <div className='form-item'>
            <label htmlFor='username'>Phone Number</label>
            <input
              type='number'
              id='number'
              onChange={handleChange}
              placeholder='enter mobile number'
            />
          </div>
          <div className='form-item'>
            <label htmlFor='username'>Address</label>
            <input
              type='text'
              id='address'
              onChange={handleChange}
              placeholder='address'
            />
          </div>

          <div className='form-item'>
            <label htmlFor='password'>Password</label>
            <input
              onChange={handleChange}
              type='password'
              name='password'
              id='password'
              placeholder='password'
              required
            />
          </div>
          <div className='form-item'>
            <label htmlFor='password'>Confirm-Password</label>
            <input
              type='password'
              name='Cpassword'
              id='Cpassword'
              onChange={handleChange}
              placeholder='enter confirm-password'
            />
          </div>
          <div>
            <Link style={{ textDecoration: 'none' }} to='/hotellogin'>
              <p className='tage'>Already have an account ? Sign In</p>
            </Link>
          </div>

          <div className='form-item'>
            {togleButton == false ? (
              <button
                disabled={loading}
                onClick={handleClick}
                type='submit'
                className='login-form-button-hotel '
              >
                Register
              </button>
            ) : (
              <button
                disabled={loading}
                onClick={handlEnter}
                type='submit'
                className='login-form-button-hotel'
              >
                Go to page
              </button>
            )}
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  )
}
