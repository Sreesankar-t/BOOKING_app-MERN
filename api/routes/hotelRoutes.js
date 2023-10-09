import  express  from "express";
import { loginHotel, registerHotel ,hotelLogout} from "../controller/hotelController.js";
import multer from "multer";
import path from "path";
const router = express.Router()



router.post('/register',registerHotel)
router.post('/login',loginHotel)
router.post('/logout',hotelLogout)


export default router