import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import {
  AiOutlineShoppingCart,
  AiFillCloseCircle,
  AiFillPlusCircle,
  AiFillMinusCircle,
} from "react-icons/ai";

import { BsFillCartCheckFill, BsFillCartDashFill } from "react-icons/bs";
import { MdAccountCircle } from "react-icons/md";

// const Navbar = ({cart, addToCart,removeFromCart,clearCart,subtotal}) =>{

// }
const Navbar = ({
  logout,
  user,
  cart,
  addToCart,
  removeFromCart,
  clearCart,
  subTotal,
}) => {
  // console.log(cart, addToCart, removeFromCart, clearCart, subTotal);

  const [dropdown, setDropdown] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const router = useRouter();

  useEffect(() => {
    Object.keys(cart).length !== 0 && setSidebar(true);
    console.log(router.pathname);

    let exempted = ["/checkout", "/order", "/orders", "/myaccount"];
    if (exempted.includes(router.pathname)) {
      setSidebar(false);
    }
  }, []);

  const toggleCart = () => {
    // if (ref.current.classList.contains("translate-x-full")) {
    //   ref.current.classList.remove("translate-x-full");
    //   ref.current.classList.add("translate-x-0");
    // } else if (!ref.current.classList.contains("translate-x-full")) {
    //   ref.current.classList.remove("translate-x-0");
    //   ref.current.classList.add("translate-x-full");
    // }

    setSidebar(!sidebar);
  };

  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  const ref = useRef();
  return (
    <>
      <span>
        {dropdown && (
          <div
            onMouseOver={() => {
              setDropdown(true);
            }}
            onMouseLeave={() => {
              setDropdown(false);
            }}
            className="fixed z-20 cursor-pointer right-10 rounded-md px-4 py-2 w-32 top-8 bg-white shadow-md border"
          >
            <ul>
              <Link href="/myaccount">
                <a>
                  <li className="py-1 hover:text-emerald-500 text-sm ">
                    My Account
                  </li>
                </a>
              </Link>

              <Link href="/orders">
                <a>
                  <li className="py-1 hover:text-emerald-500 text-sm ">
                    My Orders
                  </li>
                </a>
              </Link>

              <li
                onClick={logout}
                className="py-1 hover:text-emerald-500 text-sm "
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </span>

      <div
        className={`flex flex-col md:flex-row md:justify-start items-center py-2 shadow-lg sticky top-0 bg-white z-10 ${
          !sidebar && "overflow-hidden"
        }`}
      >
        <div className="logo mr-auto md:mx-8  ml-2">
          {/* <img src="/logo.webp" alt="" className="h-12"/> */}
          <Link href="/">
            <a>
              {" "}
              <img src="https://logos-world.net/wp-content/uploads/2022/06/Bolt-Logo.png" alt="" width={80} height={10} />
            </a>
          </Link>
        </div>
        <div className="nav">
          <ul className="flex md:space-x-10 items-center font-bold space-x-6 md:text-lg  bg-slate-300 p-2 md:bg-white md:p-0">
            <Link href="/tshirts">
              <a className="hover:text-emerald-600">
                <li>Tshirts</li>
              </a>
            </Link>
            <Link href="/hoodies">
              <a className="hover:text-emerald-600">
                <li>Hoodies</li>
              </a>
            </Link>
            <Link href="/stickers">
              <a className="hover:text-emerald-600">
                <li>Stickers</li>
              </a>
            </Link>
            <Link href="/mugs">
              <a className="hover:text-emerald-600">
                <li>Mugs</li>
              </a>
            </Link>
          </ul>
        </div>
        <div className="cart absolute mx-5 right-0  font-bold  top-4 cursor-pointer flex space-x-2 md:space-x-4">
          <Link href="/admin">
            <a>
              <button className="bg-emerald-600 px-2 lg:py-2 py-1 ease-in-out  rounded-md text-sm text-white">Admin</button>
            </a>
          </Link>

          {!user.value && (
            <Link href="/login">
              <a href="#">
                <button className="bg-emerald-600 px-2 lg:py-2 py-1 ease-in-out  rounded-md text-sm text-white">
                  login
                </button>
              </a>
            </Link>
          )}
          <span
            onMouseOver={() => {
              setDropdown(true);
            }}
            onMouseLeave={() => {
              setDropdown(false);
            }}
          >
            {/* > */}
            {user.value && <MdAccountCircle className="text-3xl ease-in-out" />}
          </span>

          <AiOutlineShoppingCart className="text-3xl" onClick={toggleCart} />
        </div>
        <div
          ref={ref}
          // className={`sideCart lg:w-96 w-72  h-[100vh] overflow-y-scroll fixed top-0 md:right-0 lg:-right-4 -right-1  bg-emerald-200 p-10  transition md:transition-tranform  ${
          //   Object.keys(cart).length !== 0 ? "translate-x-0" : "translate-x-full"
          // }  z-10  `}
          className={`sideCart lg:w-96 w-72  h-[100vh] overflow-y-scroll absolute top-0  bg-emerald-200 p-10  transition-all  ${
            sidebar ? "right-0" : "-right-96"
          }  z-30  `}
        >
          <span
            className="absolute top-2 right-7 text-2xl text-emerald-600 w-1 "
            onClick={toggleCart}
          >
            <AiFillCloseCircle />
          </span>
          <h2 className="font-bold text-xl text-center underline underline-offset-2">
            Shopping-Cart
          </h2>
          <ul className="list-decimal font-semibold">
            {Object.keys(cart).length == 0 && (
              <div className="my-4">Your Cart is Empty!</div>
            )}
            {Object.keys(cart).map((k) => {
              return (
                <li key={k}>
                  <div className="item flex my-4">
                    <div className="w-2/3 font-semibold">
                      {cart[k].name}({cart[k].size}/{cart[k].variant})
                    </div>
                    <div className="w-1/3 flex items-center justify-center text-lg">
                      <AiFillMinusCircle
                        className="text-emerald-600"
                        onClick={() => {
                          removeFromCart(
                            k,
                            1,
                            cart[k].price,
                            cart[k].name,
                            cart[k].size,
                            cart[k].variant
                          );
                        }}
                      />
                      <span className="mx-2 text-lg">{cart[k].qty}</span>
                      <AiFillPlusCircle
                        className="text-emerald-600"
                        onClick={() => {
                          addToCart(
                            k,
                            1,
                            cart[k].price,
                            cart[k].name,
                            cart[k].size,
                            cart[k].variant
                          );
                        }}
                      />
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="total font-bold my-2">SubTotal: {subTotal}</div>
          <div className="flex space-x-2">
            <Link href="/checkout">
              <button
                disabled={Object.keys(cart).length === 0}
                class="disabled:bg-emerald-300 text-white text-md bg-emerald-500 border-0 py-1 px-2 focus:outline-none hover:bg-emerald-600 rounded  flex "
              >
                <BsFillCartCheckFill className="mt-1 mx-1 " />
                CheckOut
              </button>
            </Link>
            <button
              disabled={Object.keys(cart).length === 0}
              onClick={clearCart}
              class="disabled:bg-emerald-300 text-white text-md bg-emerald-500 border-0 py-1 px-2 focus:outline-none hover:bg-emerald-600 rounded  flex "
            >
              <BsFillCartDashFill className="mt-1 mx-1 " />
              Clearcart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Navbar;
