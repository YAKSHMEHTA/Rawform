import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";

function Cart() {

    const [cart,setCart] = useState([]);
    const [loading,setLoading] = useState(true)
  useEffect(() => {
    const fetchData = async () => {
      const {data} = await axios.get(
        "http://localhost:8080/cart",
        { withCredentials: true },
      );
      setCart(data)
      setLoading(false)
      console.log(data)
    };
    fetchData();
    
  },[]);
  console.log(cart);
  
  if(loading) return (<div>...loading</div>);

  return (
    <div>
      <div className="h-full w-3/5">{cart[0].size}</div>
      <div className="h-full w-3/5"></div>
    </div>
  );
}

export default Cart;
