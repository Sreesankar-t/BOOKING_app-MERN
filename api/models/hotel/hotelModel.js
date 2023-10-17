import mongoose from 'mongoose'
const HotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },

  address: {
    type: String,
    required: true
  },
  document: {
    type: [String]
  },

  approveHotel: {
    type: Boolean,
    default: false
  }
})

const Hotel = mongoose.model('Hotel', HotelSchema)

export default Hotel
