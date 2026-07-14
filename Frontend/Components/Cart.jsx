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
  const [change, setChange] = useState(false);

  const handelPayment = async () => {
    try {
      console.log("clicked");
      const { data } = await axios.post(
        "http://localhost:8080/v1/order",
        { cost },
        { withCredentials: true },
      );
      console.log("Backend Response:", data);

      const razorOrder = data.order;

      console.log("Razor Order:", razorOrder);
      const options = {
        key: "rzp_test_T7vXx1kI5pPbnn", // Public Key
        amount: razorOrder.amount,
        currency: razorOrder.currency,
        name: "My Store",
        description: "Test Transaction",
        order_id: razorOrder.id,

        handler: async function (response) {
          console.log(response);

          /*
          response = {
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature
          }
          */

          // Send these to backend for signature verification
          const { data } = await axios.post(
            "http://localhost:8080/v1/verify",
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            },
            { withCredentials: true },
          );
          console.log("response", data);
          console.log("data", data);
        },

        prefill: {
          name: "Yaksh",
          email: "yaksh@example.com",
          contact: "9876543210",
        },

        theme: {
          color: "#3399cc",
        },
      };
      const razor = new window.Razorpay(options);
      razor.open();
    } catch (e) {}
  };

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
  }, [change]);

  console.log(cart);
  console.log("pdata", pdata);

  const decinc = async (pid, idx, bool, remove) => {
    console.log("pid", pid);
    console.log("idx", idx);
    const data = await api.post(
      "/inc",
      { id: pid, idx: idx, bool: bool, remove: remove },
      { withCredentials: true },
    );
    setChange((prev) => !prev);
  };

  if (loading) return <div>...loading</div>;

  return (
    <div className="py-20 h-screen px-15 flex  cart">
      <div className="h-full gap-10 w-3/5 flex flex-wrap">
        {pdata.map((item, idx) => {
          return (
            <div key={idx} className="">
              <div key={idx} className="h-80 w-60 relative overflow-hidden">
                <img
                  src={item.images[0]}
                  className="object-cover h-full w-full"
                  alt=""
                />
                <button
                  onClick={() => {
                    decinc(item._id, idx, false, true);
                  }}
                  className="absolute z-3 top-3 right-4 font-bold"
                >
                  X
                </button>
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
                    onClick={() => {
                      decinc(item._id, idx, false, false);
                    }}
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
                    onClick={() => {
                      decinc(item._id, idx, true, false);
                    }}
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
          <button onClick={handelPayment}>{cost}</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
