import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [inputVal,setInputVal] = useState({
    email:"",
    password:""
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:8080/auth/login",
        {...inputVal},
        { withCredentials: true }
    );
    console.log("wasd",res);
  };

  const handleOnChange = (e) => {
    const { name,value } = e.target
    setInputVal({
        ...inputVal,
        [name]: value
    })
  };

  return (
    <div className="form_container w-full bg-black flex items-center justify-center h-screen text-white">
      <div className=" w-[50%] h-[100%] pt-[10%] text-center flex flex-col gap-10">
        <h2>Login Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-10">
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
              Dont have have an account? <Link to={"/signup"}>signup</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
