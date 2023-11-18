import Header from '../../components/client/Header'
import Navbar from '../../components/client/Navbar'
import './listblogs.css'
import useFetch from '../../hooks/useFetch'
import { Link } from 'react-router-dom'
import Stack from '@mui/material/Stack'
import LinearProgress from '@mui/material/LinearProgress'
import { formatISO9075 } from 'date-fns'

export default function ListBlogs () {
  const { data, loading } = useFetch('/admin/blogdetails')

  return (
    <div className='lbContainer'>
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
          <div className='home'>
            <div className='posts'>
              {data.map(post => (
                <div className='post' key={post.id}>
                  <div className='img'>
                    <img src={post.photos[0]} alt='' />
                  </div>
                  <div className='content'>
                    <h1>{post.title}</h1>
                    <time>{formatISO9075(new Date(post.createdAt))}</time>

                    <div className='h3container'>
                      <p>{post.summary}</p>
                    </div>
                    <Link to={`/blogDetails/${post._id}`}>
                      <button>Read More</button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
