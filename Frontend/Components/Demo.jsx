import React from "react";
import "../src/App.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef, useEffect } from "react";
import Lenis from "@studio-freight/lenis";
gsap.registerPlugin(ScrollTrigger);

function Demo() {
  const sliderRef = useRef(null);
  const cRef = useRef(null);

  useEffect(() => {
    const area = sliderRef.current;
    const Cimg = cRef.current;

    area.addEventListener("mousemove", (e) => {
      Cimg.style.display = "block"
      Cimg.style.left = e.clientX + "px";
      Cimg.style.top = e.clientY + "px";
    });
    area.addEventListener("mouseleave", (e) => {
      Cimg.style.display = "none"

    });
  }, []);

  useEffect(() => {
    gsap.set(".slider-2", { x: -2400 });
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".slider-2",
        start: "bottom bottom",
        end: "bottom 10%",
        scrub: 1.5,
        //        markers: true,
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
      <img
        ref={cRef}
        src="/arrow-right.svg"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100px",
          height: "20px",
          opacity:"100%",
          display:"none",
          pointerEvents: "none",
          transform: "translate(-50%, -50%)",
          zIndex: 9999,
        }}
      />
      <div
        ref={sliderRef}
        style={{cursor:"none"}}
        className="next  flex slider fixed  top-0 left-0 w-full h-screen bg-white items-center justify-center text-white text-3xl"
      >
        <div className="slider-2 py-2 gap-75   w-full flex">
          <img
            src="/himage-1.webp"
            alt=""
            style={{ height: "48rem", width: "42rem" }}
          />
          <img
            src="/himage-2.webp"
            alt=""
            style={{ height: "48rem", width: "42rem" }}
          />
          <img
            src="/himage-3.webp"
            alt=""
            style={{ height: "48rem", width: "42rem" }}
          />
          <img
            src="/himage3_new_2.jpg"
            alt=""
            style={{ height: "48rem", width: "42rem" }}
          />
          <img
            src="/himage4.jpg"
            alt=""
            style={{ height: "48rem", width: "42rem" }}
          />
          <img
            src="/himage6.webp"
            alt=""
            style={{ height: "48rem", width: "42rem" }}
          />
          <img
            src="/himage51.webp"
            alt=""
            style={{ height: "48rem", width: "42rem" }}
          />
        </div>
      </div>
    </div>
  );
}

export default Demo;