import mongoose from 'mongoose';

const  connectDB =async ()=>{

    try{
       await mongoose.connect(process.env.MONGO)
       console.log("connected to mongoDB!!");
    }catch(error){
       throw(error)
    }          
}


mongoose.connection.on("connected",()=>{
    console.log("mongoDB connected!!");
})


export default connectDB