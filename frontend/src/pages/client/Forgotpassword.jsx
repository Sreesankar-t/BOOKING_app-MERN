import { useState } from 'react'
import Modal from 'react-modal'
import TextField from '@mui/material/TextField'
import SendIcon from '@mui/icons-material/Send'
import Button from '@mui/material/Button'
import { ProfileModalStyles } from '../../ModelStyle'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import { ToastContainer, toast, Zoom } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

export default function Forgotpassword () {
  const [open, setOpen] = useState(true)
  const [password, setPassword] = useState('')
  const [Cpassword, setCpassword] = useState('')

  const location = useLocation()
  const id = location.pathname.split('/')[2]
  const navigate = useNavigate()

  const handlePassword = e => {
    setPassword(e.target.value)
  }

  const handleCPassword = e => {
    setCpassword(e.target.value)
  }
  const handleChangePasword = async () => {
    const data = {
      password: password,
      Cpassword: Cpassword
    }
    try {
      const result = await axios.put(`/changePassword/${id}`, data)
      console.log(result)
      if (result) {
        await Swal.fire({
          title: 'Success!',
          text: 'Your password changed success',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
        navigate('/login')
      }
    } catch (error) {
      console.log(error.response.data.message)
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

  return (
    <div>
      <Modal
        isOpen={open}
        //   onRequestClose={closeModal }
        style={ProfileModalStyles}
        contentLabel='Edit Profile Modal'
      >
        <div className='modalSecondIn'>
          <div className='modalTextfelidContainer'>
            <TextField
              id='password'
              onChange={handlePassword}
              label='Enter password'
              type='password'
              variant='outlined'
            />
            <TextField
              id='Cpassword'
              onChange={handleCPassword}
              label='confirm-password'
              type='password'
              variant='outlined'
            />
          </div>
          <div>
            <Button
              onClick={handleChangePasword}
              Button
              variant='contained'
              endIcon={<SendIcon />}
            >
              Send
            </Button>
          </div>
        </div>
      </Modal>
      <ToastContainer />
    </div>
  )
}
