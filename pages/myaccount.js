import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyAccount = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  // const [state, setState] = useState("");
  // const [city, setCity] = useState("");
  // const [disabled, setDisabled] = useState(true);
  const [user, setUser] = useState({ value: null });
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [npassword, setNpassword] = useState("");

  // const handlePassword = async()=>{

  //   let data = {token: user.token}
  //   let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/`, {
  //     method: "POST", // or 'PUT'
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   });
  //   let res = await a.json();
  //   console.log(res);

  // }

  const handleChange = async (e) => {
    // console.log(user,email);

    if (e.target.name == "name") {
      setName(e.target.value);
    } else if (e.target.name == "phone") {
      setPhone(e.target.value);
    } else if (e.target.name == "address") {
      setAddress(e.target.value);
    } else if (e.target.name == "pincode") {
      setPincode(e.target.value);
      // if (e.target.value.length == 6) {
      //   let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
      //   let pinJson = await pins.json();
      //   if (Object.keys(pinJson).includes(e.target.value)) {
      //     setState(pinJson[e.target.value][1]);
      //     setCity(pinJson[e.target.value][0]);
      //   } else {
      //     setState("");
      //     setCity("");
      //   }
      // } else {
      //   setState("");
      //   setCity("");
      // }
    } else if (e.target.name == "password") {
      setPassword(e.target.value);
    } else if (e.target.name == "cpassword") {
      setCpassword(e.target.value);
    }
    else if (e.target.name == "npassword") {
      setNpassword(e.target.value);
    }
  };

  useEffect(() => {
    const myuser = JSON.parse(localStorage.getItem("myuser"));
    if (!myuser) {
      router.push("/");
    }
    if (myuser && myuser.token) {
      setUser(myuser);
      setEmail(myuser.email);
      fetchData(myuser.token);
    }
  }, [router]);

  const fetchData = async (token) => {
    let data = { token: token };
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let res = await a.json();
    // console.log(res);
    setAddress(res.address);
    setName(res.name);
    setPincode(res.pincode);
    setPhone(res.phone);
  };
  const handleUserSubmit = async () => {
    let data = { token: user.token, address, name, phone, pincode };
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateuser`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let res = await a.json();
    // console.log(res);
    if (res.success) {
      toast.success("Successfully Updated Details", {
        position: "top-center",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };
  let res;
  const handlePasswordSubmit = async () => {
    if(npassword == cpassword)
    {
    let data = { token: user.token, password, cpassword, npassword };
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updatepassword`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    res = await a.json();
  }
  else{
    res = {success: false}
  }
    // console.log(res);
    if (res.success) {
      toast.success("Successfully Updated Password", {
        position: "top-center",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast.error("Error in Updating Password", {
        position: "top-left",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    setPassword("")
    setCpassword("")
    setNpassword("")
  };

  return (
    <div className="conatiner md:w-10/12  md:mx-auto mx-2 my-10">
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
      <h1 className="text-center text-2xl font-bold my-2">
        Update your Account
      </h1>
      <h1 className="font-bold text-lg my-2">1.Details</h1>
      <div className="flex my-1 ">
        <div className="px-2 w-1/2">
          <div class=" mb-4">
            <label htmlfor="name" className="leading-7 text-sm text-gray-600">
              Name
            </label>
            <input
              value={name}
              onChange={handleChange}
              type="text"
              id="name"
              name="name"
              className="w-full bg-white rounded border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2 ">
          <div class=" mb-4">
            <label htmlfor="email" className="leading-7 text-sm text-gray-600">
              Email
            </label>
            {user && user.token ? (
              <input
                value={user.email}
                onChange={handleChange}
                type="email"
                id="email"
                name="email"
                className="w-full bg-white rounded border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                readOnly
              />
            ) : (
              <input
                value={email}
                onChange={handleChange}
                type="email"
                id="email"
                name="email"
                className="w-full bg-white rounded border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            )}
            {/* {console.log(user.value)} */}
          </div>
        </div>
      </div>
      <div className="px-2 w-full ">
        <div class=" mb-4">
          <label htmlfor="address" className="leading-7 text-sm text-gray-600">
            Address
          </label>
          <textarea
            value={address}
            onChange={handleChange}
            name="address"
            id="address"
            cols="30"
            rows="2"
            className="w-full bg-white rounded border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          ></textarea>
        </div>
      </div>
      <div className="flex my-2 ">
        <div className="px-2 w-1/2">
          <div class=" mb-4">
            <label htmlfor="phone" className="leading-7 text-sm text-gray-600">
              Phone Number
            </label>
            <input
              value={phone}
              onChange={handleChange}
              type="number"
              id="phone"
              name="phone"
              className="w-full bg-white rounded border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2 ">
          <div class=" mb-4">
            <label
              htmlfor="pincode"
              className="leading-7 text-sm text-gray-600"
            >
              Pincode
            </label>
            <input
              value={pincode}
              onChange={handleChange}
              type="number"
              id="pincode"
              name="pincode"
              className="w-full bg-white rounded border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>
      <button
        onClick={handleUserSubmit}
        className="-mt-2 mx-2  disabled:bg-emerald-300  text-white text-md bg-emerald-500 border-0 py-1 px-2 focus:outline-none hover:bg-emerald-600 rounded  flex "
      >
        Submit
      </button>
      <h1 className="font-bold text-lg mt-4">2.Change Password</h1>
      <div className="flex my-4 ">
        <div className="px-2 w-1/2">
          <div class=" mb-4">
            <label
              htmlfor="password"
              className="leading-7 text-sm text-gray-600"
            >
              Password
            </label>
            <input
              value={password}
              onChange={handleChange}
              type="password"
              id="password"
              name="password"
              className="w-full bg-white rounded border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2 ">
          <div class=" mb-4">
            <label
              htmlfor="cpassword"
              className="leading-7 text-sm text-gray-600"
            >
              New Password
            </label>
            <input
              value={cpassword}
              onChange={handleChange}
              type="password"
              id="cpassword"
              name="cpassword"
              className="w-full bg-white rounded border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2 ">
          <div class=" mb-4">
            <label
              htmlfor="npassword"
              className="leading-7 md:text-sm text-[10px] text-gray-600"
            >
              Conform New Password
            </label>
            <input
              value={npassword}
              onChange={handleChange}
              type="password"
              id="npassword"
              name="npassword"
              className="w-full bg-white rounded border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>
      <button
        onClick={handlePasswordSubmit}
        className="-mt-2 mx-2  disabled:bg-emerald-300  text-white text-md bg-emerald-500 border-0 py-1 px-2 focus:outline-none hover:bg-emerald-600 rounded  flex "
      >
        Submit
      </button>
    </div>
  );
};

export default MyAccount;
