import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Card({ classname = "", imgSrc, btn, ani, st, end ,px}) {
  const btnref = useRef(null);
  const parref = useRef(null)
  const imgRef = useRef(null);
  function HandelEnter() {
    gsap.to(imgRef.current, {
      scale: 1,
      duration: 0.45,
      ease: "power3.Inout",
    });
    gsap.to(btnref.current, {
      opacity: 1,
      duration: 0.45,
      ease: "power3.Inout",
    });
  }

  function HandelLeave() {
    gsap.to(imgRef.current, {
      scale: 1.1,
      duration: 0.45,
      ease: "power3.out",
    });
    gsap.to(btnref.current, {
      opacity: 0,
      duration: 0.65,
      ease: "power3.Inout",
    });
  }
const fromVars =
  st === "top"
    ? { clipPath: "inset(0 0 100% 0)" }
    : { clipPath: "inset(100% 0 0 0)" };

const thenVars =
  st === "top"
    ? { clipPath: "inset(0 0 0% 0)" }
    : { clipPath: "inset(0% 0 0 0)" };
  useEffect(() => {
    if (ani === true) {
      gsap.fromTo(
        imgRef.current,
        {
          ...fromVars
        },
        {
          ...thenVars,
          ease: "power2.inOut",
          duration: 1.2,
          scrollTrigger: {
            trigger: parref.current,
            stagger:0.25,
            markers:true,
            start: px,
          },
        },
      );
    }
  });

  return (
    <div
    ref={parref}
      onMouseOver={HandelEnter}
      onMouseLeave={HandelLeave}
      className={`par relative ${classname}`}
    >
      <img
        ref={imgRef}
        src={imgSrc}
        className="w-full h-full object-cover id scale-110"
        onMouseOver={HandelEnter}
        alt=""
      />
      {btn && (
        <button
          ref={btnref}
          className="bg-white absolute bottom-2/12 left-1/2 opacity-0 hover:bg-[#47d7ac]  -translate-x-1/2 z-50
        w-63 h-13"
        >
          BUY NOW
        </button>
      )}
    </div>
  );
}

export default Card;
