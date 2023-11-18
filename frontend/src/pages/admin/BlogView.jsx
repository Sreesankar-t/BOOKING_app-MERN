import Sidebar from '../../components/admin/Sidebar'
import './blogview.css'
import { useLocation } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import Lightbox from 'react-lightbox-component'
import 'react-lightbox-component/build/css/index.css'

export default function BlogView () {
  const location = useLocation()
  const id = location.pathname.split('/')[2]
  console.log(id)

  const { data } = useFetch(`/admin/singleBlog/${id}`)

  const images = data.photos
    ? data.photos.map(photo => ({
        src: photo, // Source of the image
        title: 'Image Title', // Title for the image (you can customize this)
        description: 'Image Description' // Description for the image (you can customize this)
      }))
    : []

  const renderHtml = html => {
    return { __html: html }
  }

  return (
    <div className='blogViewlist'>
      <Sidebar />
      <div className='blogViewlistContainer'>
        <div className='image-gallery'>
          <div>
            {
              <Lightbox
                images={images}
                thumbnailWidth='150px'
                thumbnailHeight='150px'
              />
            }
          </div>
        </div>
        <div className='cWrapper'>
          <div className='tdiv'>
            <h1>{data.title}</h1>
          </div>
          <div className='sdiv'>
            <h2>{data.summary}</h2>
          </div>
          <div className='cdiv'>
            <div dangerouslySetInnerHTML={renderHtml(data.content)} />
          </div>
        </div>
      </div>
    </div>
  )
}
