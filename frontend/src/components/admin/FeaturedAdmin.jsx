import './featuredadmin.css'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined'

import axios from 'axios'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useContext } from 'react'
import { HotelAuthContext } from '../../context/hotel/HotelContext'

const Featured = () => {
  const [today, setToday] = useState([])
  const [totalAmount, SetTotalAmount] = useState([])
  const [month, setMonth] = useState([])
  const [week, setWeek] = useState([])
  const [total, setTotal] = useState([])
  const location = useLocation()
  const path = location.pathname.split('/')[1]
  const { hotel } = useContext(HotelAuthContext)
  const hotelId = hotel._id

  useEffect(() => {
    if (path == 'admin') {
      const request1 = axios.get('/admin/today')
      const request2 = axios.get('/admin/totalPrice')
      const request3 = axios.get('/admin/getTotalPriceLastWeek')
      const request4 = axios.get('/admin/getTotalPriceAllTime')
      const request5 = axios.get('/admin/getTotalPriceLastMonth')

      Promise.all([request1, request2, request3, request4, request5])
        .then(([res1, res2, res3, res4, res5]) => {
          const data1 = res1.data
          const data2 = res2.data
          const data3 = res3.data
          const data4 = res4.data
          const data5 = res5.data

          setToday(data1)
          SetTotalAmount(data2)
          setWeek(data3)
          setTotal(data4)
          setMonth(data5)
        })
        .catch(error => {
          console.error(error)
        })
    } else {
      const request1 = axios.get(`/hotel/today/${hotelId}`)
      const request2 = axios.get(`/hotel/totalPrice/${hotelId}`)
      const request3 = axios.get(`/hotel/getTotalPriceLastWeek/${hotelId}`)
      const request4 = axios.get(`/hotel/getTotalPriceAllTime/${hotelId}`)
      const request5 = axios.get(`/hotel/getTotalPriceLastMonth/${hotelId}`)

      Promise.all([request1, request2, request3, request4, request5])
        .then(([res1, res2, res3, res4, res5]) => {
          const data1 = res1.data
          const data2 = res2.data
          const data3 = res3.data
          const data4 = res4.data
          const data5 = res5.data

          setToday(data1)
          SetTotalAmount(data2)
          setWeek(data3)
          setTotal(data4)
          setMonth(data5)
        })
        .catch(error => {
          console.error(error)
        })
    }
  }, [])

  let color = path == 'hotel' ? '#be75be':'#8884d8'

  return (
    <div className='featured'>
      <div className='top'>
        <h1 className='title'>Booking Status</h1>
        <MoreVertIcon fontSize='small' />
      </div>
      <div className='bottom'>
        <div className='featuredChart'>
          <CircularProgressbar
            value={today}
            text={today}
            background
            backgroundPadding={10}
            styles={buildStyles({
              backgroundColor: color,
              textColor: '#fff',
              pathColor: '#fff',
              trailColor: 'transparent'
            })}
            className='custom-progress-bar' // Add a custom class
          />
        </div>
        <p className='title'>Total Booking today</p>
        <p className='amount'>
          <b>₹</b>
          {totalAmount}
        </p>
        <p className='desc'>
          Up-to-date information on both monthly and weekly total booking
          amounts
        </p>
        <div className='summary'>
          <div className='item'>
            <div className='itemTitle'>Last Week</div>
            <div className='itemResult positive'>
              <KeyboardArrowUpOutlinedIcon fontSize='small' />
              <div className='resultAmount'>₹{week}</div>
            </div>
          </div>
          <div className='item'>
            <div className='itemTitle'>Last Month</div>
            <div className='itemResult positive'>
              <KeyboardArrowUpOutlinedIcon fontSize='small' />
              <div className='resultAmount'>₹{month}</div>
            </div>
          </div>
          <div className='item'>
            <div className='itemTitle'>total booking</div>
            <div className='itemResult positive'>
              <KeyboardArrowUpOutlinedIcon fontSize='small' />
              <div className='resultAmount'>₹{total}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Featured
