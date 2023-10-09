import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js';
import bcrypt from "bcrypt";
import Hotel from '../models/hotelModel.js';




const registerHotel = asyncHandler(async (req, res) => {

    const { name, email,password ,number,Cpassword,address} = req.body;
    

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^[^\s\d]+$/;
    const trimmedAddress = address.trim();

    if (!nameRegex.test(name)) {
      return res.status(400).json({ message: ' Please enter valid hotel name' });
    }


    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }
    if (!trimmedAddress) {
      return res.status(400).json({ message: 'please enter your address' });
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
      const hotelExist = await Hotel.findOne({ email });

 
      if (hotelExist && hotelExist.email === email) {
        return res.status(400).json({ message: 'Hotel already exists' });
      }
  
      const hotel = new Hotel({
        name: name,
        email: email,
        phone:number,
        password: hash,
        address:address,
      
      });
  
      await hotel.save();

      
  
      if (hotel) {
        generateToken(res, hotel._id);
        res.status(200).json({
          _id: hotel._id,
          name: hotel.name,
          email: hotel.email,
          approveHotel:hotel.approveHotel
        });
      } else {
        return res.status(400).json({ message: 'Invalid hotel data' });
      }
    } catch (error) {
      console.error("Error querying the database:", error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });



  const loginHotel = asyncHandler(async (req, res) => {
    console.log(req.body)
    const {email,password} = req.body;
   
   
       try {
         const hotel = await Hotel.findOne({ email });
         console.log(hotel)
         if (!hotel) {
           return res.status(404).json({ message: 'Hotel not found' });
         }
      
     
         const isPasswordCorrect = await bcrypt.compare(req.body.password, hotel.password);
         
          
         if (!isPasswordCorrect) {
           return res.status(401).json({ message: 'Wrong password or email' });
         }

         const approve = hotel.approveHotel
       
         if (approve == false) {
           return res.status(404).json({ message: 'Your approval is peddiing ' });
         }
         
         // generate token 
         generateToken(res,hotel._id)
   
         res.status(200).json(hotel);
   
       } catch (err) {
         console.error(err);
         res.status(500).json({ message: 'Internal server error' });
       }
     });


     
     const hotelLogout =asyncHandler( async (req,res)=>{

        res.cookie('jwt','',{
            httpOnly:true,
            expires:new Date(0)
        })
        res.status(200).json({message:'Hotel Logged Out'})
    });

   

  export {registerHotel,loginHotel, hotelLogout}
  