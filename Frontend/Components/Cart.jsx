import axios from "axios";
import React, { useEffect } from "react";
import "../src/App.css";
import { useState } from "react";
import Card from "./Card.jsx";
import api from "../src/Axios.js";

function Cart() {
  const [cart, setCart] = useState([]);
  const [pdata, setPdata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cost, setCost] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await api.get("http://localhost:8080/cart", {
        withCredentials: true,
      });

      setCart(data.data);
      setPdata(data.pdata);
      const total = data.data.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0,
      );

      setCost(total);
      setLoading(false);
    };

    fetchData();
  }, []);

  console.log(cart);
  console.log("pdata", pdata);

  const decrement = () => {};

  const increment = () => {};

  if (loading) return <div>...loading</div>;

  return (
    <div className="py-20 h-screen px-15 flex  cart">
      <div className="h-full gap-10 w-3/5 flex flex-wrap">
        {pdata.map((item, idx) => {
          return (
            <div className="">
              <div key={idx} className="h-80 w-60 overflow-hidden">
                <img
                  src={item.images[0]}
                  className="object-cover h-full w-full"
                  alt=""
                />
              </div>
              <div className="py-4">
                <p>{item.name}</p>
              </div>
              <div className="py-4 relative flex ">
                <p className="absolute right-0  text-[0.7rem]">quantity</p>
              </div>
              <div className="w-full flex justify-between py-2">
                <h3>${cart[idx].price}</h3>
                <div className="flex items-center">
                  <button
                    className=""
                    style={{
                      height: "2rem",
                      width: "2rem",
                      border: "1px solid black",
                    }}
                    onClick={decrement}
                  >
                    -
                  </button>
                  <button
                    className="k"
                    style={{
                      height: "2rem",
                      width: "2rem",
                      border: "1px solid black",
                    }}
                  >
                    {cart[idx].quantity}
                  </button>
                  <button
                    className="k "
                    onClick={increment}
                    style={{
                      height: "2rem",
                      width: "2rem",
                      border: "1px  solid black",
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="h-full w-2/5 px-15 py-14">
        <h3 className="text-[2rem] order py-7">Order Summary</h3>
        <div className="flex justify-between w-full py-7">
          <p>Subtotal</p>
          <p>wasd</p>
        </div>
        <div className="h-[1px] w-full bg-red-800"></div>
        <div className="total flex py-10 justify-between">
          <p>Total</p>
          <p>{cost}</p>
        </div>
      </div>
    </div>
  );
}

export default Cart;
