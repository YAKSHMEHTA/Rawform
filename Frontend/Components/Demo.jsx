import React from "react";
import "../src/App.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef, useEffect } from "react";
import Lenis from "@studio-freight/lenis";
gsap.registerPlugin(ScrollTrigger);

function Demo() {
  useEffect(() => {
    gsap.set(".slider-2",{x:-2400})
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".slider-2",
        start: "bottom bottom",
        end: "bottom 10%",
        scrub: 1.5,
        markers: true,
      },
    });

    tl.to(".slider-2", {
      y: "10rem",
      top: "2rem",
      ease: "power3.out",
      duration: 1.3,
    });
    tl.to(".slider-2", { y: "1rem", ease: "power4.in" });
  }, []);

  return (
    <div>
      <div className="next  flex slider fixed  top-0 left-0 w-full h-screen bg-white items-center justify-center text-white text-3xl">
        <div className="slider-2 py-2 gap-75   w-full flex">
          <img
            src="./public/himage-1.webp"
            alt=""
            style={{ height: "48rem", width: "42rem" }}
          />
          <img
            src="./public/himage-2.webp"
            alt=""
            style={{ height: "48rem", width: "42rem" }}
          />
          <img
            src="./public/himage-3.webp"
            alt=""
            style={{ height: "48rem", width: "42rem" }}
          />
          <img
            src="./public/himage3_new_2.jpg"
            alt=""
            style={{ height: "48rem", width: "42rem" }}
          />
          <img
            src="./public/himage4.jpg"
            alt=""
            style={{ height: "48rem", width: "42rem" }}
          />
          <img
            src="./public/himage6.webp"
            alt=""
            style={{ height: "48rem", width: "42rem" }}
          />
          <img
            src="./public/himage51.webp"
            alt=""
            style={{ height: "48rem", width: "42rem" }}
          />
        </div>
        
      </div>
      
    </div>
  );
}

export default Demo;
