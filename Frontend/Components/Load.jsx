import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function Load(props) {
  const parRef = useRef(null);
  const currentPath = useLocation().pathname;
  const pageRef = useRef(null);

  useGSAP(
    function (props) {
      const tl = gsap.timeline();

      tl.to(parRef.current, {
        display: "block",
      });
      tl.from(".stair", {
        height: 0,
        stagger: {
          amount: -0.55,
        },
      });
      tl.to(".stair", {
        y: "100%",
        stagger: {
          amount: -0.55,
        },
      });

      tl.to(parRef.current, {
        display: "none",
      });

      tl.to(".stair", {
        y: "0%",
      });
      gsap.from(pageRef.current,{
        opacity:0,
        delay:1.4,
    })
    },
    
    [currentPath],
  );

  return (
    <div className="">
      <div ref={parRef} className="h-screen w-full fixed z-50 top-0">
        <div className="h-full w-full flex">
          <div className="stair h-full w-1/4 bg-[#47d7ac] border-black border-x-black"></div>
          <div className="stair h-full w-1/4 bg-[#47d7ac] border-black border-x-black"></div>
          <div className="stair h-full w-1/4 bg-[#47d7ac] border-black border-x-black"></div>
          <div className="stair h-full w-1/4 bg-[#47d7ac] border-black border-x-black"></div>
        </div>
      </div>
      <div ref={pageRef} className="">
        {props.children}
      </div>
    </div>
  );
}

export default Load;
