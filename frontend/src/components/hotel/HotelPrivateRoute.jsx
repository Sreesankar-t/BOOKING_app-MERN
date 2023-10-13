import { Navigate, Outlet, } from "react-router-dom";
import { useContext } from "react";
import { HotelAuthContext } from "../../context/hotel/HotelContext";

const HotelPrivateRoute = () => {
    const { hotel, loading } = useContext(HotelAuthContext);
    
    if (loading) {
      return <div>loading</div> ;
    }
    return hotel && hotel. approveHotel === true  ? <Outlet/> : <Navigate to="/hotellogin" replace />;
    };
    export default HotelPrivateRoute;
