import "./sidebar.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import { AdminUthContext } from '../../context/admin/AdminContext'
import { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {

  const navigate =useNavigate()
  const { admin,dispatch} = useContext(AdminUthContext)

  const handleLogout = () => {
   
    dispatch({ type: "LOGOUT" });
  
   
    axios.post('/admin/logout')
      .then((response) => {
        
        console.log("Logout successful", response.data);
     
        navigate("/adminlogin"); 
      })
      .catch((error) => {
       
        console.error("Logout failed", error);

      });
  };


  return (
    <div className="sidebar">
      <div className="top">
       {admin ? <span  className="logo" >{`WANDERINN ${admin.name}`}</span>: <Link to="/admin" style={{ textDecoration: "none" }}>
          <span className="logo">WANDERINN ADMIN</span>
        </Link>}
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          <p className="title">LISTS</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/hotellist" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Hotels</span>
            </li>
          </Link>
          <li>
            <CreditCardIcon className="icon" />
            <span>Blogs</span>
          </li>
{/*        
          <li>
            <SettingsApplicationsIcon className="icon" />
            <span>Settings</span>
          </li> */}
          <p className="title">USER</p>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
          <li>
            <ExitToAppIcon className="icon" />
            <span onClick={handleLogout}>Logout</span>
          </li>
        </ul>
      </div>
     
    </div>
  );
};

export default Sidebar;