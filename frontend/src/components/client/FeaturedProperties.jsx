import useFetch from '../../hooks/useFetch'
import SyncLoader from 'react-spinners/SyncLoader'
import './featuredProperties.css'
import { useNavigate } from 'react-router-dom'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const FeaturedProperties = () => {
  const { data, loading } = useFetch('/hotel/gethotels?featured=true&limit=4')
  const navigate = useNavigate()

  const handleClick = id => {
    navigate(`/hotelDetails/${id}`)
  }

  return (
    <div className='fp'>
      {loading ? (
        <SyncLoader
          color='#36d7b7'
          loading={loading}
          size={10}
          aria-label='Loading Spinner'
          data-testid='loader'
        />
      ) : (
        data.map(item => (
          <div
            onClick={() => handleClick(item._id)}
            className='fpItem'
            key={item.id}
          >
            <img
              src={
                item.photos[0] ||
                'https://media.istockphoto.com/id/627892060/photo/hotel-room-suite-with-view.jpg?s=612x612&w=0&k=20&c=YBwxnGH3MkOLLpBKCvWAD8F__T-ypznRUJ_N13Zb1cU='
              }
              alt=''
              className='fpImg'
            />
            <span className='fpName'>{item.name}</span>
            <span className='fpCity'>{item.city}</span>
            <span className='fpPrice'>
              Starting from <b> ₹ </b>
              {item.cheapestPrice}
            </span>
            <div className='fpRating'>
              <button className='fpIcon'>
                {' '}
                <FontAwesomeIcon icon={faStar} />
              </button>
              <span className='starSPan'>
                <b>{item.rating}</b> Star hotel
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default FeaturedProperties
