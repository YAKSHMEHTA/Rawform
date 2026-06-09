import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Footer from "../src/Footer.jsx";
import { SplitText } from "gsap/SplitText";

function Splittext({ text, className, direction = "left" }) {
  return (
    <p className={className}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className={`char top-${i * 20}`}
          style={{
            display: "inline-block",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </p>
  );
}

function About() {
  const parref = useRef(null);
  const href = useRef(null);
  useEffect(() => {
    gsap.set(".yaksh", { y: "100%" });
    gsap.to(".yaksh", {
      y: "0%",
      duration: 1.2,
      stagger: 0.12,
      ease: "expo.out",
    });
  }, []);

  return (
    <>
      <div className="w-full h-[75vh] bg-black">
        <div className="h-full text w-full pt-35 relative">
          <div className="absolute w-80 right-30">
            <div ref={parref} className="par overflow-hidden">
              <h3 ref={href} className="yaksh flex flex-wrap text-white">
                This website is a personal educational and reverse engineering
                project created solely for learning, experimentation, and
                development practice.
              </h3>
            </div>
            <div ref={parref} className="par overflow-hidden">
              <h3 ref={href} className="yaksh text-white">
                yaksh vardhan singh mehta
              </h3>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default About;
