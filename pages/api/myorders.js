import Order from "../../models/Order";
import connectDb from "../../middleware/mongoose";
var jwt = require("jsonwebtoken");
import { JsonWebTokenError } from "jsonwebtoken";
console.log(JsonWebTokenError);

const handler = async (req, res) => {
  const token = req.body.token

  const data = jwt.verify(token, process.env.AES_SECRET)
  let orders = await Order.find({ email: data.email, status: "Paid"});

  res.status(200).json({ orders });
};
export default connectDb(handler);
