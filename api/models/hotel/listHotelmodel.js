import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const ListHotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  distance: {
    type: Number,
    required: true
  },
  photos: {
    type: [String]
  },
  title: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  hotelId: {
    type: String
  },
  rating: {
    type: Number,
    min: 0,
    max: 5
  },
  rooms: {
    type: [String]
  },
  cheapestPrice: {
    type: Number,
    required: true
  }
  // featured: {
  //   type: Boolean,
  //   default: false,
  // },
})
ListHotelSchema.plugin(mongoosePaginate)
const ListHotel = mongoose.model('ListHotel', ListHotelSchema)

export default ListHotel
