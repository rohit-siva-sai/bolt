// import { promises } from "stream";

// const https = require("https");
// import Product from "../../models/Product";
// import Order from "../../models/Order";
// import connectDb from "../../middleware/mongoose";
// import pincodes from '../../pincodes.json'
// /*
//  * import checksum generation utility
//  * You can get this utility from https://developer.paytm.com/docs/checksum/
//  */
// const PaytmChecksum = require("PaytmChecksum");

// const handler = async (req, res) => {
//   if (req.method == "POST") {
//     //check if the cart is tampering
//     let product,sumTotal;
//     let cart = req.body.cart;
//     if(req.body.subTotal <= 0 ){
//       res.status(200).json({success: false,"error": "Cart Empty! Please build your cart and try again"});
//       return

//     }
//       for(let item in req.body.cart)
//       {
//         // console.log(item);
//         sumTotal += cart[item].price * cart[item].qty
//         product = await Product.findOne({slug: item})
//         if(product.availableQty < cart[item].qty){
//           res.status(200).json({success: false,"error": "some items in your cart are out of stock. please try again",cartClear: true});
//           return

//         }
//         if(product.price != cart[item].price)
//         {
//           res.status(400).json({success: false,"error": "the price has changed in the cart",cartClear: true})
//           return
//         }
        
//       } 
//       if(sumTotal == req.body.subTotal)
//       {
//         res.status(400).json({success: true,"error": "the price has changed in the cart",cartClear: true})
//         return
//       }

//     //check if the pincode is serviceable
//     if(!Object.keys(pincodes).includes(req.body.pincode))
//     {
//       res.status(200).json({success: false,"error": "This pincode is not serviceable",cartClear: false})
//       return 
//     }
    

//     //check if the cart items are out of stock
    

//     // check if the details are valid
//     if(req.body.phone.length !== 10 )
//     {
//       res.status(200).json({success: false,"error": "Please enter valid phone number",cartClear: false});
//       return
//     }
//     if(req.body.pincode.length !== 6 )
//     {
//       res.status(200).json({success: false,"error": "Please enter valid  Pincode",cartClear: false});
//       return
//     }

//     //initiate an order corresponding to an orderid9
//     let order = new Order({
//       email: req.body.email,
//       orderId: req.body.oid,
//       address: req.body.address,
//       name: req.body.name,
//       city: req.body.city,
//       state: req.body.state,
//       pincode: req.body.pincode,
//       phone: req.body.phone,
//       amount: req.body.subTotal,
//       products: req.body.cart,
//     });

//     await order.save();
//     console.log(order);
    

//     //insert an entry in the orders table with status pending
//     var paytmParams = {};

//     paytmParams.body = {
//       requestType: "Payment",
//       mid: process.env.NEXT_PUBLIC_PAYTM_MID,
//       websiteName: "YOUR_WEBSITE_NAME",
//       orderId: req.body.oid,
//       callbackUrl: `${process.env.NEXT_PUBLIC_HOST}/api/posttransaction`,
//       txnAmount: {
//         value: req.body.subTotal,
//         currency: "INR",
//       },
//       userInfo: {
//         custId: req.body.email,
//       },
//     };

//     /*
//      * Generate checksum by parameters we have in body
//      * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys
//      */
//     const checksum = await PaytmChecksum.generateSignature(
//       JSON.stringify(paytmParams.body),
//       process.env.PAYTM_MKEY
//     );
//     paytmParams.head = {
//       signature: checksum,
//     };

//     var post_data = JSON.stringify(paytmParams);

//     const requestAsync = () => {
//       return new Promise((resolve, reject) => {
//         var options = {
//           /* for Staging */
//           // hostname: "securegw-stage.paytm.in" /* for Production */,
//           hostname: "securegw.paytm.in",
//           port: 443,
//           path: `/theia/api/v1/initiateTransaction?mid=${process.env.NEXT_PUBLIC_PAYTM_MID}&orderId=${req.body.oid}`,
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             "Content-Length": post_data.length,
//           },
//         };

//         var response = "";
//         var post_req = https.request(options, function (post_res) {
//           post_res.on("data", function (chunk) {
//             response += chunk;
//           });

//           post_res.on("end", function () {
//             // console.log("Response: ", response);
//             let ress = JSON.parse(response).body
//             ress.success = true
//             ress.cartClear = false
//             resolve(ress);
//           });
//         });

//         post_req.write(post_data);
//         post_req.end();
//       });
//     };

//     let myr = await requestAsync();
//     res.status(200).json(myr);
//   }
// };

// export default connectDb(handler);
