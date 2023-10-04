import './searchItem.css'

export default function SearchItem() {
  return (
    <div className='searchItem'>
      <img src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww&w=1000&q=80" alt="" className="siImg" />
      <div className="siDesc">
      <h1 className="siTitle">Tower Street Apartments</h1>
        <span className="siDistance">500m from center</span>
        {/* <span className="siTaxiOp">Free airport taxi</span> */}
        <span className="siSubtitle">
          Studio Apartment with Air conditioning
        </span>
        <span className="siFeatures">
          Entire studio • 1 bathroom • 21m² 1 full bed
        </span>
        <span className="siCancelOp">Free cancellation </span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails">
        <div className="siRating">
            <span>Excellent</span>
            <button>7.8</button>
        </div>
        <div className="siDetailTexts">
            <span className="siPrice">₹ 12000</span>
            <span className="siTaxOp">Include taxes and fees</span>
            <button className='siCheckButton'>See availability</button>
        </div>
      </div>
    </div>
  )
}
