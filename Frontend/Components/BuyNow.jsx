import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Lenis from "@studio-freight/lenis";
import Nice from "./Nice";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
function BuyNow() {
  const img1 = useRef(null);
  const img2 = useRef(null);
  const btnLeft = useRef(null);
  const btnRight = useRef(null);

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
    console.log(ref.current.alt);
    if (ref.current.alt == "w") {
      gsap.to(".btn-1", {
        opacity: 1,
        ease: "Power4.out",
      });
    } else {
      gsap.to(".btn-2", {
        opacity: 1,
        ease: "Power4.out",
      });
    }
    gsap.to(ref.current, {
      scale: 1,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const buttonLeave = (ref) => {
    gsap.to(ref.current, {
      backgroundColor: "white",
    });
  };

  const handelLeave = (ref) => {
    if (ref.current.alt == "w") {
      gsap.to(".btn-1", {
        opacity: 0,
        ease: "Power4.out",
      });
    } else {
      gsap.to(".btn-2", {
        opacity: 0,
        ease: "Power4.out",
      });
    }

    gsap.to(ref.current, {
      scale: 1.1,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  useEffect(() => {
    gsap.fromTo(
      ".wrap",
      {
        clipPath: "inset(0 0 100% 0)",
      },
      {
        clipPath: "inset(0 0 0% 0)",
        ease: "power4.in",
        duration: 1,
        stagger:0.15,
        scrollTrigger: {
          trigger: ".curted",
          markers: true,
          start: "+=1800px center",
        },
      },
    );

    gsap.fromTo(
      ".wrap img",
      { y: -60 },
      {
        y: 0,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: ".curted",
          start: "+=1800px center",
          end: "+=1800px top",
          scrub: 1,
        },
      },
    );

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".curted",
        start: "+=1800px center",
        end: "+=1800px top",
        scrub: 1,
      },
    });

    tl.to(".pi", {
      paddingTop: "5rem",
      ease: "power1.out",
    });
    tl.to(".pi", {
      paddingTop: "1rem",
      ease: "power4.inOut",
    });
  }, []);

  return (
    <>
      <div className="bg-white curted h-[110vh] absolute overflow-hidden  w-full ">
        <div className="px-8 p-0 pi">Curated Pieces</div>
        <div className="flex h-full w-full">
          <div
            onMouseEnter={() => handelEnter(img1)}
            onMouseLeave={() => handelLeave(img1)}
            className="h-full curtedimg-1 w-1/2 overflow-hidden relative  
            origin-top-right scale-110 cimg"
          >
            <div className="w-full h-full wrap  overflow-hidden">
              <img
                ref={img1}
                src="/hr1.webp"
                className="h-full scale-110 w-full object-cover"
                alt="w"
              />
            </div>
            <button
              onMouseEnter={() => {
                handelEnter(img1);
              }}
              ref={btnLeft}
              className="z-99999 opacity-0 btn-1 absolute bottom-41 w-43 h-10 text-black hover:bg-[#47d7ac] 
               transition-all ease-out  duration-500  left-1/2 -translate-x-1/2   bg-white"
            >
              Buy Now
            </button>
          </div>
          <div
            onMouseEnter={() => handelEnter(img2)}
            onMouseLeave={() => handelLeave(img2)}
            className="h-full  relative overflow-hidden w-1/2"
          >
            <div className="w-full h-full wrap  overflow-hidden">
              <img
                ref={img2}
                src="/hr2.webp"
                className="h-full scale-110 w-full overflow-hidden object-cover origin-top-right "
                alt=""
              />
            </div>
            <button
              ref={btnRight}
              onMouseEnter={() => {
                handelEnter(img2);
              }}
              onMouseLeave={() => {
                buttonEnter(btnRight);
              }}
              className="z-99999 hover:bg-[#47d7ac] opacity-0  btn-2 transition-all ease-out  duration-500 w-43
               absolute bottom-25 h-10 left-1/2 text-black -translate-x-1/2  bg-white"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default BuyNow;
