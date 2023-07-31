// import Order from "../../models/Order";
// import connectDb from "../../middleware/mongoose";
// import Product from "../../models/Product";

// const handler = async (req, res) => {
//   //validate paytm checksum--pending

//   // console.log(req.body);
//   // console.log('rohit sivas ai');
//   let order;

//   //update status into orders table after checking the transaction status
//   if (req.body.STATUS == "TXN_SUCCESS") {
//     order = await Order.findOneAndUpdate(
//       { orderId: req.body.ORDERID },
//       { status: "Paid", paymentInfo: JSON.stringify(req.body), transactionid: req.body.TXNID }
    
//     );
//     let products = order.products
//     for(let slug in products)
//     {
//        await Product.findOneAndUpdate({slug: slug}, {$inc: {"availableQty": - products[slug].qty}})
//     }
//     await Product
//     // Order.findByIdAndUpdate(order._id, {status: 'Paid'})
//   } else if (req.body.STATUS == "PENDING") {
//     order = await Order.findOneAndUpdate(
//       { orderId: req.body.ORDERID },
//       { status: "Pending", paymentInfo: JSON.stringify(req.body), transactionid: req.body.TXNID }
//     );
//   }

//   //get the transaction id of the order
  

//   //initiate shipping
//   //redirect user to the order conformation page
//   res.redirect("/order?clearcart=1&id=" + order._id, 200);

//   // res.status(200).json({body: req.body})
// };

// export default connectDb(handler);
