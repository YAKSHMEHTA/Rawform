import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Lenis from "@studio-freight/lenis";
import Nice from "./Nice";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
function BuyNow() {
  const img1 = useRef(null);
  const img2 = useRef(null);

    useEffect(() => {
    const lenis = new Lenis({
      duration: 1.8,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => lenis.destroy();
  }, []);

  const handelEnter = (ref) => {
    gsap.to(ref.current, {
      scale: 1,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const handelLeave = (ref) => {
    gsap.to(ref.current, {
      scale: 1.1,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".curted",
        start: "+=1800px bottom",
        end: "+=1800px top",
        scrub: 1.5,
        markers: true,
      },
    });

    tl.to(".pi", {
      paddingTop: "5rem",
      ease: "power3.out",
    })
    tl.to(".pi", {
      paddingTop: "1rem",
      ease: "power1.in",
    })
  }, []);

  return (
    <>
      <div className="bg-white curted h-[110vh] absolute overflow-hidden  w-full ">
        <div className="px-8 p-0 pi">Curated Pieces</div>
        <div className="flex h-full w-full">
          <div className="h-full curtedimg-1 w-1/2 overflow-hidden  origin-top-right scale-110">
            <img
              ref={img1}
              onMouseEnter={() => handelEnter(img1)}
              onMouseLeave={() => handelLeave(img1)}
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
              onMouseLeave={() => handelLeave(img2)}
              className="h-full scale-110 w-full overflow-hidden object-cover origin-top-right "
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default BuyNow;
