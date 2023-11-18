import Header from '../../components/client/Header'
import Navbar from '../../components/client/Navbar'
// import DataTable from 'react-data-table-component'
import { DataGrid } from '@mui/x-data-grid'
import './profile.css'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/client/AuthContext'
import useFetch from '../../hooks/useFetch'
import Modal from 'react-modal'
import axios from 'axios'
import { ToastContainer, Zoom, toast } from 'react-toastify'
import { Bookingcolumns } from '../../datatablesource'
import TextField from '@mui/material/TextField'
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined'
import { ProfileModalStyles } from '../../ModelStyle'
import { format, parseISO } from 'date-fns'
const Profile = () => {
  const [modalIsOpen, setIsOpen] = useState(false)
  const [editData, setEditData] = useState({})
  const [files, setFiles] = useState('')
  const [userProfile, setUserProfile] = useState({})
  const [result, setResult] = useState('')
  const [pymentDetailsModal, setPaymentDetailsModal] = useState(false)

  const { user } = useContext(AuthContext)
  const { data } = useFetch(`/getBookingDetails/${user._id}`)

  useEffect(() => {
    try {
      axios.get(`/getUser/${user._id}`).then(response => {
        setUserProfile(response.data)
        setEditData(response.data)
      })
    } catch (error) {
      console.log(error)
    }
  }, [])

  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
    setPaymentDetailsModal(false)
  }

  const handleEdit = e => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value
    })
  }

  const saveProfile = async () => {
    try {
      const updatedUser = {
        ...editData
      }

      const response = await axios.put(`/editProfile/${user._id}`, updatedUser)

      if (response.data) {
        setUserProfile(response.data)

        toast.success('Profile saved successfully', {
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
    } catch (err) {
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

  const handlPaymentDetails = async id => {
    try {
      const response = await axios.get(`/getPymetDetails/${id}`)
      setResult(response)
      setPaymentDetailsModal(true)
    } catch (error) {
      console.log(error)
    }
  }

  const actionColumn = [
    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      renderCell: params => {
        return (
          <div className='cellAction'>
            <div
              className='deleteButtonPro'
              onClick={() => handlPaymentDetails(params.row._id)}
            >
              View Details
            </div>
          </div>
        )
      }
    }
  ]

  return (
    <div>
      <Navbar />
      <Header type='list' />
      <div className='layout'>
        <div className='profile'>
          <div className='profile__picture'>
            {files ? (
              <img src={URL.createObjectURL(files)} alt='' />
            ) : (
              <img src='http://i.pravatar.cc/250?img=58' alt='' />
            )}
          </div>
          <div className='formInputImg'>
            <label htmlFor='file'>
              Image: <DriveFolderUploadOutlinedIcon className='icon' />
            </label>
            <input
              type='file'
              id='file'
              accept='image/*'
              onChange={e => setFiles(e.target.files[0])}
              style={{ display: 'none' }}
              required
            />
          </div>

          <div className='profile__header'>
            <div className='profile__account'>
              <h4 className='profile__username'>{userProfile.name}</h4>
            </div>
            <div className='profile__edit'>
              <a onClick={openModal} className='profile__button' href='#'>
                Edit Profile
              </a>
            </div>
          </div>
          <div className='profile__stats'>
            <div className='profile__stat'>
              <div className='profile__icon profile__icon--gold'>
                <i className='fas fa-wallet'></i>
              </div>
              <div className='profile__value1'>{userProfile.name}</div>
            </div>
            <div className='profile__stat'>
              <div className='profile__icon profile__icon--blue'>
                <i className='fas fa-signal'></i>
              </div>
              <div className='profile__value'>{userProfile.email}</div>
            </div>
            <div className='profile__stat'>
              <div className='profile__icon profile__icon--pink'>
                <i className='fas fa-heart'></i>
              </div>
              <div className='profile__value'>{userProfile.phone}</div>
            </div>
          </div>
          <div className='profileTable'>
            <DataGrid
              className='datagrid'
              rows={data}
              columns={Bookingcolumns.concat(actionColumn)}
              pageSize={9}
              rowsPerPageOptions={[9]}
              checkboxSelection
              getRowId={row => row._id}
            />
          </div>
        </div>
      </div>
      <div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={ProfileModalStyles}
          contentLabel='Edit Profile Modal'
        >
          <h2>Edit Profile</h2>
          <form className='modal-form'>
            {/* <input
      type='text'
      name='name'
      value={editData.name !== undefined ? editData.name : userProfile.name}
      onChange={handleEdit}
    /> */}

            <TextField
              id='standard-basic'
              label='Name'
              variant='standard'
              type='text'
              name='name'
              value={
                editData.name !== undefined ? editData.name : userProfile.name
              }
              onChange={handleEdit}
            />
            <TextField
              id='standard-basic'
              label='Email'
              variant='standard'
              type='text'
              name='email'
              value={
                editData.email !== undefined
                  ? editData.email
                  : userProfile.email
              }
              onChange={handleEdit}
            />
            <TextField
              id='standard-basic'
              label='Phone Number'
              variant='standard'
              type='number'
              name='phone'
              value={
                editData.phone !== undefined
                  ? editData.phone
                  : userProfile.phone
              }
              onChange={handleEdit}
            />
            <div className='modal-buttons'>
              <button className='mbutton' onClick={saveProfile} type='button'>
                Save
              </button>
              <button className='mbutton' onClick={closeModal} type='button'>
                Cancel
              </button>
            </div>
          </form>
        </Modal>
        <Modal
          isOpen={pymentDetailsModal}
          onRequestClose={closeModal}
          style={ProfileModalStyles}
          contentLabel='Edit Profile Modal'
        >
          <div className='cardContainer'>
            <div className='hedingContainer'>
              <h2>Booking Details</h2>
            </div>
            <div className='card'>
              <div className='Pright'>
                <p>Hotel name :</p>
                <p>Hotel Type : </p>
                <p>Hotel Address :</p>
                <p>Room:</p>
                <p>Max people :</p>
                <p>Room number :</p>
                <p>Check-in date : </p>
                <p>Check-out date : </p>
                <p>Status : </p>

                <p>Booked Amount : </p>
                <p>Payment Method : </p>
              </div>
              {result && (
                <div className='Pleft'>
                  <p> {result.data.hotelName}</p>
                  <p> {result.data.hotelType}</p>
                  <p className='parclass'> {result.data.hotelAddress}</p>
                  <p> {result.data.roomTitle}</p>
                  <p> {result.data.maxPeople}</p>
                  <p>{result.data.roomNumbers}</p>
                  <p>
                    {' '}
                    {format(parseISO(result.data.startDate), 'MM-dd-yyyy')}
                  </p>
                  <p> {format(parseISO(result.data.endDate), 'MM-dd-yyyy')}</p>
                  <p style={{ color: 'green' }}>
                    <b>
                      {result.data.status == true
                        ? 'booked Success'
                        : 'booking Pending'}{' '}
                    </b>{' '}
                  </p>

                  <hr />

                  <p style={{ color: 'green' }}>{result.data.totalAmount} /-</p>
                  <p style={{ color: 'lightskyblue' }}> Online [card]</p>
                </div>
              )}
            </div>
          </div>
        </Modal>
      </div>

      <ToastContainer />
    </div>
  )
}

export default Profile
