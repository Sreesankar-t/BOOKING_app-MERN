import asyncHandler from 'express-async-handler'
import { ownerToken } from '../utils/generateToken.js'
import bcrypt from 'bcrypt'
import Hotel from '../models/hotel/hotelModel.js'
import ListHotel from '../models/hotel/listHotelmodel.js'
import Room from '../models/hotel/roomModel.js'
import Booking from '../models/user/bookingModel.js'

const registerHotel = asyncHandler(async (req, res) => {
  const { name, email, password, number, Cpassword, address } = req.body

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const nameRegex = /^[^\s\d]+$/
  const trimmedAddress = address ? address.trim() : ''

  if (!nameRegex.test(name)) {
    return res.status(400).json({ message: ' Please enter valid hotel name' })
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' })
  }
  if (!trimmedAddress) {
    return res.status(400).json({ message: 'please enter your address' })
  }

  if (
    password.length < 4 ||
    !/[A-Z]/.test(password) ||
    !/[a-z]/.test(password) ||
    !/\d/.test(password) ||
    !/[^A-Za-z0-9]/.test(password)
  ) {
    return res.status(400).json({
      message:
        'Password should be at least 4 characters and should contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
    })
  }

  if (Cpassword && Cpassword !== password) {
    return res.status(400).json({ message: 'Enter correct password ' })
  }

  const salt = bcrypt.genSaltSync(10)

  const hash = bcrypt.hashSync(password, salt)

  try {
    console.log(email)
    const hotelExist = await Hotel.findOne({ email })

    if (hotelExist && hotelExist.email === email) {
      return res.status(400).json({ message: 'Hotel already exists' })
    }

    const hotel = new Hotel({
      name: name,
      email: email,
      phone: number,
      password: hash,
      address: address
    })

    await hotel.save()

    if (hotel) {
      res.status(200).json({
        _id: hotel._id,
        name: hotel.name,
        email: hotel.email,
        approveHotel: hotel.approveHotel
      })
    } else {
      return res.status(400).json({ message: 'Invalid hotel data' })
    }
  } catch (error) {
    console.error('Error querying the database:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
})

const loginHotel = asyncHandler(async (req, res) => {
  console.log(req.body)
  const { email, password } = req.body

  try {
    const hotel = await Hotel.findOne({ email })
    console.log(hotel)
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' })
    }

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      hotel.password
    )

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Wrong password or email' })
    }

    const approve = hotel.approveHotel

    if (approve == false) {
      return res.status(404).json({ message: 'Your approval is peddiing ' })
    }

    // generate token
    ownerToken(res, hotel._id)

    res.status(200).json(hotel)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Internal server error' })
  }
})

const hotelLogout = asyncHandler(async (req, res) => {
  res.cookie('Ownerjwt', '', {
    httpOnly: true,
    expires: new Date(0)
  })
  res.status(200).json({ message: 'Hotel Logged Out' })
})

const CreateHotels = asyncHandler(async (req, res, next) => {
  const {
    name,
    city,
    address,
    photos,
    title,
    desc,
    rating,
    rooms,
    featured,
    distance,
    type,
    cheapestPrice,
    hotelId
  } = req.body
console.log(req.body.photos,"images varoooooo");
  const isRatingValid = rating >= 0 && rating <= 5
  const areFieldsNotEmpty =
    name &&
    city &&
    address &&
    title &&
    desc &&
    rating &&
    city &&
    title &&
    distance &&
    type &&
    cheapestPrice
  const trimmedAddress = address ? address.trim() : ''
  const trimmedName = name ? name.trim() : ''
  const trimmedPrice = cheapestPrice ? cheapestPrice.trim() : ''
  const validPrice = cheapestPrice ? cheapestPrice >= 0 : false
  const lowercaseCity = city ? city.toLowerCase() : ''

  if (!areFieldsNotEmpty) {
    return res.status(400).json({ message: 'All fields are required.' })
  }

  if (!trimmedAddress) {
    return res.status(400).json({ message: 'please enter your address' })
  }
  if (!trimmedName) {
    return res.status(400).json({ message: 'please enter your hotel name' })
  }
  if (!trimmedPrice || !validPrice) {
    return res.status(400).json({ message: 'please enter currect price' })
  }

  if (!isRatingValid) {
    return res
      .status(400)
      .json({ message: 'Rating should be between 0 and 5.' })
  }

  try {
    // Create a new hotel object with the validated data
    const newHotel = new ListHotel({
      name: name,
      city: lowercaseCity,
      address: address,
      photos: photos,
      title: title,
      desc: desc,
      rating: rating,
      distance: distance,
      type: type,
      cheapestPrice: cheapestPrice,
      rooms: rooms,
      featured: featured,
      hotelId: hotelId
    })

    // Save the hotel
    const savedHotel = await newHotel.save()
    res.status(200).json(savedHotel)
  } catch (err) {
    next(err)
     res.status(400).json({ message: 'server error' })
  }
})

