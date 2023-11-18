import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import './booking.css'
import useFetch from '../../hooks/useFetch'
import { useContext, useEffect, useState } from 'react'
import { SearchContext } from '../../context/client/SearchContext'
import axios from 'axios'
import 'sweetalert2/dist/sweetalert2.min.css'
import { AuthContext } from '../../context/client/AuthContext'
import { BookingContext } from '../../context/client/BookingContext'

const Booking = ({ setOpen, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState([])
  const [hotel, setHotel] = useState([])
  const [totalAmount, setTotalAmount] = useState([])

  const { data } = useFetch(`/hotel/room/${hotelId}`)

  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        const response = await axios.get(`/hotel/getSingleHotel/${hotelId}`)
        setHotel(response.data)
      } catch (error) {
        console.error('Error fetching hotel data:', error)
      }
    }

    fetchHotelData()
  }, [hotelId])

  const { dates } = useContext(SearchContext)
  const { user } = useContext(AuthContext)
  const { dispatch } = useContext(BookingContext)

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate)
    const end = new Date(endDate)

    const date = new Date(start.getTime())

    const dates = []

    while (date <= end) {
      dates.push(new Date(date).getTime())
      date.setDate(date.getDate() + 1)
    }

    return dates
  }

  const alldates = getDatesInRange(
    dates[0].startDate || new Date(),
    dates[0].endDate || new Date()
  )

  const isAvailable = roomNumber => {
    const isFound = roomNumber.unavailableDates.some(date =>
      alldates.includes(new Date(date).getTime())
    )

    return !isFound
  }

  const handleSelect = (e, roomNumber, roomId) => {
    const checked = e.target.checked

    setSelectedRooms(prevSelectedRooms => {
      if (checked) {
        // Add the selected room as an object
        return [...prevSelectedRooms, { roomId, roomNumber }]
      } else {
        // Remove the deselected room
        return prevSelectedRooms.filter(item => item.roomId !== roomId)
      }
    })
  }

  const isReserveButtonDisabled = Object.keys(selectedRooms).length === 0

  const calculateTotalAmount = () => {
    let totalAmount = 0
    selectedRooms.forEach(room => {
      const { roomId } = room
      const selectedRoom = data.find(item =>
        item.roomNumbers.some(num => num._id === roomId)
      )
      if (selectedRoom) {
        totalAmount += selectedRoom.price
      }
    })
    setTotalAmount(totalAmount)
  }

  useEffect(() => {
    calculateTotalAmount()
  }, [selectedRooms])

  const HandlePymnetCheckoutPage = async () => {
    dispatch({
      type: 'BOOKING',
      payload: {
        dates: dates,
        user: user,
        hotel: hotel,
        selectedRooms: selectedRooms,
        totalAmount: totalAmount,
        alldates: alldates,
        data: data
      }
    })
    try {
      await axios
        .post('/checkoutSection', {
          hotel,
          totalAmount
        })
        .then(response => {
          if (response.data.url) {
            window.location.href = response.data.url
          }
        })
        .catch(err => console.log(err.message))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='reserve'>
      <div className='bkContainer'>
        <FontAwesomeIcon
          icon={faCircleXmark}
          className='rClose'
          onClick={() => setOpen(false)}
        />
        <span className='spanItem'>Select your rooms:</span>
        {data.map(item => (
          <div className='rItem' key={item._id}>
            <div className='rItemInfo'>
              <div className='rTitle'>{item.title}</div>
              <div className='rDesc'>{item.desc}</div>
              <div className='rMax'>
                Max people: <b>{item.maxPeople}</b>
              </div>
              <div className='rPrice'>price :{item.price}</div>
            </div>
            <div className='rSelectRooms'>
              {item.roomNumbers.map(roomNumber => (
                <div key={roomNumber.id} className='room'>
                  <label className='Cnumber'>{roomNumber.number}</label>
                  <input
                    className='checkbox'
                    type='checkbox'
                    value={roomNumber._id}
                    onChange={e =>
                      handleSelect(e, roomNumber.number, roomNumber._id)
                    }
                    disabled={!isAvailable(roomNumber)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

        <button
          onClick={HandlePymnetCheckoutPage}
          disabled={isReserveButtonDisabled}
          className='rButton'
        >
          Reserve Now!
        </button>
      </div>
    </div>
  )
}

export default Booking
