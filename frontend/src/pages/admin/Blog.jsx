import { useState } from 'react'
import Sidebar from '../../components/admin/Sidebar'
import 'react-quill/dist/quill.snow.css'
import ReactQuill from 'react-quill'
import './blog.css'
import axios from 'axios'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import ClockLoader from 'react-spinners/ClockLoader'


export default function Blog () {
  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [content, setContent] = useState('')
  const [files, setFiles] = useState('')
  const [isCreatingPost, setIsCreatingPost] = useState(false)

  const createNewPost = async e => {
    e.preventDefault()

    if (!title || !summary || !content || !files) {
      Swal.fire({
        title: 'Error!',
        text: 'Please fill in all the required fields.',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    } else {
      setIsCreatingPost(true)

      try {
        // Your code for file upload and post creation
        const list = await Promise.all(
          Object.values(files).map(async file => {
            const data = new FormData()
            data.append('file', file)
            data.append('upload_preset', 'upload')

            const uploadRes = await fetch(
              'https://api.cloudinary.com/v1_1/dxsaipqqs/image/upload',{
                method:'POST',
                body:data
              });
      
              if (!uploadRes.ok) {
                throw new Error(`Failed to upload file: ${uploadRes.statusText}`);
              }
            const uploadData = await uploadRes.json()
            const { url } = uploadData
            return url
          })
        )

        const value = {
          title,
          summary,
          content,
          photos: list
        }

        await axios.post('/admin/posteBlog', value).then(res => {
          if (res.data) {
            setIsCreatingPost(false)
          }
        })

        Swal.fire({
          title: 'Success!',
          text: 'The post has been created.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          setTitle('')
          setSummary('')
          setContent('')
          setFiles('')
          setIsCreatingPost(false)
        })
      } catch (error) {
        console.log(error)
        setIsCreatingPost(false)

        Swal.fire({
          title: 'Error!',
          text: 'Failed to create the post.',
          icon: 'error',
          confirmButtonText: 'OK'
        })
      }
    }
  }

  return (
    <div className='Bloglist'>
      <Sidebar />
      <div className='BloglistContainer'>
        <form className='bform' onSubmit={createNewPost}>
          <input
            type='text'
            placeholder='Title'
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <input
            type='text'
            placeholder='Summary'
            value={summary}
            onChange={e => setSummary(e.target.value)}
          />
          <input
            type='file'
            id='file'
            onChange={e => setFiles(e.target.files)}
            multiple
          />
          <div className='brql'>
            <ReactQuill
              value={content}
              onChange={newValue => setContent(newValue)}
            />
          </div>
          <div>
            <button className='bbtn' type='submit' disabled={isCreatingPost}>
              Create Post
            </button>
          </div>
        </form>
      </div>
      {isCreatingPost ? (
        <div className='loader-container'>
          <ClockLoader
            color='#36d7b7'
            size={80}
            aria-label='Loading Spinner'
            data-testid='loader'
          />
        </div>
      ) : (
        ''
      )}
    </div>
  )
}
