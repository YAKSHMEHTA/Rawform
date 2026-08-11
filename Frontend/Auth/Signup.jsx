import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [inputVal, setInputVal] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    setInputVal({
      ...inputVal,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputVal);
    try {
      const res = await axios.post(
        "https://rawform.onrender.com/auth/signup",
        { ...inputVal },
        { withCredentials: true },
      );
      if (res.status === 200) {
        const res = await axios.post(
          "https://rawform.onrender.com/auth/login",
          { ...inputVal },
          { withCredentials: true },
        )
        window.location.href = '/';
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="form_container w-full bg-black flex items-center justify-center h-screen text-white">
      <div className=" w-[50%] h-[100%] pt-[10%] text-center flex flex-col gap-10">
        <h2>Signup Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-10">
            <div className="flex flex-col justify-start items-start">
              <label className="" htmlFor="email">
                name
              </label>
              <input
                className="h-10 border-2 border-gray-300 rounded-md w-full text-white px-2"
                type="name"
                name="name"
                value={inputVal.name}
                placeholder="Enter your name"
                onChange={handleOnChange}
              />
            </div>
            <div className="flex flex-col justify-start items-start">
              <label className="" htmlFor="email">
                Email
              </label>
              <input
                className="h-10 border-2 border-gray-300 rounded-md w-full text-white px-2"
                type="email"
                name="email"
                value={inputVal.email}
                placeholder="Enter your email"
                onChange={handleOnChange}
              />
            </div>
            <div className="flex flex-col justify-start items-start">
              <label className="" htmlFor="password">
                Password
              </label>
              <input
                className="h-10 border-2 border-gray-300 rounded-md w-full"
                type="password"
                name="password"
                value={inputVal.password}
                placeholder="Enter your password"
                onChange={handleOnChange}
              />
            </div>
            <div className=" display flex justify-center">
              <button
                className="bg-blue-700 h-14 w-[25%] text-white !rounded-md"
                type="submit"
              >
                Submit
              </button>
            </div>
            <span>
              already have have an account? <Link to={"/login"}>Login</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
