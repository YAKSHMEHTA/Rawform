import React from "react";
import gsap from "gsap";
import '../src/App.css'
import { Link } from "react-router-dom";

function Navbar() {
  const NavColor = () => {
    gsap.to(".nav", {
      backgroundColor: "rgba(255,255,255,1)",
    });
  };

  const NavColor1 = () => {
    gsap.to(".nav", {
      backgroundColor: "rgba(255,255,255,0)",
    });
  };

  const handelShop = () =>{
    const shopDiv = document.getElementById("shop")
    console.log("mouseenter")
    shopDiv.style.display = "flex";
    shopDiv.style.flexDirection = "column";
    shopDiv.style.opacity = "1";
  }
  const handelShopLeave = () => {
    console.log("mouseleave")
    const shopDiv = document.getElementById("shop")
    shopDiv.style.display = "none";
    shopDiv.style.opacity = "0";
  }

  return (
    <div
      onMouseOver={NavColor}
      onMouseLeave={NavColor1}
      className="nav px-8 py-6 fixed w-full flex justify-between
     items-center z-10 size-max:bg-red-800"
    >

      <div>
        <a href="">YAKSH</a>
      </div>


      <div className="flex gap-15 relative">
        <Link onMouseOver={handelShop}  className="" to="/shop/2">SHOP</Link>
        <div id="shop" onMouseLeave={handelShopLeave} className="absolute drops gap-1  top-10  " style={{display:"none"}}>
          <div className="h-0.5  w-full bg-black"></div>
          <Link to={"/shop/1"}>Drop 1</Link>
          <Link to={"/shop/2"} >Drop 2</Link>
        </div>
        <Link to="/about">ABOUT</Link>
        
        <a href="Contact">CONTACT</a>
        <a href="">STOCKIST</a>
      </div>

      <div className="flex gap-6">
        <a href="">BAG</a> 
        <Link to="/profile"> <a href="">PROFILE</a> </Link>
      </div>
    </div>
  );
}

export default Navbar;
