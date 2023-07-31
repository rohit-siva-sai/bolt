import User from "../../models/User"
import connectDb from "../../middleware/mongoose"
var jwt = require('jsonwebtoken');
// console.log('called');


const handler = async (req,res)=>{
    if(req.method == "POST")
    {
        let token = req.body.token;
        const user = jwt.verify(token,process.env.AES_SECRET)
        let dbuser = await User.findOneAndUpdate({email: user.email},{address: req.body.address,pincode: req.body.pincode,phone: req.body.phone,name: req.body.name})  
        // console.log(dbuser);
        
        
        res.status(200).json({success: true})
    }
    else{
        res.status(400).json({error: "error rohit"})
    }
   
}

export default connectDb(handler)