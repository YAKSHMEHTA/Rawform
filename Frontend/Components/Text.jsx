import React from "react";
import "../src/App.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef, useEffect } from "react";
gsap.registerPlugin(ScrollTrigger);

function SplitText({ text, className, direction = "left" }) {
  return (
    <p className={className}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="char"
          style={{
            display: "inline-block",
            paddingRight: direction === "left" ? "2.7rem" : 0,
            paddingLeft: direction === "right" ? "4.7rem" : 0,
          }}
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
          trigger: ".texts",
          start: "+=3500 60%",
          end: "bottom top",
        },
      });
      tl.to(".up-text .char", {
        transformOrigin: "right",
        paddingRight: 0,
        ease: "power3.out",
        duration: 2,
        stagger: 0.008,
      });
      tl.to(
        ".mordern-text .char",
        {
          paddingLeft: 0,
          ease: "power3.out",
          duration: 2,
          stagger: 0.008,
        },
        "-=1.2s",
      )

    }, ".texts");
    return () => ctx.revert();
  }, []);

  return (
    <div className="h-screen pb-10 outer w-full overflow-clip relative   ">
      <div
        className="trigger texts relative z-40 h-full   w-full felx flex-col
            justify-between px-40 py-25 max-xl:px-5"
      >
        <div className="w-full up-text leading-none">
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
        <div className="w-full tracking-widest relative  h-full t flex flex-col-reverse leading-none text-white text-[8rem] items-end ">
          <div className="absolute mordern-text right-[-180px]">
            <SplitText
              className="heading-3 left-0   font-extralight whitespace-nowrap
          max-sm:text-[1.125rem] "
              text={"modern twist"}
              direction={"right"}
            ></SplitText>
            <SplitText
              className="heading-3 left-0  font-extralight whitespace-nowrap
          max-sm:text-[1.125rem] "
              text={"on classical"}
              direction={"right"}
            ></SplitText>
            <SplitText
              className="heading-3  font-extralight whitespace-nowrap
          max-sm:text-[1.125rem] "
              text={"elegance"}
              direction={"right"}
            ></SplitText>
          </div>
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
