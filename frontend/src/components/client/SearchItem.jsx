import { Link } from 'react-router-dom'
import './searchItem.css'
import { Rating } from '@mui/material'
import PropTypes from 'prop-types'

export default function SearchItem ({ item }) {
  return (
    <div className='searchItem'>
      <img
        src={
          item.photos[0] ||
          'https://c4.wallpaperflare.com/wallpaper/721/832/884/5-star-hotel-room-wallpaper-preview.jpg'
        }
        alt=''
        className='siImg'
      />
      <div className='siDesc'>
        <h1 className='siTitle'>{item.name}</h1>
        <span className='siDistance'>
          <b>{item.city}</b>
        </span>
        <span className='siDistance'>{item.distance} km from City center</span>
        {/* <span className="siTaxiOp">Free airport taxi</span> */}
        <span className='siSubtitle'>{item.desc}</span>
        <span className='siFeatures'>{item.title}</span>
        <span className='siCancelOp'>Free cancellation </span>
        <span className='siCancelOpSubtitle'>
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className='siDetails'>
        <div className='siRating'>
          <Rating
            name='simple-controlled'
            value={item.rating}
            readOnly={true}
          />
          <span>{item.rating >= 4 ? `Excellent` : `Good`}</span>
        </div>
        <div className='siDetailTexts'>
          <span className='siPrice'>₹ {item.cheapestPrice}</span>
          <span className='siTaxOp'>Include taxes and fees</span>
          <Link to={`/hotelDetails/${item._id}`}>
            <button className='siCheckButton'>See availability</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

SearchItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    distance: PropTypes.string.isRequired,
    photos: PropTypes.arrayOf(PropTypes.string).isRequired,
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    rooms: PropTypes.arrayOf(PropTypes.string).isRequired,
    cheapestPrice: PropTypes.number.isRequired,
    featured: PropTypes.bool.isRequired
  }).isRequired
}
