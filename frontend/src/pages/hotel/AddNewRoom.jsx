import { useContext, useState } from 'react'
import { roomInputs } from '../../formSource'
import useFetch from '../../hooks/useFetch'
import axios from 'axios'
import HotelSidebar from '../../components/hotel/hotelSidebar'
import { ToastContainer, Zoom, toast } from 'react-toastify'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import { HotelAuthContext } from '../../context/hotel/HotelContext'

const showConfirmationDialog = () => {
  return Swal.fire({
    title: 'Confirm Action',
    text: 'Are you sure you want to create this room?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Yes, create it!',
    cancelButtonText: 'Cancel'
  })
}

const NewRoom = () => {
  const [info, setInfo] = useState({})
  const [hotelId, setHotelId] = useState(undefined)
  // const [rooms, setRooms] = useState([]);

  const { hotel } = useContext(HotelAuthContext)
  const hotelid = hotel._id

  const { data, loading } = useFetch('/hotel/listhotel/:Id')

  const handleChange = e => {
    setInfo(prev => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleClick = async e => {
    e.preventDefault()
    const confirmation = await showConfirmationDialog()
    if (confirmation.isConfirmed) {
      try {
        await axios.post(`/hotel/createroom/${hotelId}`, { ...info, hotelid })

        window.location.reload()
      } catch (err) {
        console.log(err)
        toast.warn(err.response?.data?.message, {
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
  }

  console.log(info)
  return (
    <div className='new'>
      <HotelSidebar />
      <div className='newContainer'>
        <div className='top'>
          <h1>Add New Room</h1>
        </div>
        <div className='bottom'>
          <div className='right'>
            <form>
              {roomInputs.map(input => (
                <div className='formInput' key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                  />
                </div>
              ))}
              <div className='formInput'>
                <label>Rooms</label>
                <textarea
                  id='rooms'
                  onChange={handleChange}
                  placeholder='give comma between room numbers.'
                />
              </div>
              <div className='formInput'>
                <label>Choose a hotel</label>
                <select id='hotelId' onChange={e => setHotelId(e.target.value)}>
                  {loading
                    ? 'loading'
                    : data &&
                      data.map(hotel => (
                        <option key={hotel._id} value={hotel._id}>
                          {hotel.name}
                        </option>
                      ))}
                </select>
              </div>
              <button onClick={handleClick}>Send</button>
            </form>
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewRoom
