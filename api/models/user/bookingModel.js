import mongoose from "mongoose";

const bookingSchema = mongoose.Schema({
   userId: {
      type: String,
      required: true,
   },
   ownerId: {
      type: String,
      required: true,
   },
   hotelName: {
      type: String,
      required: true,
   },
   hotelType: {
      type: String,
      required: true,
   },
   hotelAddress: {
      type: String,
      required: true,
   },
   roomTitle: {
      type: String,
      required: true,
   },
   totalAmount : {
      type: Number,
      required: true,
   },
   maxPeople: {
      type: Number,
      required: true,
   },
   roomDesc: {
      type: String,
      required: true,
   },
   roomNumbers: [{
      type: String, 
   }],
   startDate: {
      type: Date, 
      required: true,
   },
   endDate: {
      type: Date, 
      required: true,
   },
   status: {
    type: Boolean,
    default: true,
  },
},{
    
timestamps:true 
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
