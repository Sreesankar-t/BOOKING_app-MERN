import './widget.css'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded'
import HotelIcon from '@mui/icons-material/Hotel'
import PermMediaIcon from '@mui/icons-material/PermMedia'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useContext } from 'react'
import { HotelAuthContext } from '../../context/hotel/HotelContext'

const Widget = () => {
  const [user, setUser] = useState([])
  const [hotels, SetHotel] = useState([])
  const [blog, setBlog] = useState([])
  const [booking, setBooking] = useState([])
  const location = useLocation()
  const path = location.pathname.split('/')[1]
  const { hotel } = useContext(HotelAuthContext)
  const hotelId = hotel._id

  useEffect(() => {
    if (path === 'admin') {
      const request1 = axios.get('/admin/getTotalUser')
      const request2 = axios.get('/admin/getTotalHotel')
      const request3 = axios.get('/admin/getTotalBooking')
      const request4 = axios.get('/admin/getTotalBlog')

      Promise.all([request1, request2, request3, request4])
        .then(([res1, res2, res3, res4]) => {
          const data1 = res1.data
          const data2 = res2.data
          const data3 = res3.data
          const data4 = res4.data

          setUser(data1)
          SetHotel(data2)
          setBooking(data3)
          setBlog(data4)
        })
        .catch(error => {
          console.error(error)
        })
    } else {
      const request1 = axios.get(`/hotel/getHotel/${hotelId}`)
      const request2 = axios.get(`/hotel/getTotalRoom/${hotelId}`)
      const request3 = axios.get(`/hotel/getTotalBooking/${hotelId}`)

      Promise.all([request1, request2, request3])
        .then(([res1, res2, res3]) => {
          const data1 = res1.data
          const data2 = res2.data
          const data3 = res3.data

          setUser(data1)
          SetHotel(data2)
          setBooking(data3)
        })
        .catch(error => {
          console.error(error)
        })
    }
  }, [])

  console.log(user, hotel, booking)

  return (
    <>
      {path == 'admin' ? (
        <div className='widget'>
          <div className='left'>
            <span className='title'>Total User</span>
            <span className='counter'>{user}</span>
            <Link
              className='mainLink'
              style={{ textDecoration: 'none', width: 'max-content' }}
              to='/users'
            >
              <span className='link'>click to see the users</span>
            </Link>
          </div>
          <div className='right'>
            <div className='percentage positive'>
              <KeyboardArrowUpIcon />
            </div>
            <PersonOutlinedIcon
              style={{
                color: 'crimson',
                backgroundColor: 'rgba(255, 0, 0, 0.2)',
                borderRadius: '5px'
              }}
            />
          </div>
        </div>
      ) : (
        <div className='widget'>
          <div className='left'>
            <span className='title'>Total Hotel</span>
            <span className='counter'>{user}</span>
            <Link
              className='mainLink'
              style={{ textDecoration: 'none', width: 'max-content' }}
              to='/listhotel'
            >
              <span className='link'>click to see the Hotels</span>
            </Link>
          </div>
          <div className='right'>
            <div className='percentage positive'>
              <KeyboardArrowUpIcon />
            </div>
            <HotelIcon
              style={{
                color: 'crimson',
                backgroundColor: 'rgba(255, 0, 0, 0.2)',
                borderRadius: '5px'
              }}
            />
          </div>
        </div>
      )}
      {path == 'admin' ? (
        <div className='widget'>
          <div className='left'>
            <span className='title'>Total Booking</span>
            <span className='counter'>{booking}</span>
            <Link
              className='mainLink'
              style={{ textDecoration: 'none', width: 'max-content' }}
              to='/BookingList'
            >
              <span className='link'>click to see the Booking</span>
            </Link>
          </div>
          <div className='right'>
            <div className='percentage positive'>
              <KeyboardArrowUpIcon />
            </div>
            <BookmarkAddedIcon
              style={{
                backgroundColor: 'rgba(218, 165, 32, 0.2)',
                color: 'goldenrod',
                borderRadius: '5px'
              }}
            />
          </div>
        </div>
      ) : (
        <div className='widget'>
          <div className='left'>
            <span className='title'>Total Booking</span>
            <span className='counter'>{booking}</span>
            <Link
              className='mainLink'
              style={{ textDecoration: 'none', width: 'max-content' }}
              to='/listHotelBooking'
            >
              <span className='link'>click to see the Booking</span>
            </Link>
          </div>
          <div className='right'>
            <div className='percentage positive'>
              <KeyboardArrowUpIcon />
            </div>
            <BookmarkAddedIcon
              style={{
                backgroundColor: 'rgba(218, 165, 32, 0.2)',
                color: 'goldenrod',
                borderRadius: '5px'
              }}
            />
          </div>
        </div>
      )}
      {path == 'admin' ? (
        <div className='widget'>
          <div className='left'>
            <span className='title'>Total blogs</span>
            <span className='counter'>{blog}</span>
            <Link
              className='mainLink'
              style={{ textDecoration: 'none', width: 'max-content' }}
              to='/BlogsList'
            >
              <span className='link'>click to see the bloges</span>
            </Link>
          </div>
          <div className='right'>
            <div className='percentage positive'>
              <KeyboardArrowUpIcon />
            </div>
            <PermMediaIcon
              style={{
                backgroundColor: 'rgba(0, 128, 0, 0.2)',
                color: 'green',
                borderRadius: '5px'
              }}
            />
          </div>
        </div>
      ) : null}
      {path == 'admin' ? (
        <div className='widget'>
          <div className='left'>
            <span className='title'>Total Hotel</span>
            <span className='counter'>{hotels}</span>
            <Link
              className='mainLink'
              style={{ textDecoration: 'none', width: 'max-content' }}
              to='/hotellist'
            >
              <span className='link'>click to see the Hotels</span>
            </Link>
          </div>

          <div className='right'>
            <KeyboardArrowUpIcon />
            <div className='percentage positive'></div>
            <HotelIcon
              style={{
                backgroundColor: 'rgba(128, 0, 128, 0.2)',
                color: 'purple',
                borderRadius: '5px'
              }}
            />
          </div>
        </div>
      ) : (
        <div className='widget'>
          <div className='left'>
            <span className='title'>Total Room </span>
            <span className='counter'>{hotels}</span>
            <Link
              className='mainLink'
              style={{ textDecoration: 'none', width: 'max-content' }}
              to='/listroom'
            >
              <span className='link'>click to see the Rooms</span>
            </Link>
          </div>
          <div className='right'>
            <KeyboardArrowUpIcon />
            <div className='percentage positive'></div>
            <HotelIcon
              style={{
                backgroundColor: 'rgba(128, 0, 128, 0.2)',
                color: 'purple',
                borderRadius: '5px'
              }}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default Widget
