import "../styles/globals.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useEffect, useState } from "react";
import { Router, useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingBar from 'react-top-loading-bar'




function MyApp({ Component, pageProps }) {
  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0);
  const [user, setUser] = useState({value: null});
  const [key, setKey] = useState(0);
  const [progress, setProgress] = useState(0)
  
  const router = useRouter();

  useEffect(() => {
    // console.log('this is useeffect');
    router.events.on('routeChangeStart',()=>{
      setProgress(50)
    })
    router.events.on('routeChangeComplete',()=>{
      setProgress(100)
    })
    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")));
        saveCart(JSON.parse(localStorage.getItem("cart")));
      }
    } catch (error) {
      console.log(error);
      localStorage.clear();
    }
    const myuser = JSON.parse(localStorage.getItem('myuser'))
    if(myuser)
    {
      setUser({value: myuser.token, email: myuser.email })
    }
    setKey(Math.random())
  }, [router.query]);

  const saveCart = (newCart) => {
    localStorage.setItem("cart", JSON.stringify(newCart));
    let subt = 0;
    let keys = Object.keys(newCart);
    for (let i = 0; i < keys.length; i++) {
      subt += newCart[keys[i]]["price"] * newCart[keys[i]].qty;
    }
    setSubTotal(subt);
  };

  const addToCart = (itemCode, qty, price, name, size, variant) => {
    toast.success(`${name} is added to cart`, {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
    if(Object.keys(cart).length === 0){
      setKey(Math.random())
    }
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty + qty;
    } else {
      newCart[itemCode] = { qty: 1, price, name, size, variant };
    }
    setCart(newCart);
    // console.log(newCart);
    

    saveCart(newCart);
    // console.log('addtocart is called');
  };

  const logout = ()=>{
    localStorage.removeItem('myuser')
    setUser({value: null})
    setKey(Math.random())
    toast.success(`logout successfully done`, {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
      router.push('/')
  }

  const clearCart = () => {
    // console.log('your cart has been cleared');

    setCart({});
    saveCart({});
  };
  const removeFromCart = (itemCode, qty, price, name, size, variant) => {
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty - qty;
    }
    console.log(itemCode);

    if (newCart[itemCode]["qty"] <= 0) {
      delete newCart[itemCode];
    }
    setCart(newCart);
    saveCart(newCart);
  };

  const buyNow = (itemCode, qty, price, name, size, variant) => {
    // saveCart({});
    let newCart = {}
    // newCart = { slug: { qty: 1, price, name, size, variant } };
    newCart[itemCode] =  { qty: 1, price, name, size, variant } ;

    setCart(newCart);
    // console.log(newCart);

    saveCart(newCart);
    // console.log('addtocart is called');
    router.push("/checkout");
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
       <LoadingBar
        color='#059669'
        progress={progress}
        waitingTime={400}
        onLoaderFinished={() => setProgress(0)}
      />
       
       {key && <Navbar
        logout={logout}
        user={user}
        key={key}
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        subTotal={subTotal}
        buyNow={buyNow}
      />}
      
      <Component
       
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        subTotal={subTotal}
        buyNow={buyNow}
        {...pageProps}
      />
      
      <Footer />
    </>
  );
}

export default MyApp;
