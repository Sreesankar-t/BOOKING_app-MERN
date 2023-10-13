import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js';
import Admin from '../models/admainModel.js';
import bcrypt from "bcrypt";
import User from '../models/userModel.js';
import Hotel from '../models/hotel/hotelModel.js';



const adminLogin = asyncHandler(async (req, res) => {
    console.log(req.body)
     const {email,password}= req.body
    
       try {
         const admin = await Admin.findOne({ email });
        console.log(admin+"database");
         if (!admin) {
           return res.status(404).json({ message: 'Admin not found' });
         }
          const Dpassword =admin.password
          console.log(Dpassword +"database password");
          console.log(password +"input password");

         if (admin.password != password) {
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

    const getUser = asyncHandler(async (req, res) => {
      console.log("jokjkjknnm");
      try {
        const users = await User.find();
        res.status(200).json(users);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
    });


    
    const deleteUser = asyncHandler(async (req, res) => {
      const id = req.params.id;
      
      try {
       
        const result = await User.deleteOne({ _id: id });
    
        if (result.deletedCount === 1) {
          res.status(200).json({ message: 'User deleted successfully' });
        } else {
          res.status(404).json({ message: 'User not found' });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
    });

    const hideUser = asyncHandler( async (req, res) => {
      const userId = req.params.id;
      console.log(userId+"this is i ddddddddd");
      try {
        // Find the user by ID
        const user = await User.findById(userId);
   
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        // Update the isUser field to false
        user.isUser = false;
    
        // Save the updated user
        await user.save();
        console.log(user,"updated useriiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
        res.status(200).json(user);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
    });


    const UnHideUser = asyncHandler( async (req, res) => {
      const userId = req.params.id;
      console.log(userId+"this is i dddddddddhgjdhjhjhgdhj");
      try {
        
        const user = await User.findById(userId);
   
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    
     
        user.isUser = true;
    
        
        await user.save();
        
        res.status(200).json(user);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
    });
    

    const getHotel = asyncHandler(async (req, res) => {
      
      try {
        const hotels = await Hotel.find();
        res.status(200).json(hotels);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
    });



    const approveHotel = asyncHandler( async (req, res) => {
      const hotelId = req.params.id;
      console.log(hotelId+"this is i hotel id ");
      try {
        
        const hotel = await Hotel.findById(hotelId);
   
        if (!hotel) {
          return res.status(404).json({ message: 'Hotel not found' });
        }
    
     
        hotel.approveHotel = true;
    
        
        await hotel.save();
       
        res.status(200).json(hotel);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
    });

    export {adminLogin,adminLogout,getUser,deleteUser,hideUser,UnHideUser,getHotel,approveHotel}