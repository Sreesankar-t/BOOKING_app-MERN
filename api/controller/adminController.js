import asyncHandler from 'express-async-handler'
import { adminToken } from '../utils/generateToken.js'
import Admin from '../models/admin/admainModel.js'
import User from '../models/user/userModel.js'
import Hotel from '../models/hotel/hotelModel.js'
import Blog from '../models/admin/blogModel.js'
import Booking from '../models/user/bookingModel.js'
import ListHotel from '../models/hotel/listHotelmodel.js'

const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  try {
    const admin = await Admin.findOne({ email })

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' })
    }

    if (admin.password != password) {
      return res.status(401).json({ message: 'Wrong password or email' })
    }

    // generate token
    adminToken(res, admin._id)

    res.status(200).json(admin)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Internal server error' })
  }
})

const adminLogout = asyncHandler(async (req, res) => {
  res.cookie('Adminjwt', '', {
    httpOnly: true,
    expires: new Date(0)
  })
  res.status(200).json({ message: 'Admin Logged Out' })
})

const getUser = asyncHandler(async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

const deleteUser = asyncHandler(async (req, res) => {
  const id = req.params.id

  try {
    const result = await User.deleteOne({ _id: id })

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

const hideUser = asyncHandler(async (req, res) => {
  const userId = req.params.id

  try {
    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    user.isUser = false

    await user.save()

    res.status(200).json(user)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

const UnHideUser = asyncHandler(async (req, res) => {
  const userId = req.params.id

  try {
    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    user.isUser = true

    await user.save()

    res.status(200).json(user)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

const getHotel = asyncHandler(async (req, res) => {
  try {
    const hotels = await Hotel.find()
    res.status(200).json(hotels)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

const approveHotel = asyncHandler(async (req, res) => {
  const hotelId = req.params.id
  console.log(hotelId + 'this is i hotel id ')
  try {
    const hotel = await Hotel.findById(hotelId)

    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' })
    }

    hotel.approveHotel = true

    await hotel.save()

    res.status(200).json(hotel)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

const createBlog = asyncHandler(async (req, res) => {
  const blogData = req.body

  const blog = new Blog(blogData)

  try {
    await blog.save()

    res.status(201).json(blog)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error saving the blog' })
  }
})

const getBlogs = asyncHandler(async (req, res) => {
  const doc = parseInt(req.query.doc)
  if (doc == undefined) {
    try {
      const blogs = await Blog.find().sort({ createdAt: -1 })
      res.status(200).json(blogs)
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 }).limit(doc)
    res.status(200).json(blogs)
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

const getSingleBlog = asyncHandler(async (req, res) => {
  try {
    const blog = await Blog.findOne({ _id: req.params.id })

    res.status(200).json(blog)
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

const BlogList = asyncHandler(async (req, res) => {
  try {
    const blog = await Blog.find()

    res.status(200).json(blog)
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

const deleteBlog = asyncHandler(async (req, res) => {
  const id = req.params.id

  try {
    const result = await Blog.deleteOne({ _id: id })

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

//Dashboard  start//

const getTotalUser = asyncHandler(async (req, res) => {
  try {
    const total = await User.countDocuments({})
    res.status(200).json(total)
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
})

const getTotalBlog = asyncHandler(async (req, res) => {
  try {
    const total = await Blog.countDocuments({})
    res.status(200).json(total)
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
})

const getTotalBooking = asyncHandler(async (req, res) => {
  try {
    const total = await Booking.countDocuments({})
    res.status(200).json(total)
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
})

const getTotalHotel = asyncHandler(async (req, res) => {
  try {
    const total = await Hotel.countDocuments({})
    res.status(200).json(total)
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
})

const todayBookingCount = asyncHandler(async (req, res) => {
  try {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const count = await Booking.countDocuments({
      createdAt: { $gte: today }
    })
    console.log(count, 'daadd')
    res.status(200).json(count)
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
})

const getTotalRoomPrice = asyncHandler(async (req, res) => {
  try {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const pipeline = [
      {
        $match: {
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
  try {
    const lastWeek = new Date()
    lastWeek.setDate(lastWeek.getDate() - 7)

    const pipeline = [
      {
        $match: {
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
  try {
    const lastMonth = new Date()
    lastMonth.setMonth(lastMonth.getMonth() - 1)

    const pipeline = [
      {
        $match: {
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
  try {
    const pipeline = [
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
  try {
    const pipeline = [
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

//Dashboard  end//

const updateBlog = asyncHandler(async (req, res) => {
  console.log(req.body.photos)
  const blog = await Blog.findOne({ _id: req.params.id })

  if (blog) {
    blog.title = req.body.title || blog.title
    blog.summary = req.body.summary || blog.summary
    blog.content = req.body.content || blog.content
    blog.photos = req.body.photos
  }

  const updateBlog = blog.save()
  res.status(200).json(updateBlog)
})

const getAllBookings = asyncHandler(async (req, res) => {
  try {
    const bookings = await Booking.find()
    console.log(bookings)
    res.status(200).json(bookings)
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
})

const getOwnerHotels = asyncHandler(async (req, res) => {
  const hotelId = req.params.id

  try {
    const hotels = await ListHotel.find({ hotelId: hotelId })
    console.log(hotels, 'namudeth')
    res.status(200).json(hotels)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

export {
  adminLogin,
  adminLogout,
  getUser,
  deleteUser,
  hideUser,
  UnHideUser,
  getHotel,
  approveHotel,
  createBlog,
  getBlogs,
  getSingleBlog,
  BlogList,
  deleteBlog,
  getTotalUser,
  getTotalHotel,
  getTotalBooking,
  getTotalBlog,
  todayBookingCount,
  getTotalRoomPrice,
  getTotalPriceLastWeek,
  getTotalPriceAllTime,
  getTotalPriceLastMonth,
  getTotalRoomPriceByMonth,
  updateBlog,
  getAllBookings,
  getOwnerHotels
}
