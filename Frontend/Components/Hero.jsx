import "../src/App.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import BuyNow from "./BuyNow";
import { useRef, useEffect } from "react";
import Text from "./Text";
import Demo from "./Demo";
import Lenis from "@studio-freight/lenis";
import Footer from "../src/Footer";
gsap.registerPlugin(ScrollTrigger);

function Hero() {
  const scrollImgRef = useRef(null);
  const whiteRef = useRef(null);



  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "+=1800",
          scrub: 0.5,
          pin: true,
        },
      });

      tl.to(
        scrollImgRef.current,
        {
          backgroundPositionY: "-120%",
          backfaceVisibility: true,
          maskSize: "150%",
          ease: "none",
        },
        0,
      )

        .to(
          whiteRef.current,
          {
            opacity: 0.6,
            backgroundPositionY: "-120%",
            backfaceVisibility: true,
            maskSize: "150%",
            ease: "none",
          },
          0,
        );

      gsap.set(".next", { yPercent: 100 });

      tl.to(
        ".next",
        {
          yPercent: 0,
          ease: "power1.out",
        },
        "-=0.25",
      );
      tl.fromTo(".cyan", { yPercent: 100 }, { yPercent: 0 });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div className="relative">
        <div className="hero relative h-screen w-full  overflow-hidden">
          <img
            src="/BGHEROIMG.jpg"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ zIndex: 1 }}
          />

          <div
            ref={scrollImgRef}
            className="absolute  inset-0 w-full   h-full"
            style={{
              zIndex: 2,
              backgroundImage: `url('/BGHEROIMG.jpg')`,
              backgroundSize: "100%",
              backfaceVisibility: false,
              backgroundPosition: "center 50%",
              WebkitMaskImage: `url('/rawform-mask.png'), linear-gradient(black, black)`,
              WebkitMaskComposite: "sin",
              WebkitMaskSize: "cover",
              WebkitMaskPosition: "center",
              maskImage: `url('/rawform-mask.png'), linear-gradient(black, black)`,
              maskComposite: "exclude",
              maskSize: "100%",
              maskPosition: "center",
            }}
          />
          <div
            ref={whiteRef}
            className="absolute inset-0 bg-white"
            style={{
              zIndex: 3,
              opacity: 0,
              WebkitMaskImage: `url('/rawform-mask.png'), linear-gradient(black, black)`,
              maskComposite: "intersect",
              maskSize: "100%",
              maskPosition: "center",
            }}
          />
        </div>
      </div>
    </>
  );
}

export default Hero;
