import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Nice from "./Nice";

gsap.registerPlugin()
function BuyNow() {
  const img1 = useRef(null);
  const img2 = useRef(null);

  const handelEnter = (ref) => {
    gsap.to(ref.current, {
      scale: 1,
      duration: 0.5,
      ease:"power2.out"
    });
  };

  const handelLeave = (ref) => {
    gsap.to(ref.current, {
      scale: 1.1,
      duration: 0.5,
      ease:"power2.out"
    });
  };

  return (
    <>
      <div className="h-full w-full z-50">Curated Pieces</div>
      <div className="bg-red-800 h-screen absolute overflow-hidden  w-full flex ">
        <div className="h-full curtedimg-1 w-1/2 overflow-hidden  origin-top-right scale-110">
          <img
            ref={img1}
            onMouseEnter={() => handelEnter(img1)}
            onMouseLeave={()=> handelLeave(img1)}
            src="/hr1.webp"
            className="h-full scale-110 w-full object-cover"
            alt=""
          />
        </div>
        <div className="h-full overflow-hidden w-1/2">
          <img
            ref={img2}
            src="/hr2.webp"
            onMouseEnter={() => handelEnter(img2)}
            onMouseLeave={()=> handelLeave(img2)}
            className="h-full scale-110 w-full overflow-hidden object-cover origin-top-right "
            alt=""
          />
        </div>
      </div>
    </>
  );
}

export default BuyNow;
