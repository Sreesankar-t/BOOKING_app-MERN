import './app.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/client/Home'
import List from './pages/client/List'
import HotelDetails from './pages/client/HotelDetails'
import Login from './pages/client/Login'
import axios from 'axios'
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
import {
  ListHotelColumns,
  blogColumns,
  bookingColumns,
  hotelColumns,
  ownerBookingColumns,
  roomColumns,
  userColumns
} from './datatablesource'
import ListHotel from './pages/hotel/ListHotel'
import AddNewHotel from './pages/hotel/AddNewHotel'
import ClientPrivateRoute from './components/client/ClientPrivateRoute'
import NewRoom from './pages/hotel/AddNewRoom'
import Profile from './pages/client/Profile'
import Blog from './pages/admin/Blog'
import ListBlogs from './pages/client/ListBlogs'
import SingleBlog from './pages/client/SingleBlog'
import BlogList from './pages/admin/BlogLists'
import BlogView from './pages/admin/BlogView'
import Forgotpassword from './pages/client/forgotpassword'
import EditBlog from './pages/admin/EditBlog'
import BookingList from './pages/admin/BookingList'
import ListHotelBooking from './pages/hotel/ListHotelBooking'
import ErrorPage from './ErrorPage'
import CheckoutSuccess from './pages/client/CheckoutSuccess'

//axios config start
axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true
// axios config end

export default function App () {
  return (
    <BrowserRouter>
      <Routes>
        {/* clint routes */}

        <Route path='/login' element={<Login />} />
        <Route path='/login/:id' element={<Forgotpassword />} />
        <Route path='/register' element={<Register />} />
        <Route path='' element={<ClientPrivateRoute />}>
          <Route path='/' element={<Home />} />
          <Route path='/hotels' element={<List />} />
          <Route path='/hotelDetails/:id' element={<HotelDetails />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/listblogs' element={<ListBlogs />} />
          <Route path='/blogDetails/:id' element={<SingleBlog />} />
          <Route path='/checkoutSuccess' element={<CheckoutSuccess />} />
          <Route path='/*' element={<ErrorPage />} />
        </Route>

        {/* clint routes */}

        {/* admin routes */}
        <Route path='/adminlogin' element={<AdminLogin />} />
        <Route path='' element={<AdminPrivateRoute />}>
          <Route path='/admin' element={<AdminHome />} />
          <Route path='/users' element={<User columns={userColumns} />} />
          <Route
            path='/owners'
            element={<HotelList columns={hotelColumns} />}
          />
          <Route
            path='/BlogsList'
            element={<BlogList columns={blogColumns} />}
          />
          <Route
            path='/BookingList'
            element={<BookingList columns={bookingColumns} />}
          />
          <Route path='/BlogsList/new' element={<Blog />} />
          <Route path='/BlogsList/:id' element={<BlogView />} />
          <Route path='/editBlog/:id' element={<EditBlog />} />
          <Route path='/*' element={<ErrorPage />} />
        </Route>

        {/* admin routes */}

        {/* hotel routes */}

        <Route path='/hotelregister' element={<HotelRegister />} />
        <Route path='/hotellogin' element={<HotelLogin />} />
        <Route path='' element={<HotelPrivateRoute />}>
          <Route path='/hotel' element={<HotelHome />} />
          <Route
            path='/listhotel'
            element={<ListHotel columns={ListHotelColumns} />}
          />
          <Route path='/listhotel/new' element={<AddNewHotel />} />
          <Route
            path='/listroom'
            element={<ListHotel columns={roomColumns} />}
          />
          <Route
            path='/listHotelBooking'
            element={<ListHotelBooking columns={ownerBookingColumns} />}
          />
          <Route path='/listroom/new' element={<NewRoom />} />
          <Route path='/*' element={<ErrorPage />} />
        </Route>

        {/* hotel routes */}
      </Routes>
    </BrowserRouter>
  )
}
