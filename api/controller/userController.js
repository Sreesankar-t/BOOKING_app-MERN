import asyncHandler from 'express-async-handler'
import { generateToken } from '../utils/generateToken.js'
import User from '../models/user/userModel.js'
import bcrypt from 'bcrypt'
import Booking from '../models/user/bookingModel.js'
import { Stripe } from 'stripe'
import nodemailer from 'nodemailer'

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' })
  }

  try {
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(404).json({ message: 'User not exist' })
    }

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    )

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Wrong password or email' })
    }

    if (!user.isUser) {
      return res
        .status(401)
        .json({ message: 'User is blocked. You are not allowed to login.' })
    }

    // generate token
    generateToken(res, user._id)

    res.status(200).json(user)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Internal server error' })
  }
})

const forgotPassword = asyncHandler(async (req, res) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+/

  if (!emailRegex.test(req.body.email)) {
    return res.status(400).json({ message: 'Invalid email format' })
  }

  try {
    const user = await User.findOne({ email: req.body.email })

    if (!user) {
      return res.status(404).json({ message: 'User does not exist' })
    }

    // generateToken(res, user._id)
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'greta10@ethereal.email',
        pass: 'b436SzurtJKv6jvAzf'
      }
    })

    var mailOptions = {
      from: 'greta10@ethereal.email',
      to: user.email,
      subject: 'change password requst',
      html: `<p> the message from the WanderIn.if you want to change the password ?
               </p> <a href="http://localhost:3000/login/${user._id}">Click here to reset your password</a>`
    }

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log('Error sending email:', error)
        res.status(500).json({ message: 'Error sending email' })
      } else {
        console.log('Email sent:', info.response)
        return res.send({ Status: 'Success' })
      }
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Internal server error' })
  }
})

const changePassword = asyncHandler(async (req, res) => {
  console.log(req.params.id)
  console.log(req.body)
  const user = await User.findById(req.params.id)
  const { password, Cpassword } = req.body

  if (!password || !Cpassword || password !== Cpassword) {
    return res.status(400).json({ message: 'Passwords do not match' })
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

  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(password, salt)

  if (user) {
    user.password = hash
    await user.save() // Update user in the database
    return res.status(200).json({ message: 'Password changed successfully' })
  } else {
    return res.status(404).json({ message: 'User not found' })
  }
})

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, number, Cpassword } = req.body

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const nameRegex = /^[^\s\d]+$/
  const phoneRegex = /^[0-9]{10}$/

  if (!nameRegex.test(name)) {
    return res.status(400).json({ message: ' Please enter valid name' })
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' })
  }

  if (!phoneRegex.test(number)) {
    return res
      .status(400)
      .json({ message: 'Please enter a valid 10-digit phone number' })
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
    const userExist = await User.findOne({ email })
    console.log(userExist)
    console.log(userExist && userExist.email + 'this is email')

    if (userExist && userExist.email === email) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const user = new User({
      name: name,
      email: email,
      phone: number,
      password: hash
    })

    await user.save()

    if (user) {
      generateToken(res, user._id)
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email
      })
    } else {
      return res.status(400).json({ message: 'Invalid user data' })
    }
  } catch (error) {
    console.error('Error querying the database:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
})

const LogoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0)
  })
  res.status(200).json({ message: 'User Logged Out' })
})

const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    id: req.user._id,
    name: req.user.name,
    email: req.user.email
  }

  res.status(200).json(user)
})

const checkoutSection = asyncHandler(async (req, res) => {
  const key = process.env.STRIPE_SECRET

  const stripe = new Stripe(key)

  const { hotel, totalAmount, token } = req.body
  console.log(totalAmount, 'stripe')
  const { _id, name } = hotel

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: name
            },
            unit_amount: totalAmount * 100
          },
          quantity: 1
        }
      ],
      success_url: `http://localhost:3000/checkoutSuccess`,
      cancel_url: `http://localhost:3000/hotelDetails/${_id}`
    })
    res.send({ url: session.url })
  } catch (error) {}
})

const hotelBooking = asyncHandler(async (req, res) => {
  const { user, dates, hotel, totalAmount } = req.body
  const [data] = req.body.data
  const selectedRooms = req.body.selectedRooms // Store all selected rooms
  const { title, maxPeople, desc } = data
  const { _id } = user
  const { name, type, address, hotelId } = hotel

  const [date] = dates
  const { startDate, endDate } = date
  const roomNumbers = selectedRooms.map(room => room.roomNumber) // Extract room numbers

  try {
    const newBooking = new Booking({
      userId: _id,
      ownerId: hotelId,
      hotelName: name,
      hotelType: type,
      hotelAddress: address,
      roomTitle: title,
      totalAmount: totalAmount,
      maxPeople: maxPeople,
      roomDesc: desc,
      roomNumbers: roomNumbers,
      startDate: startDate,
      endDate: endDate
    })

    await newBooking.save()
    res.json('Booking successful')
    console.log('Booking successful')
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({
      error:
        'An error occurred while processing the payment and saving the booking.'
    })
  }
})

const getBookingDetails = asyncHandler(async (req, res) => {
  const Id = req.params.id

  try {
    const data = await Booking.find({ userId: Id }).sort({ createdAt: -1 })

    res.json(data)
  } catch (error) {
    console.error('Error fetching data:', error)
    res.status(500).json({ error: 'Failed to fetch data' })
  }
})

const getUser = async (req, res, next) => {
  console.log(req.params.id)
  try {
    const user = await User.findById(req.params.id)

    res.status(200).json(user)
  } catch (err) {
    next(err)
  }
}

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const trimmerName = req.body.name ? req.body.name.trim() : ''
  const nameRegex = /[a-zA-Z]/
  const phoneRegex = /^[0-9]{10}$/

  if (!trimmerName) {
    return res.status(400).json({ message: 'please enter name' })
  }

  if (!trimmerName || !nameRegex.test(trimmerName)) {
    return res.status(400).json({
      message:
        'Please enter a valid name with at least one alphabetical character'
    })
  }

  if (!emailRegex.test(req.body.email)) {
    return res.status(400).json({ message: 'Invalid email format' })
  }

  if (!phoneRegex.test(req.body.phone)) {
    return res
      .status(400)
      .json({ message: 'Please enter a valid 10-digit phone number' })
  }

  const userExist = await User.findOne({ email: req.body.email })

  if (userExist && userExist.email === req.body.email) {
    return res.status(400).json({ message: 'Email already Used' })
  }

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.phone = req.body.phone || user.phone

    // if (req.body.password) {
    //   user.password = req.body.password;
    // }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

const getPymetDetails = async (req, res, next) => {
  try {
    const data = await Booking.findById(req.params.id)
    res.status(200).json(data)
  } catch (err) {
    next(err)
  }
}

export {
  authUser,
  registerUser,
  LogoutUser,
  getUserProfile,
  hotelBooking,
  getBookingDetails,
  updateUserProfile,
  getUser,
  forgotPassword,
  changePassword,
  getPymetDetails,
  checkoutSection
}
