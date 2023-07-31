import User from "../../models/User";
import connectDb from "../../middleware/mongoose";
var CryptoJS = require("crypto-js");


const handler = async (req, res) => {
  if (req.method == "POST") {
    console.log(req.body);
    
    const {name,email} = req.body
    let u = new User({name,email,password: CryptoJS.AES.encrypt(req.body.password, process.env.AES_SECRET).toString()})
    await u.save()
    console.log(u,"rohti sivs aisan");
    res.status(200).json({ success: "success" });
} 
else {
      res.status(400).json({ error: "This method is not allowed" });
  }

//   let products = await Product.find();
//   res.status(200).json({ products });
};

export default connectDb(handler);
