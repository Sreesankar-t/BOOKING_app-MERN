import { Link } from 'react-router-dom'
import './searchItem.css'
import { Rating } from '@mui/material';

export default function SearchItem({item}) {
  return (
    <div className='searchItem'>
      <img src={item.photos[0]} alt="" className="siImg" />
      <div className="siDesc">
      <h1 className="siTitle">{item.name}</h1>
        <span className="siDistance"><b>{item.city}</b></span>
        <span className="siDistance">{item.distance} km from City center</span>
        {/* <span className="siTaxiOp">Free airport taxi</span> */}
        <span className="siSubtitle">
        {item.desc}

        </span>
        <span className="siFeatures">
          {item.title}
        </span>
        <span className="siCancelOp">Free cancellation </span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails">
        <div className="siRating">
        <Rating
  name="simple-controlled"
  value={item.rating}
  readOnly={true}
 
/>
            <span>{item.rating >= 4 ?`Excellent`:`Good`}</span>
           
        </div>
        <div className="siDetailTexts">
            <span className="siPrice">₹ {item.cheapestPrice}</span>
            <span className="siTaxOp">Include taxes and fees</span>
            <Link to={`/hotelDetails/${item._id}`}>
            <button className='siCheckButton'>See availability</button>
            </Link>
           
        </div>
      </div>
    </div>
  )
}
