import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useGsap } from "@gsap/react";
import gsap from "gsap";

function Load(props) {
  const parRef = useRef(null);
    const currentPath = useLocation().pathname;
    const pageRef = useRef(null)

  useGsap(() => {
    const tl = gsap.timeline();

    tl.to(parRef.current, {
      display: "block",
    })
    tl.from(".stair",{
        height:0,
        stagger:-0.25
    })
    tl.to(".stair",{
        height:"100%",
        stagger:{
            amount:-0.25
        }
    })
    tl.to(parRef.current,{
        display:"none",
    })
    tl.to(".stair",{
        height:"0%"
    })
    gsap.from(parRef.current,{
        opacity:0,
        delay:1.3,
        scale:1.3,
    })
  },[currentPath]);

  return (
    <div ref={parRef} className="h-screen w-full fixed z-50 top-0">
      <div className="h-full w-full flex">
        <div className="stair h-full w-1/4 bg-[#47d7ac] border-black border-x-black"></div>
        <div className="stair h-full w-1/4 bg-[#47d7ac] border-black border-x-black"></div>
        <div className="stair h-full w-1/4 bg-[#47d7ac] border-black border-x-black"></div>
        <div className="stair h-full w-1/4 bg-[#47d7ac] border-black border-x-black"></div>
      </div>
    </div>
  );
}

export default Load;
