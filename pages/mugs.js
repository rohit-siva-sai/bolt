import Link from "next/link";
import React from "react";
import Product from "../models/Product";

import mongoose from "mongoose";

const Mugs = ({ products }) => {


  return (
    <div>
      <section className="text-gray-600 body-font min-h-[80vh]">
        <div className="container lg:px-24 py-12 mx-auto ">
          <div className="flex flex-wrap -m-4 justify-center">
            {Object.keys(products).length===0 && <p className="mt-4">Sorry all the mugs are currently out of stock. New stock is coming soon. stay tuned</p> }
            {Object.keys(products).map((item) => {
              return (
                <Link
                  passHref={true}
                  href={`/product/${products[item].slug}`}
                  key={products[item]._id}
                >
                  <div className="lg:w-1/5 md:w-1/2 p-4 w-full shadow-md lg:mx-6 lg:my-2 ">
                    <a className="block relative  rounded overflow-hidden">
                      <picture>
                      <img
                        alt="ecommerce"
                        className="md:h-[40vh] block h-[32vh] m-auto"
                        src={products[item].img}
                      />
                      </picture>
                    </a>
                    <div className="mt-4 text-center">
                      <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1 ">
                        Mugs
                      </h3>
                      <h2 className="text-gray-900 title-font text-lg font-medium">
                        {products[item].title}
                      </h2>
                      <p className="mt-1">₹{products[item].price}.00</p>
                      <p className="mt-1 ">
                        <ul className="flex justify-center space-x-2 cursor-pointer">
                          {products[item].size.includes("S") && (
                            <li className="shadow-md border px-2">S</li>
                          )}
                          {products[item].size.includes("M") && (
                            <li className="shadow-md border px-2">M</li>
                          )}
                          {products[item].size.includes("L") && (
                            <li className="shadow-md border px-2">L</li>
                          )}
                          {products[item].size.includes("XL") && (
                            <li className="shadow-md border px-2">XL</li>
                          )}
                          {products[item].size.includes("XXL") && (
                            <li className="shadow-md border px-2">XXL</li>
                          )}
                        </ul>
                        <ul className="flex justify-center space-x-2 cursor-pointer mt-3 -mb-1">
                          {products[item].color.includes("red") && (
                            <button className="border-2 border-gray-300 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none"></button>
                          )}
                          {products[item].color.includes("blue") && (
                            <button className="border-2 border-gray-300 ml-1 bg-blue-500 rounded-full w-6 h-6 focus:outline-none"></button>
                          )}
                          {products[item].color.includes("yellow") && (
                            <button className="border-2 border-gray-300 ml-1 bg-yellow-300 rounded-full w-6 h-6 focus:outline-none"></button>
                          )}
                          {products[item].color.includes("black") && (
                            <button className="border-2 border-gray-300 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none"></button>
                          )}
                          {products[item].color.includes("green") && (
                            <button className="border-2 border-gray-300 ml-1 bg-green-500 rounded-full w-6 h-6 focus:outline-none"></button>
                          )}
                        </ul>
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
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

  let products = await Product.find({ category: "mugs" });
  let mugs = {};
  for (let item of products) {
    if (item.title in mugs) {
      if (
        !mugs[item.title].color.includes(item.color) &&
        item.availableQty > 0
      ) {
        mugs[item.title].color.push(item.color);
      }
      if (
        !mugs[item.title].size.includes(item.size) &&
        item.availableQty > 0
      ) {
        mugs[item.title].size.push(item.size);
      }
    } else {
      mugs[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQty > 0) {
        mugs[item.title].color = [item.color];
        mugs[item.title].size = [item.size];
      }
    }
  }


  //  res.status(200).json({ products })
  return {
    props: { products: JSON.parse(JSON.stringify(mugs)) }, // will be passed to the page component as props
  };
}

export default Mugs;
