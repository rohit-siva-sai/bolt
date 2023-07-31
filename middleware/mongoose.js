import mongoose from "mongoose";

const connectDb = handler => async  (req,res)=>{
   //   if(mongoose.connections[0].readyState)
   //   {
   //      return handler(req,res)
   //   }
   //   await mongoose.connect(process.env.MONGO_URI)

   try {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      console.log("db connected")
      
    }
    catch (error) {
      console.error(error);
    }
     
     return handler(req,res)
}

export default connectDb