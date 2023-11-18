import Navbar from '../../components/client/Navbar'
import Header from '../../components/client/Header'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'
import { useLocation } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import Stack from '@mui/material/Stack'
import LinearProgress from '@mui/material/LinearProgress' // Add this import statement
import './singleblog.css'

export default function SingleBlog () {
  const location = useLocation()
  const id = location.pathname.split('/')[2]
  console.log(id)

  const { data, loading } = useFetch(`/admin/singleBlog/${id}`)

  const images = data.photos
    ? data.photos.map(photo => ({
        original: photo,
        thumbnail: photo // You can set a different thumbnail if needed
      }))
    : []

  const renderHtml = html => {
    return { __html: html }
  }

  return (
    <div>
      <Navbar />
      <Header type='list' />

      {loading ? (
        <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={5}>
          <LinearProgress
            color='inherit'
            sx={{ animation: 'blink 1s infinite' }}
          />
          <LinearProgress
            color='inherit'
            sx={{ animation: 'blink 1s infinite' }}
          />
          <LinearProgress
            color='inherit'
            sx={{ animation: 'blink 1s infinite' }}
          />
          <LinearProgress
            color='inherit'
            sx={{ animation: 'blink 1s infinite' }}
          />
          <LinearProgress
            color='inherit'
            sx={{ animation: 'blink 1s infinite' }}
          />
          <LinearProgress
            color='inherit'
            sx={{ animation: 'blink 1s infinite' }}
          />
          <LinearProgress
            color='inherit'
            sx={{ animation: 'blink 1s infinite' }}
          />
          <LinearProgress
            color='inherit'
            sx={{ animation: 'blink 1s infinite' }}
          />
          <LinearProgress
            color='inherit'
            sx={{ animation: 'blink 1s infinite' }}
          />
          <LinearProgress
            color='inherit'
            sx={{ animation: 'blink 1s infinite' }}
          />
          <LinearProgress
            color='inherit'
            sx={{ animation: 'blink 1s infinite' }}
          />
          <LinearProgress
            color='inherit'
            sx={{ animation: 'blink 1s infinite' }}
          />
          <LinearProgress
            color='inherit'
            sx={{ animation: 'blink 1s infinite' }}
          />
        </Stack>
      ) : (
        <>
          <div className='image-gallery'>
            <ImageGallery className='iImage' items={images} />
          </div>
          <div className='cWrapper'>
            <div className='tdiv'>
              <h1>{data.title}</h1>
            </div>
            <div className='sdiv'>
              <p>{data.summary}</p>
            </div>
            <div className='cdiv'>
              <div dangerouslySetInnerHTML={renderHtml(data.content)} />
            </div>
          </div>
        </>
      )}
    </div>
  )
}
