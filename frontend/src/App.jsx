import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './pages/client/Home'
import List from './pages/client/List'
import HotelDetails from './pages/client/HotelDetails'
import Login from './pages/client/Login'
import axios from 'axios';
import Register from './pages/client/Register'
import AdminHome from './pages/admin/Home'
import './app.css'
import User from './pages/admin/User'

axios.defaults.baseURL = "http://localhost:8000"

export default function App() {
  return (
   <BrowserRouter>
   <Routes>

    {/* clint routes */}

    <Route path='/' element={<Home/>}  className="page-enter page-enter-active" />
    <Route path='/hotels' element={<List/> } className="page-enter page-enter-active" />
    <Route path='/hotelDetails' element={<HotelDetails/>}  className="page-enter page-enter-active"/>
    <Route path='/login' element={<Login/> }/>
    <Route path='/register' element={<Register/> } className="page-enter page-enter-active"/>

    {/* clint routes */}


    {/* admin routes */}

    <Route path='/admin' element={<AdminHome/> } className="page-enter page-enter-active"/>
    <Route path='/users' element={<User/>} className="page-enter page-enter-active"/>
   


    {/* admin routes */}


   </Routes>
   </BrowserRouter>
  )
}


