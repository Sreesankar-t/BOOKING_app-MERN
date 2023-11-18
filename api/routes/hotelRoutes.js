import express from 'express'
import {
  loginHotel,
  registerHotel,
  hotelLogout,
  CreateHotels,
  getHotelList,
  deleteHotel,
  CreateRoom,
  getRoomlList,
  deleteRoom,
  coutByCity,
  getHotelsUserSide,
  getHotels,
  getSingleHotel,
  getHotelRoom,
  updateRoomStatus,
  getHotelBookingDetails,
  getTotalHotel,
  getTotalRoom,
  getTotalBooking,
  todayBookingCount,
  getTotalRoomPrice,
  getTotalPriceLastWeek,
  getTotalPriceAllTime,
  getTotalPriceLastMonth,
  getTotalRoomPriceByMonth
} from '../controller/hotelController.js'
import { protectOwner } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/register', registerHotel)
router.post('/login', loginHotel)
router.post('/logout', hotelLogout)
router.post('/createhotel',protectOwner, CreateHotels)
router.get('/listhotel/:Id',protectOwner, getHotelList)
router.get('/listroom/:Id',protectOwner, getRoomlList)
router.delete('/listhotel/:id',protectOwner, deleteHotel)
router.delete('/listroom/:id',protectOwner, deleteRoom)
router.post('/createroom/:id',protectOwner, CreateRoom)
router.get('/countByCity', coutByCity)
router.get('/gethotels', getHotelsUserSide)
router.get('/gethotelsSearch', getHotels)
router.get('/getSingleHotel/:id', getSingleHotel)
router.get('/room/:id', getHotelRoom)
router.put('/availability/:id', updateRoomStatus)
router.get('/listHotelBooking/:id', getHotelBookingDetails)
router.get('/getTotalRoomPriceByMonth/:id', getTotalRoomPriceByMonth)

//dashboard route start
router.get('/getHotel/:id',protectOwner, getTotalHotel)
router.get('/getTotalRoom/:id',protectOwner, getTotalRoom)
router.get('/getTotalBooking/:id',protectOwner, getTotalBooking)
router.get('/today/:id',protectOwner, todayBookingCount)
router.get('/totalPrice/:id',protectOwner, getTotalRoomPrice)
router.get('/getTotalPriceLastWeek/:id',protectOwner, getTotalPriceLastWeek)
router.get('/getTotalPriceAllTime/:id',protectOwner, getTotalPriceAllTime)
router.get('/getTotalPriceLastMonth/:id',protectOwner, getTotalPriceLastMonth)
//dashboard route end

export default router
