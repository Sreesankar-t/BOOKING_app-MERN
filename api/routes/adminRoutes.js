import express from 'express'
const router = express.Router()
import {
  adminLogin,
  adminLogout,
  getUser,
  deleteUser,
  hideUser,
  UnHideUser,
  getHotel,
  approveHotel,
  createBlog,
  getBlogs,
  getSingleBlog,
  BlogList,
  deleteBlog,
  getTotalUser,
  getTotalBlog,
  getTotalBooking,
  getTotalHotel,
  todayBookingCount,
  getTotalRoomPrice,
  getTotalPriceLastWeek,
  getTotalPriceAllTime,
  getTotalPriceLastMonth,
  getTotalRoomPriceByMonth,
  updateBlog,
  getAllBookings,
  getOwnerHotels
} from '../controller/adminController.js'
import { protectAdmin } from '../middleware/authMiddleware.js'

router.post('/login', adminLogin)

router.post('/logout', adminLogout)

router.get('/users', protectAdmin, getUser)

router.delete('/users/:id', protectAdmin, deleteUser)

router.get('/hideuser/:id', protectAdmin, hideUser)

router.get('/unHideUser/:id', protectAdmin, UnHideUser)

router.get('/owners', protectAdmin, getHotel)

router.get('/hotellist/:id', protectAdmin, approveHotel)

router.post('/posteBlog', protectAdmin, createBlog)

router.get('/blogdetails', protectAdmin, getBlogs)

router.get('/singleBlog/:id', protectAdmin, getSingleBlog)

router.get('/BlogsList', protectAdmin, BlogList)

router.delete('/BlogsList/:id', protectAdmin, deleteBlog)

// dashbord routes

router.get('/getTotalUser', protectAdmin, getTotalUser)
router.get('/getTotalBlog', protectAdmin, getTotalBlog)
router.get('/getTotalBooking', protectAdmin, getTotalBooking)
router.get('/getTotalHotel', protectAdmin, getTotalHotel)
router.get('/today', protectAdmin, todayBookingCount)
router.get('/totalPrice', protectAdmin, getTotalRoomPrice)
router.get('/getTotalPriceLastWeek', protectAdmin, getTotalPriceLastWeek)
router.get('/getTotalPriceAllTime', protectAdmin, getTotalPriceAllTime)
router.get('/getTotalPriceLastMonth', protectAdmin, getTotalPriceLastMonth)
router.get('/getTotalRoomPriceByMonth', protectAdmin, getTotalRoomPriceByMonth)

// dashbord routes end

router.put('/editBlog/:id', protectAdmin, updateBlog)
router.get('/BookingList', protectAdmin, getAllBookings)
router.get('/getOwnerHotels/:id', protectAdmin, getOwnerHotels)

export default router
