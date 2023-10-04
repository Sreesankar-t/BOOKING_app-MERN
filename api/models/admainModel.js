import mongoose from "mongoose";


const adminSchema = mongoose.Schema({
   name:{
    type:String,
    required:true
   },
   email:{
    type:String,
    required:true,
    unique:true
   },
  
},{
   timestamps:true 
});

const Admin = mongoose.model('Admin',adminSchema);

export default Admin;