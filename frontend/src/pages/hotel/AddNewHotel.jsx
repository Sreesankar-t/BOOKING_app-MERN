import './addnewhotel.css'
import HotelSidebar from '../../components/hotel/hotelSidebar'
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined'
import { useContext, useState } from 'react'
import { hotelInputs } from '../../formSource'
import useFetch from '../../hooks/useFetch'
import axios from 'axios'
import { ToastContainer, Zoom, toast } from 'react-toastify'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import { HotelAuthContext } from '../../context/hotel/HotelContext'

import LoadingButton from '@mui/lab/LoadingButton'

const AddNewHotel = () => {
  const [files, setFiles] = useState('')
  const [info, setInfo] = useState({})
  const [rooms, setRooms] = useState([])
  
  const [sndloading, setSendLoading] = useState(false)

  const { hotel } = useContext(HotelAuthContext)
  const hotelId = hotel._id
  const { data, loading } = useFetch(`/hotel/listroom/${hotelId}`)

  const handleChange = e => {
    setInfo(prev => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleSelect = e => {
    const value = Array.from(e.target.selectedOptions, option => option.value)
    setRooms(value)
  }



  const handleClick = async e => {
    e.preventDefault()
    setSendLoading(true)
    try {
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append('file', file);
          data.append('upload_preset', 'upload');
      
          try {
            const uploadRes = await fetch('https://api.cloudinary.com/v1_1/dxsaipqqs/image/upload', {
              method: 'POST',
              body: data,
            });
      
            if (!uploadRes.ok) {
              throw new Error(`Failed to upload file: ${uploadRes.statusText}`);
            }
      
            const uploadData = await uploadRes.json();
            const { url } = uploadData;
            return url;
          } catch (error) {
            console.error(error);
            // Handle the error as needed
            throw error;
          }
        })
      );
      
      console.log(list,"jhgjhghg");

      const newhotel = {
        ...info,
        rooms,
        photos: list,
        hotelId
      }
      console.log(newhotel.photos,"epedraaaa");

      await axios.post('/hotel/createhotel', newhotel).then(res => {
        const data = res.data
        if (data) {
          setSendLoading(false)
          console.log(data,"edhareeee");
        }
      })

      Swal.fire({
        title: 'Success!',
        text: 'The hotel has been created.',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        window.location.reload()
      })
    } catch (err) {
      console.log(err)
      if (err) {
        setSendLoading(false)
      }
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

  return (
    <div className='new'>
      <HotelSidebar />
      <div className='newContainer'>
        <div className='top'>
          <h1>Add New Hotel</h1>
        </div>
        <div className='bottom'>
          <div className='left'>
            <img
              src={
                files
                  ? URL.createObjectURL(files[0])
                  : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
              }
              alt=''
            />
          </div>
          <div className='right'>
            <form>
              <div className='formInput'>
                <label htmlFor='file'>
                  Image: <DriveFolderUploadOutlinedIcon className='icon' />
                </label>
                <input
                  type='file'
                  id='file'
                  multiple
                  onChange={e => setFiles(e.target.files)}
                  style={{ display: 'none' }}
                  required
                />
              </div>

              {hotelInputs.map(input => (
                <div className='formInput' key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                    required
                  />
                </div>
              ))}

              <div className='selectRooms'>
                <label>Rooms</label>
                <select id='rooms' multiple onChange={handleSelect}>
                  {loading
                    ? 'loading'
                    : data &&
                      data.map(room => (
                        <option key={room._id} value={room._id}>
                          {room.title}
                        </option>
                      ))}
                </select>
              </div>
              <LoadingButton
                size='small'
                onClick={handleClick}
                //   endIcon={<SendIcon />}
                loading={sndloading}
                // loadingIndicator="Loading…"
                loadingPosition='end'
                variant='contained'
              >
                <span>Send</span>
              </LoadingButton>
            </form>
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddNewHotel