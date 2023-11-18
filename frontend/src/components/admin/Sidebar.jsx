import './sidebar.css'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import StoreIcon from '@mui/icons-material/Store'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'

import { Link } from 'react-router-dom'
import { AdminUthContext } from '../../context/admin/AdminContext'
import { useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {
  const navigate = useNavigate()
  const { dispatch } = useContext(AdminUthContext)

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' })

    axios
      .post('/admin/logout')
      .then(response => {
        console.log('Logout successful', response.data)

        navigate('/adminlogin')
      })
      .catch(error => {
        console.error('Logout failed', error)
      })
  }

  return (
    <div className='sidebar'>
      <div className='top'>
        <Link to='/admin' style={{ textDecoration: 'none' }}>
          <span className='logo'>WANDERINN ADMIN</span>
        </Link>
      </div>
      <hr />
      <div className='center'>
        <ul>
          <p className='title'>MAIN</p>
          <Link to='/admin' style={{ textDecoration: 'none' }}>
            <li>
              <DashboardIcon className='icon' />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className='title'>LISTS</p>
          <Link to='/users' style={{ textDecoration: 'none' }}>
            <li>
              <PersonOutlineIcon className='icon' />
              <span>Users</span>
            </li>
          </Link>
          <Link to='/owners' style={{ textDecoration: 'none' }}>
            <li>
              <StoreIcon className='icon' />
              <span> Owners</span>
            </li>
          </Link>
          <Link to='/BlogsList' style={{ textDecoration: 'none' }}>
            <li>
              <CreditCardIcon className='icon' />
              <span>Blogs</span>
            </li>
          </Link>
          <Link to='/BookingList' style={{ textDecoration: 'none' }}>
            <li>
              <CreditCardIcon className='icon' />
              <span>Booking</span>
            </li>
          </Link>
          {/*        
          <li>
            <SettingsApplicationsIcon className="icon" />
            <span>Settings</span>
          </li> */}
          <p className='title'>USER</p>
          {/* <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li> */}
          <li>
            <ExitToAppIcon className='icon' />
            <span onClick={handleLogout}>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
