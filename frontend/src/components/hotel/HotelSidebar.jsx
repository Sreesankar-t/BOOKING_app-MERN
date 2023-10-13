import "./hotelsidebar.css";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { HotelAuthContext } from "../../context/hotel/HotelContext";

const HotelSidebar = () => {

  const navigate =useNavigate()
  const { hotel,dispatch} = useContext(HotelAuthContext)

  const handleLogout = () => {
   
    dispatch({ type: "LOGOUT" });
  
   
    axios.post('/hotel/logout')
      .then((response) => {
        
        console.log("Logout successful", response.data);
     
        navigate("/hotellogin"); 
      })
      .catch((error) => {
       
        console.error("Logout failed", error);

      });
  };


  return (
    <div className="hsidebar">
      <div className="htop">
       {hotel ? <span  className="hlogo" >{` ${hotel.name}`}</span>: <Link to="/admin" style={{ textDecoration: "none" }}>
          <span className="hlogo">HOTELS</span>
        </Link>}
      </div>
      <hr />
      <div className="hcenter">
        <ul>
          {/* <p className="htitle">MAIN</p>
          <li>
            <DashboardIcon className="hicon" />
            <span>Dashboard</span>
          </li> */}
          <p className="htitle">LISTS</p>
        
          <Link to="/listhotel" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="hicon" />
              <span>Hotels</span>
            </li>
          </Link>
          <Link to="/listroom" style={{ textDecoration: "none" }}>
          <li>
            <CreditCardIcon className="hicon" />
            <span>Rooms</span>
          </li>
          </Link>
{/*        
          <li>
            <SettingsApplicationsIcon className="icon" />
            <span>Settings</span>
          </li> */}
          <p className="htitle">USER</p>
          <li>
            <AccountCircleOutlinedIcon className="hicon" />
            <span>Profile</span>
          </li>
          <li>
            <ExitToAppIcon className="hicon" />
            <span onClick={handleLogout}>Logout</span>
          </li>
        </ul>
      </div>
     
    </div>
  );
};

export default HotelSidebar;