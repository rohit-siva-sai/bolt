import Forgot from "../../models/Forgot";
import User from "../../models/User"
// import connectDb from "../../middleware/mongoose";
// var jwt = require("jsonwebtoken");
// import CryptoJS from "crypto-js";
// console.log('called');

const handler = async (req, res) => {
    //check if the user exits in the database
    //send an email to the user
if(req.body.sendMial)
{


    let token = `evhbeih23bjh34bb`
    let forgot = new Forgot({
        email: req.body.email,
        token: token
    })


    let email = `  We have sent you this email in response to your request to reset your password on Codeswear.com. 

    To reset your password . please follow the link below:

    <a href="https://codeswear.com/forgot?token=${token}">Click here to reset your password</a>

    <br/><br/>

    We recommend that you keep your password secure and not share it with anyone.If you feel your password has been compromised, you can change it by going to your My Account Page and Change your password

    <br/><br/>`

  
}
else{
    
}
res.status(200).json({success: true})
};

export default handler;