const getHotelList = asyncHandler(async (req, res) => {
  const hotelId = req.params.Id
  try {
    const hotels = await ListHotel.find({ hotelId })
    res.status(200).json(hotels)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

const deleteHotel = asyncHandler(async (req, res) => {
  const id = req.params.id

  try {
    const result = await ListHotel.deleteOne({ _id: id })

    if (result.deletedCount === 1) {
      res.status(200).json({ message: 'User deleted successfully' })
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

const CreateRoom = asyncHandler(async (req, res, next) => {
  const hotelId = req.params.id
  const { title, desc, price, maxPeople, rooms, hotelid } = req.body

  const areFieldsNotEmpty = title && desc && price && maxPeople && rooms

  const trimmedTitle = title ? title.trim() : ''
  const trimmedDesc = desc ? desc.trim() : ''
  const trimmedPrice = price ? price.trim() : ''
  const roomsPattern = /^[\d,]+$/
  const validPrice = price ? price >= 0 : false

  if (!roomsPattern.test(rooms)) {
    return res.status(400).json({
      message: `Invalid format for rooms.
                please follow the placeorder instruction.`
    })
  }

  const roomNumbers = rooms.split(',').map(room => ({ number: room }))

  if (!areFieldsNotEmpty) {
    return res.status(400).json({ message: 'All fields are required.' })
  }

  if (!trimmedTitle) {
    return res.status(400).json({ message: 'please enter Tittle' })
  }
  if (!trimmedDesc) {
    return res.status(400).json({ message: 'please enter Description' })
  }
  if (!trimmedPrice || !validPrice) {
    return res.status(400).json({ message: 'please enter currect price' })
  }

  try {
    // Create a new hotel object with the validated data
    const newRoom = new Room({
      title: title,
      desc: desc,
      roomNumbers: roomNumbers,
      price: price,
      maxPeople: maxPeople,
      hotelid: hotelid
    })

    // Save the Room
    const savedRoom = await newRoom.save()
    res.status(200).json(savedRoom)

    try {
      await ListHotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id }
      })
    } catch (err) {
      next(err)
    }
  } catch (err) {
    next(err)
  }
})

const getRoomlList = asyncHandler(async (req, res) => {
  const hotelid = req.params.Id

  try {
    const rooms = await Room.find({ hotelid })

    res.status(200).json(rooms)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

const deleteRoom = asyncHandler(async (req, res) => {
  const id = req.params.id

  try {
    const result = await Room.deleteOne({ _id: id })

    if (result.deletedCount === 1) {
      res.status(200).json({ message: 'User deleted successfully' })
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

const coutByCity = asyncHandler(async (req, res) => {
  const cities = req.query.cities.split(',')

  try {
    const list = await Promise.all(
      cities.map(city => {
        return ListHotel.countDocuments({ city: city })
      })
    )
    res.status(200).json(list)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

const getHotels = async (req, res, next) => {
  const { min, max, page, perPage, ...others } = req.query
  const parsedMin = parseInt(min)
  const parsedMax = parseInt(max)
  let city = others.city

  console.log(city, 'first')
  try {
    let query = {}

    if (parsedMin > 0 || parsedMax < 9999999) {
      query.cheapestPrice = { $gte: parsedMin, $lte: parsedMax }
    }

    if (city) {
      query.city = city
    }

    const options = {
      page: parseInt(page) || 1,
      limit: parseInt(perPage) || 10 // Default to 10 items per page
    }

    if (Object.keys(query).length === 0) {
      const hotels = await ListHotel.paginate({}, options)
      res.status(200).json(hotels)
    } else {
      const hotels = await ListHotel.paginate(query, options)
      res.status(200).json(hotels)
    }
  } catch (err) {
    console.error('Error:', err)
    next(err)
  }
}

const getHotelsUserSide = asyncHandler(async (req, res) => {
  try {
    const hotels = await ListHotel.find().sort({ createdAt: 1 }).limit(4)

    res.status(200).json(hotels)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

const getSingleHotel = async (req, res, next) => {
  const Id = req.params.id

  try {
    const hotel = await ListHotel.findById(Id)
    res.status(200).json(hotel)
  } catch (err) {
    next(err)
  }
}

const getHotelRoom = async (req, res, next) => {
  try {
    const hotel = await ListHotel.findById(req.params.id)
    const list = await Promise.all(
      hotel.rooms.map(room => {
        return Room.findById(room)
      })
    )
    res.status(200).json(list)
  } catch (err) {
    next(err)
  }
}

export const updateRoomAvailability = async (req, res, next) => {
  try {
    await Room.updateOne(
      { 'roomNumbers._id': req.params.id },
      {
        $push: {
          'roomNumbers.$.unavailableDates': req.body.dates
        }
      }
    )
    res.status(200).json('Room status has been updated.')
  } catch (err) {
    next(err)
  }
}

const updateRoomStatus = async (req, res, next) => {
  console.log(req.body.dates, 'swamiiii')
  try {
    await Room.updateOne(
      { 'roomNumbers._id': req.params.id },
      {
        $push: {
          'roomNumbers.$.unavailableDates': req.body.dates
        }
      }
    )
    res.status(200).json('Room status has been updated.')
  } catch (err) {
    next(err)
  }
}

const getHotelBookingDetails = asyncHandler(async (req, res) => {
  const Id = req.params.id

  try {
    const data = await Booking.find({ ownerId: Id }).sort({createdAt:-1})

    res.json(data)
  } catch (error) {
    console.error('Error fetching data:', error)
    res.status(500).json({ error: 'Failed to fetch data' })
  }
})

//Dashboard start
const getTotalHotel = asyncHandler(async (req, res) => {
  const id = req.params.id

  try {
    const total = await ListHotel.countDocuments({ hotelId: id })

    res.status(200).json(total)
  } catch (error) {}
})

const getTotalRoom = asyncHandler(async (req, res) => {
  const id = req.params.id

  try {
    const total = await Room.countDocuments({ hotelid: id })

    res.status(200).json(total)
  } catch (error) {}
})

const getTotalBooking = asyncHandler(async (req, res) => {
  const id = req.params.id

  try {
    const total = await Booking.countDocuments({ ownerId: id })

    res.status(200).json(total)
  } catch (error) {}
})

const todayBookingCount = asyncHandler(async (req, res) => {
  const id = req.params.id

  try {
    const today = new Date()

    today.setHours(0, 0, 0, 0)
    const count = await Booking.countDocuments({
      ownerId: id,
      createdAt: { $gte: today }
    })

    res.status(200).json(count)
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
})

const getTotalRoomPrice = asyncHandler(async (req, res) => {
  const id = req.params.id
  try {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const pipeline = [
      {
        $match: {
          ownerId: id,
          createdAt: { $gte: today }
        }
      },
      {
        $group: {
          _id: null,
          totalRoomPrice: { $sum: '$totalAmount' }
        }
      }
    ]

    const result = await Booking.aggregate(pipeline)
    const totalRoomPrice = result.length > 0 ? result[0].totalRoomPrice : 0

    res.status(200).json(totalRoomPrice)
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

const getTotalPriceLastWeek = asyncHandler(async (req, res) => {
  const id = req.params.id
  try {
    const lastWeek = new Date()
    lastWeek.setDate(lastWeek.getDate() - 7)

    const pipeline = [
      {
        $match: {
          ownerId: id,
          createdAt: { $gte: lastWeek }
        }
      },
      {
        $group: {
          _id: null,
          totalPriceLastWeek: { $sum: '$totalAmount' }
        }
      }
    ]

    const result = await Booking.aggregate(pipeline)
    const totalPrice = result.length > 0 ? result[0].totalPriceLastWeek : 0

    res.status(200).json(totalPrice)
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

const getTotalPriceLastMonth = asyncHandler(async (req, res) => {
  const id = req.params.id
  try {
    const lastMonth = new Date()
    lastMonth.setMonth(lastMonth.getMonth() - 1)

    const pipeline = [
      {
        $match: {
          ownerId: id,
          createdAt: { $gte: lastMonth }
        }
      },
      {
        $group: {
          _id: null,
          totalPriceLastMonth: { $sum: '$totalAmount' }
        }
      }
    ]

    const result = await Booking.aggregate(pipeline)
    const totalPrice = result.length > 0 ? result[0].totalPriceLastMonth : 0

    res.status(200).json(totalPrice)
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

const getTotalPriceAllTime = asyncHandler(async (req, res) => {
  const _id = req.params.id
  try {
    const pipeline = [
      {
        $match: {
          ownerId: _id
        }
      },
      {
        $group: {
          _id: null,
          totalPriceAllTime: { $sum: '$totalAmount' }
        }
      }
    ]

    const result = await Booking.aggregate(pipeline)
    const totalPrice = result.length > 0 ? result[0].totalPriceAllTime : 0

    res.status(200).json(totalPrice)
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

const getTotalRoomPriceByMonth = asyncHandler(async (req, res) => {
  const _id = req.params.id
  try {
    const pipeline = [
      {
        $match: {
          ownerId: _id
        }
      },
      {
        $group: {
          _id: {
            $month: '$createdAt'
          },
          totalRoomPrice: { $sum: '$totalAmount' }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]

    const result = await Booking.aggregate(pipeline)

    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ]
    const data = Array.from({ length: 12 }, (_, month) => {
      const monthData = result.find(item => item._id === month + 1)
      return {
        name: monthNames[month],
        Total: monthData ? monthData.totalRoomPrice : 0
      }
    })

    res.status(200).json(data)
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})
//dashboard end

export {
  registerHotel,
  loginHotel,
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
  getTotalPriceAllTime,
  getTotalPriceLastMonth,
  getTotalPriceLastWeek,
  getTotalRoomPrice,
  getTotalRoomPriceByMonth
}
