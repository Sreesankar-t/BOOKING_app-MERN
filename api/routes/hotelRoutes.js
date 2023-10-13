import  express  from "express";
import { loginHotel, registerHotel ,hotelLogout,CreateHotels,getHotelList,deleteHotel,CreateRoom,getRoomlList,deleteRoom} from "../controller/hotelController.js";
// import multer from "multer";
// import path from "path";
const router = express.Router()



router.post('/register',registerHotel)
router.post('/login',loginHotel)
router.post('/logout',hotelLogout)
router.post('/createhotel',CreateHotels)
router.get('/listhotel',getHotelList)
router.get('/listroom',getRoomlList)
router.delete('/listhotel/:id',deleteHotel)
router.delete('/listroom/:id',deleteRoom)
router.post('/createroom/:id',CreateRoom)

export default router
