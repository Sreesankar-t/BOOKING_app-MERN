import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js';
import bcrypt from "bcrypt";
import Hotel from '../models/hotel/hotelModel.js';
import ListHotel from '../models/hotel/listHotelmodel.js';
import Room from '../models/hotel/roomModel.js';




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


    const CreateHotels = asyncHandler(async (req, res, next) => {
      const { name, city, address, photos,
              title, desc, rating, rooms, featured,
              distance,type,cheapestPrice} = req.body;
        
     
      const isRatingValid = rating >= 0 && rating <= 5; // Rating should be between 0 and 5
      const areFieldsNotEmpty = name && city && address && title && desc && rating 
                                && city && title && distance && type && cheapestPrice;
      const trimmedAddress = address.trim()
      const trimmedName = name.trim()
      const trimmedPrice = cheapestPrice.trim()
      const validPrice = cheapestPrice >= 0;

      if (!areFieldsNotEmpty) {
        return res.status(400).json({ message: 'All fields are required.' });
      }

      if (!trimmedAddress) {
        return res.status(400).json({ message: 'please enter your address' });
      }
      if (!trimmedName )  {
        return res.status(400).json({ message: 'please enter your hotel name' });
      }
      if (!trimmedPrice || !validPrice) {
        return res.status(400).json({ message: 'please enter currect price' });
      }

      if (!isRatingValid) {
        return res.status(400).json({ message: 'Rating should be between 0 and 5.' });
      }
    
      try {
        // Create a new hotel object with the validated data
        const newHotel = new ListHotel({
          name: name,
          city: city,
          address: address,
          photos: photos,
          title: title,
          desc: desc,
          rating: rating,
          distance:distance,
          type:type,
          cheapestPrice:cheapestPrice,
          rooms: rooms,
          featured: featured,
        });
    
        // Save the hotel
      const  savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);
      } catch (err) {
        next(err);
      }
    });
    
    const getHotelList = asyncHandler(async (req, res) => {
      
      try {
        const hotels = await ListHotel.find();
        res.status(200).json(hotels);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
    });

    const deleteHotel = asyncHandler(async (req, res) => {
      const id = req.params.id;
      
      try {
       
        const result = await ListHotel.deleteOne({ _id: id });
    
        if (result.deletedCount === 1) {
          res.status(200).json({ message: 'User deleted successfully' });
        } else {
          res.status(404).json({ message: 'User not found' });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
    })


    const CreateRoom = asyncHandler(async (req, res, next) => {
      const hotelId = req.params.id;
      const { title,desc,price,maxPeople,rooms} = req.body;
     console.log(title,desc,rooms,price,maxPeople);

      const areFieldsNotEmpty =  title && desc  && price && maxPeople && rooms
                               
      const trimmedTitle = title.trim()
      const trimmedDesc= desc.trim()
      const trimmedPrice = price.trim()
      const roomsPattern = /^[\d,]+$/;
      const validPrice = price >=0;

      if (!roomsPattern.test(rooms)) {
        return res.status(400).json({ message: `Invalid format for rooms.
                                                please follow the placeorder instruction.` });
      }


      const roomNumbers = rooms.split(",").map((room) => ({ number: room }));

      if (!areFieldsNotEmpty) {
        return res.status(400).json({ message: 'All fields are required.' });
      }

      if (!trimmedTitle) {
        return res.status(400).json({ message: 'please enter Tittle' });
      }
      if (!trimmedDesc) {
        return res.status(400).json({ message: 'please enter Description' });
      }
      if (!trimmedPrice || !validPrice) {
        return res.status(400).json({ message: 'please enter currect price' });
      }
     
     
      try {
        // Create a new hotel object with the validated data
        const newRoom = new Room({
         
          title: title,
          desc: desc,
          roomNumbers: roomNumbers,
          price:price,
          maxPeople:maxPeople,
         
        });
    
        // Save the Room
      const  savedRoom = await newRoom.save();
        res.status(200).json(savedRoom);

        try {
          await ListHotel.findByIdAndUpdate(hotelId, {
            $push: { rooms: savedRoom._id },
          });
        } catch (err) {
          next(err);
        }

      } catch (err) {
        next(err);
      }
    });


    const getRoomlList = asyncHandler(async (req, res) => {
      
      try {
        const rooms = await Room.find();
        res.status(200).json(rooms);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
    });

    const deleteRoom = asyncHandler(async (req, res) => {
      const id = req.params.id;
      
      try {
       
        const result = await Room.deleteOne({ _id: id });
    
        if (result.deletedCount === 1) {
          res.status(200).json({ message: 'User deleted successfully' });
        } else {
          res.status(404).json({ message: 'User not found' });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
    })

  export {registerHotel,loginHotel, hotelLogout,CreateHotels,getHotelList,deleteHotel,CreateRoom,getRoomlList,deleteRoom}
  