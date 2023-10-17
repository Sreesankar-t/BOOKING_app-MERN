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
  approveHotel
} from '../controller/adminController.js'

router.post('/login', adminLogin)

router.post('/logout', adminLogout)

router.get('/users', getUser)

router.delete('/users/:id', deleteUser)

router.get('/hideuser/:id', hideUser)

router.get('/unHideUser/:id', UnHideUser)

router.get('/hotellist', getHotel)

router.get('/hotellist/:id', approveHotel)

export default router

