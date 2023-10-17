import useFetch from "../../hooks/useFetch";
import SyncLoader from 'react-spinners/SyncLoader';
import "./featuredProperties.css";


const FeaturedProperties = () => {
  const { data, loading } = useFetch('/hotel/gethotels?featured=true&limit=4');


  return (
    <div className="fp">
      {loading ? (
        <SyncLoader
          color='#36d7b7'
          loading={loading}
          size={10}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        data.map((item) => (
          <div className="fpItem" key={item._id}>
            <img
              src={item.photos[0]}
              alt=""
              className="fpImg"
            />
            <span className="fpName">{item.name}</span>
            <span className="fpCity">{item.city}</span>
            <span className="fpPrice">Starting from <b> ₹ </b>{item.cheapestPrice}</span>
            <div className="fpRating">
              <button className="fpButton">{item.rating}</button>
              <span>{item.rating >= 4 ? 'Excellent' : 'Good'}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default FeaturedProperties;
