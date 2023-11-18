import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/user/userModel.js'
import Admin from '../models/admin/admainModel.js'

const protect = asyncHandler(async (req, res, next) => {
  let token = req.cookies.jwt

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findById(decoded.userId).select('-password')
      next()
    } catch (error) {
      res.status(401)
      throw new Error('Not authorized , invalid token ')
    }
  } else {
    throw new Error('Not authorized , no token')
  }
})

const protectAdmin = asyncHandler(async (req, res, next) => {
  let token = req.cookies.Adminjwt

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.admin = await Admin.findById(decoded.AdminId).select('-password')

      next()
    } catch (error) {
      res.status(401)
      throw new Error('Not authorized , invalid token ')
    }
  } else {
    throw new Error('Not authorized , no token')
  }
})

const protectOwner = asyncHandler(async (req, res, next) => {
  let token = req.cookies.Ownerjwt

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.admin = await Admin.findById(decoded.ownerId).select('-password')

      next()
    } catch (error) {
      res.status(401)
      throw new Error('Not authorized , invalid token ')
    }
  } else {
    throw new Error('Not authorized , no token')
  }
})

export { protect, protectAdmin, protectOwner }
