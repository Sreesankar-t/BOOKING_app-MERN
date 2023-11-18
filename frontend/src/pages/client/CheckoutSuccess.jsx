import './checkoutsuccess.css'
import axios from 'axios'
import { BookingContext } from '../../context/client/BookingContext'
import { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
export default function CheckoutSuccess () {
  const { user, dates, hotel, selectedRooms, totalAmount, alldates, data } =useContext(BookingContext)
    

  useEffect(() => {
    const handleCheckout = async () => {
      try {
        await Promise.all(
          selectedRooms.map(selectedRoom => {
            const { roomId } = selectedRoom
            const res = axios.put(`/hotel/availability/${roomId}`, {
              dates: alldates
            })
            return res.data
          })
        )

        await axios.post('/BookingDetails', {
          data,
          dates,
          user,
          hotel,
          selectedRooms,
          totalAmount
        })
      } catch (error) {
        console.log(error)
      }
    }

    // Call the function
    handleCheckout()
  }, [])

  return (
    <>
      <div className='success-page'>
        <img
          src='data:image/png;base64,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'
          className='center'
          alt='Payment Successful'
        />
        <h2 className='h2style'>Booking Successful!</h2>
        <p className='ptagestyle'>
          Your payment was successful. Your receipt number is <b>#######</b>
        </p>
        <Link style={{ textDecoration: 'none' }} to='/profile'>
          <a className='btn-view-orders'> Booking Details </a>
        </Link>
      </div>
    </>
  )
}
