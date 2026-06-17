import axios from "axios";
import React, { useEffect } from "react";
import "../src/App.css"
import { useState } from "react";
import api from "../src/Axios.js"

function Cart() {

    const [cart,setCart] = useState([]);
    const [loading,setLoading] = useState(true);
    const [cost,setCost] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const {data} = await axios.get(
        "http://localhost:8080/cart",
        { withCredentials: true },
      );
      setCart(data)
      setLoading(false)
      console.log(data)
      cart.forEach(element => {
      setCost(prev => {return prev + (element.quantity & element.price)})
    });
    };
    fetchData();
    
    

  },[]);
  console.log(cart);
  
  if(loading) return (<div>...loading</div>);

  return (
    <div className="py-20 h-screen px-15 flex cart">
      <div className="h-full w-3/5">{cart[0].size}</div>
      <div className="h-full w-2/5 px-15 py-14">
        <h3 className="text-[2rem] order py-7" >Order Summary</h3>
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
