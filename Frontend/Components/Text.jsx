import React from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef, useEffect } from "react";
gsap.registerPlugin(ScrollTrigger);

function SplitText({ text, className }) {
  return (
    <p className={className}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="char"
          style={{ display: "inline-block", paddingRight: "2.7rem" }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </p>
  );
}

function Text() {


  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          markers: true,
          trigger: '.texts',
          start: "+=3500 60%",
          end: "bottom top",
        },
      });
      tl.to(".texts .char", {
        paddingRight: 0,
        ease: "power3.out",
        duration: 2,
        stagger: 0.008,
      });
    }, '.texts');
    return () => ctx.revert();
  }, []);

  return (
    <div
      className="h-screen  w-full relative   overflow-clip"
    >
      <div
        className="trigger texts relative z-40 h-full  w-full felx flex-col
            justify-between px-40 py-25 max-xl:px-5"
      >
        <div className="w-full leading-none">
          <SplitText
            text=".make yourself comfortable"
            className="heading-3  text-2xl font-light whitespace-nowrap text-[#889E9E] max-sm:text-[1.125rem]"
          ></SplitText>

          <SplitText
            text="trust your body and feel free"
            className="heading-3 text-2xl font-light whitespace-nowrap text-[#889E9E] max-sm:text-[1.125rem]"
          ></SplitText>
          <SplitText
            text="in every self manifestation+"
            className="heading-3 text-2xl font-light whitespace-nowrap text-[#889E9E] max-sm:text-[1.125rem]"
          ></SplitText>
        </div>
        <div className="w-full h-full flex flex-col-reverse leading-none text-white text-[8rem] items-end ">
          <p
            className="heading-3 font-light whitespace-nowrap
          max-sm:text-[1.125rem]"
          >
            on classical
          </p>
          <p
            className="heading-3 font-light whitespace-nowrap
          max-sm:text-[1.125rem]"
          >
            elegance
          </p>
          <p
            className="heading-3 font-light whitespace-nowrap
          max-sm:text-[1.125rem]"
          >
            modern twist
          </p>
        </div>
      </div>

      <div className="absolute top-0 left-0 w-full h-full ">
        <img
          src="/text-bg.jpg"
          alt=""
          className="absolute top-0 left-0 h-full w-full object-cover "
          style={{
            transform: "translate3d(0px, 4.7215%, 0px) scale(1.2, 1.2)",
          }}
        />
      </div>
    </div>
  );
}

export default Text;
