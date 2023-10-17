import express from 'express'
const router = express.Router()
import {
  authUser,
  registerUser,
  LogoutUser,
  getUserProfile
} from '../controller/userController.js'
import { protect } from '../middleware/authMiddleware.js'

router.post('/register', registerUser)
router.post('/auth', authUser)
router.post('/logout', LogoutUser)
router.get('/profile', protect, getUserProfile)

export default router
