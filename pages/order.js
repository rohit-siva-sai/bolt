import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Order from "../models/Order";
import mongoose from "mongoose";

const MyOrder = ({ order }) => {
  // const router = useRouter();
  // const { id } = router.query;
  // console.log(order);

  const products = order.products;
  const [date, setDate] = useState(order.createdAt);
  // console.log(products);

  const router = useRouter();
  useEffect(() => {
    const d = new Date(order.createdAt);
    setDate(d);
    if (router.query.clearCart == 1) {
      clearCart();
    }
  }, [router]);

  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                CODESWEAR.COM
              </h2>
              <h1 className="text-gray-900 text-xl lg:text-3xl title-font font-medium mb-4">
                order id: #{order.orderId}
              </h1>
              <p className="leading-relaxed mb-4">
                Your order has been successfully placed.{" "}
              </p>
              <p className="leading-relaxed mb-4">
                Order placed on: {date.toLocaleString()}{" "}
              </p>
              <p>
                Your Payment is{" "}
                <span className="text-slate-600 font-semibold">
                  {" "}
                  {order.status}
                </span>{" "}
              </p>

              <div class="flex mb-4">
                <a class="flex-grow text-center   border-gray-300 py-2 text-lg px-1">
                  Item Description
                </a>
                <a class="flex-grow text-center border-gray-300 py-2 text-lg px-1">
                  Quantity
                </a>
                <a class="flex-grow text-center border-gray-300 py-2 text-lg px-1">
                  Item Total
                </a>
              </div>

              {Object.keys(products).map((key) => {
                return (
                  <div
                    key={key}
                    className="flex m-auto border-t border-gray-200 py-2"
                  >
                    <span className="text-gray-500 w-1/2">
                      {products[key].name} ({products[key].size}/
                      {products[key].variant})
                    </span>
                    <span className="m-auto text-gray-900  ">
                      {products[key].qty}
                    </span>
                    <span className="m-auto text-gray-900">₹ {products[key].price}</span>
                  </div>
                );
              })}

              <div className="flex my-4 flex-col">
                <span className="title-font font-medium text-2xl text-gray-900">
                  SubTotal: ₹ {order.amount}
                </span>
                <div className="my-3">
                  <button className="flex mx-0 text-white bg-emerald-500 border-0 py-2 px-6 focus:outline-none hover:bg-emerald-600 rounded">
                    Track Order
                  </button>
                </div>
              </div>
            </div>
            <picture>
              <img
                alt="ecommerce"
                className="mx-auto lg:w-2/5 lg:h-[450px] w-full  h-64  rounded"
                src="/tshirt1.webp"
              />
            </picture>
          </div>
        </div>
      </section>
    </div>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  let order = await Order.findById(context.query.id);

  //  res.status(200).json({ products })
  return {
    props: {
      order: JSON.parse(JSON.stringify(order)),
    }, // will be passed to the page component as props
  };
}

export default MyOrder;
