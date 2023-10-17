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
  getSingleHotel
} from '../controller/hotelController.js'

const router = express.Router()

router.post('/register', registerHotel)
router.post('/login', loginHotel)
router.post('/logout', hotelLogout)
router.post('/createhotel', CreateHotels)
router.get('/listhotel/:Id', getHotelList)
router.get('/listroom/:Id', getRoomlList)
router.delete('/listhotel/:id', deleteHotel)
router.delete('/listroom/:id', deleteRoom)
router.post('/createroom/:id', CreateRoom)
router.get('/countByCity', coutByCity)
router.get('/gethotels', getHotelsUserSide)
router.get('/gethotelsSearch', getHotels)
router.get('/getSingleHotel/:id', getSingleHotel)

export default router
