import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js';
import Admin from '../models/admainModel.js';
import bcrypt from "bcrypt";

const adminLogin = asyncHandler(async (req, res) => {
    console.log(req.body)
    const {email,password} = req.body;
    console.log(email+"adminnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn");
   
       try {
         const admin = await Admin.findOne({ email });
        
         if (!admin) {
           return res.status(404).json({ message: 'Admin not found' });
         }
     
         const isPasswordCorrect = await bcrypt.compare(password, admin.password);
         
          
         if (!isPasswordCorrect) {
           return res.status(401).json({ message: 'Wrong password or email' });
         }
         // generate token 
         generateToken(res,admin._id)
   
         res.status(200).json(admin);
   
       } catch (err) {
         console.error(err);
         res.status(500).json({ message: 'Internal server error' });
       }
     });


     const adminLogout =asyncHandler( async (req,res)=>{

        res.cookie('jwt','',{
            httpOnly:true,
            expires:new Date(0)
        })
        res.status(200).json({message:'Admin Logged Out'})
    });


    export {adminLogin,adminLogout}