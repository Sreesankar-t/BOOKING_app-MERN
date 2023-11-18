import express from 'express'
const router = express.Router()
import {
  authUser,
  registerUser,
  LogoutUser,
  getUserProfile,
  hotelBooking,
  getBookingDetails,
  updateUserProfile,
  getUser,
  forgotPassword,
  changePassword,
  getPymetDetails,
  checkoutSection
} from '../controller/userController.js'
import { protect } from '../middleware/authMiddleware.js'

router.post('/register', registerUser)
router.post('/auth', authUser)
router.put('/changePassword/:id', changePassword)
router.post('/forgotpassword', forgotPassword)
router.post('/logout', LogoutUser)
router.get('/profile', protect, getUserProfile)
router.post('/BookingDetails', protect, hotelBooking)
router.get('/getBookingDetails/:id', protect, getBookingDetails)
router.put('/editProfile/:id', protect, updateUserProfile)
router.get('/getUser/:id', protect, getUser)
router.get('/getPymetDetails/:id', getPymetDetails)
router.post('/checkoutSection', checkoutSection)

export default router
