import  express  from "express";
const router = express.Router()
import { adminLogin,adminLogout } from "../controller/adminContriller.js";

router.post('/admin/login',adminLogin)

router.post('/admin/logout',adminLogout)


export default router