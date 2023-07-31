import User from "../../models/User";
import connectDb from "../../middleware/mongoose";
var jwt = require("jsonwebtoken");
import CryptoJS from "crypto-js";
// console.log('called');

const handler = async (req, res) => {
  if (req.method == "POST") {
    let token = req.body.token;
    const user = jwt.verify(token, process.env.AES_SECRET);
    let dbuser = await User.findOne({email: user.email})
    const bytes = CryptoJS.AES.decrypt(dbuser.password, process.env.AES_SECRET);
    
    let decryptedPass = bytes.toString(CryptoJS.enc.Utf8);   
    // console.log(decryptedPass);
    if (
      decryptedPass == req.body.password &&
      req.body.cpassword == req.body.npassword
    ) {
      await User.findOneAndUpdate(
        { email: dbuser.email },
        {
          password: CryptoJS.AES.encrypt(
            req.body.cpassword,
            process.env.AES_SECRET
          ).toString(),
        }
      );
      res.status(200).json({ success: true });
    }
    // console.log(dbuser);
    res.status(200).json({ success: false });
  } else {
    res.status(400).json({ error: "error rohit" });
  }
};

export default connectDb(handler);
