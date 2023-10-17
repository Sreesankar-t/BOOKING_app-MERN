import './app.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './pages/client/Home'
import List from './pages/client/List'
import HotelDetails from './pages/client/HotelDetails'
import Login from './pages/client/Login'
import axios from 'axios';
import Register from './pages/client/Register'
import AdminHome from './pages/admin/Home'
import User from './pages/admin/User'
import AdminLogin from './pages/admin/AdminLogin'
import AdminPrivateRoute from './components/admin/AdminPrivateRouter'
import HotelHome from './pages/hotel/HotelHome'
import HotelRegister from './pages/hotel/HotelRegister'
import HotelLogin from './pages/hotel/HotelLogin'
import HotelPrivateRoute from './components/hotel/HotelPrivateRoute'
import HotelList from './pages/admin/HotelDetails'
import { ListHotelColumns, hotelColumns, roomColumns, userColumns } from './datatablesource'
import ListHotel from './pages/hotel/ListHotel'
import AddNewHotel from './pages/hotel/AddNewHotel'
import ClientPrivateRoute from './components/client/ClientPrivateRoute'
import NewRoom from './pages/hotel/AddNewRoom'

axios.defaults.baseURL = "http://localhost:8000"

export default function App() {
  return (
   <BrowserRouter>
   <Routes>

    {/* clint routes */}
    <Route path='/login' element={<Login/> }/>
    <Route path='/register' element={<Register/> } className="page-enter page-enter-active"/>
    <Route path='' element={<ClientPrivateRoute/>}>
    <Route path='/' element={<Home/>}  className="page-enter page-enter-active" />
    <Route path='/hotels' element={<List/> } className="page-enter page-enter-active" />
    <Route path='/hotelDetails/:id' element={<HotelDetails/>}  className="page-enter page-enter-active"/>
    </Route>
    
    {/* clint routes */}


    {/* admin routes */}
    <Route path='/adminlogin' element={<AdminLogin/>} className="page-enter page-enter-active"/>
    <Route path='' element={<AdminPrivateRoute/>}>
    <Route path='/admin' element={<AdminHome/> } className="page-enter page-enter-active"/>
    <Route path='/users' element={<User columns={userColumns} />} />
    <Route path='/hotellist' element={<HotelList columns={ hotelColumns }/>} />
    </Route>

    {/* admin routes */}


  {/* hotel routes */}

    
     <Route path='/hotelregister' element={<HotelRegister/>} />
     <Route path='/hotellogin' element={<HotelLogin/>} />
     <Route path='' element={<HotelPrivateRoute/>}>
     <Route path='/hotel' element={<HotelHome/>} />
     <Route path='/listhotel' element={<ListHotel columns={ListHotelColumns}/>} />
     <Route path='/listhotel/new' element={<AddNewHotel/>} />
     <Route path='/listroom' element={<ListHotel columns={roomColumns}/>} />
     <Route path='/listroom/new' element={<NewRoom/>} />
     </Route>
    
  {/* hotel routes */}


   </Routes>
   </BrowserRouter>
  )
}


