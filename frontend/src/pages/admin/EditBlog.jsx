import './editblog.css'
import { useLocation } from 'react-router-dom'
import Sidebar from '../../components/admin/Sidebar'
import axios from 'axios'
import useFetch from '../../hooks/useFetch'
import { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined'
import Swal from 'sweetalert2'
import LoadingButton from '@mui/lab/LoadingButton'
import Lightbox from 'react-lightbox-component'

export default function EditBlog () {
  const [editData, setEditData] = useState({})
  const [blogData, setBlogData] = useState({})
 
  const [sndloading, setSendLoading] = useState(false)
  const [files, setFiles] = useState([])

  const location = useLocation()

  const id = location.pathname.split('/')[2]
  console.log(id)

  const { data } = useFetch(`/admin/singleBlog/${id}`)

  useEffect(() => {
    if (data) {
      setBlogData(data)
    }
  }, [data])

  const handleEdit = e => {
    console.log("edit ayiiii");
    setEditData({
      ...editData,
      [e.target.name]: e.target.value
    })
 
  }

  const saveBlog = async e => {
    e.preventDefault()
    setSendLoading(true)
    try {
      const list = await Promise.all(
        Object.values(files).map(async file => {
          const data = new FormData()
          data.append('file', file)
          data.append('upload_preset', 'upload')
          const uploadRes = await axios.post(
            'https://api.cloudinary.com/v1_1/dxsaipqqs/image/upload',
            data
          )

          const { url } = uploadRes.data
          return url
        })
      )

      const updatBlog = {
        ...editData,
        photos: list || data.photos
      }

      const response = await axios.put(`/admin/editBlog/${id}`, updatBlog)

      if (response.data) {
        setBlogData(response.data)

        await Swal.fire({
          title: 'Success!',
          text: 'The hotel has been created.',
          icon: 'success',
          confirmButtonText: 'OK'
        })
        
        setSendLoading(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const LightImg =
    files.length > 0
      ? files.map(file => ({
          src: URL.createObjectURL(file),
          title: 'Image Title',
          description: 'Image Description'
        }))
      : (data.photos || []).map(photo => ({
          src: photo,
          title: '',
          description: ''
        }))

  return (
    <div className='EBloglist'>
      <div className='SbarC'>
        <Sidebar />
      </div>

      <div className='EBloglistContainer'>
        <form className='bform'>
          <label htmlFor=''>Title</label>
          <input
            type='text'
            name='title'
            placeholder='Title'
            id='title'
            value={
              editData.title !== undefined ? editData.title : blogData.title
            }
            onChange={handleEdit}
          />

          <label htmlFor=''>Summary</label>
          <input
            type='text'
            name='summary'
            placeholder='Summary'
            id='summary'
            value={
              editData.summary !== undefined
                ? editData.summary
                : blogData.summary
            }
            onChange={handleEdit}
          />
          <div className='left'>
            {
              <Lightbox
                images={LightImg}
                thumbnailWidth='150px'
                thumbnailHeight='150px'
              />
            }
          </div>
          <div className='formInput'>
            <label htmlFor='file'>
              Image: <DriveFolderUploadOutlinedIcon className='icon' />
            </label>
            <input
              type='file'
              id='file'
              multiple
              onChange={e => setFiles([...e.target.files])}
              style={{ display: 'none' }}
              required
            />
          </div>
          <ReactQuill
            className='Ebrql'
            name='content'
            id='rql'
            value={
              editData.content !== undefined
                ? editData.content
                : blogData.content
            }
            onChange={html =>
              handleEdit({ target: { name: 'content', value: html } })
            }
          />

       
            <div>
              <LoadingButton
                size='small'
                onClick={saveBlog}
                //   endIcon={<SendIcon />}
                loading={sndloading}
                // loadingIndicator="Loading…"
                loadingPosition='end'
                variant='contained'
              >
                <span>Send</span>
              </LoadingButton>
            </div>
          
        </form>
      </div>
    </div>
  )
}
