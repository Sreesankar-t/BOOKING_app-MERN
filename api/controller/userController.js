import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';
import { Error } from 'mongoose';
import bcrypt from "bcrypt";


const authUser = asyncHandler(async (req, res) => {
 console.log(req.body)
 const {email,password} = req.body;

    try {
      const user = await User.findOne({ email });
      console.log(user)
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
      
       
      if (!isPasswordCorrect) {
        return res.status(401).json({ message: 'Wrong password or email' });
      }
      // generate token 
      generateToken(res,user._id)

      res.status(200).json(user);

    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  

  const registerUser = asyncHandler(async (req, res) => {

    const { name, email,password ,number,Cpassword} = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^[^\s\d]+$/;

    if (!nameRegex.test(name)) {
      return res.status(400).json({ message: ' Please enter valid name' });
    }

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    if (password.length < 4 || /\s/.test(password)) {
      return res.status(400).json({ message: 'Password should be at least 4 ' });
    }

    if(Cpassword && Cpassword !== password){
      return res.status(400).json({ message: 'Enter correct password ' });
    }

    const salt = bcrypt.genSaltSync(10);

    const hash = bcrypt.hashSync(password, salt);
    
  
    try {
      console.log(email);
      const userExist = await User.findOne({ email });
      console.log(userExist);
      console.log(userExist && userExist.email + "this is email");
  
      if (userExist && userExist.email === email) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      const user = new User({
        name: name,
        email: email,
        phone:number,
        password: hash,
      });
  
      await user.save();
  
      if (user) {
        generateToken(res, user._id);
        res.status(200).json({
          _id: user._id,
          name: user.name,
          email: user.email,
        });
      } else {
        return res.status(400).json({ message: 'Invalid user data' });
      }
    } catch (error) {
      console.error("Error querying the database:", error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
  




const LogoutUser =asyncHandler( async (req,res)=>{

    res.cookie('jwt','',{
        httpOnly:true,
        expires:new Date(0)
    })
    res.status(200).json({message:'User Logged Out'})
});



const getUserProfile =asyncHandler( async (req,res)=>{

const user={
    id:req.user._id,
    name:req.user.name,
    email:req.user.email,
    
}

    res.status(200).json(user)
});


export {authUser,registerUser,LogoutUser,getUserProfile};