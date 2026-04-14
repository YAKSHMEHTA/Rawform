import "./App.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef, useEffect } from "react";
gsap.registerPlugin(ScrollTrigger);
import Demo from "../Components/Demo";

function App() {
  const scrollImgRef = useRef(null);
  const whiteRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      let tl = gsap.timeline({
        scrollTrigger: {
          //  markers:true,
          trigger: ".hero",
          start: "top top",
          end: "+=1800",
          scrub: 1.5,
          pin: true,
        },
          ease: "power1.out",
        },
        0,
      )
      .to(
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
      tl.to(".next", {
        yPercent: 0,
        ease: "power1.out",   
      }, 0.6)
    })


    return () => ctx.revert();
  }, []);

  return (
    <div className="relative">
      <div className="hero h-screen w-full relative overflow-hidden">
        <img
          src="https://dropedition.com/images/hero5.jpg"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: 1 }}
        />

        <div
          ref={scrollImgRef}
          className="absolute inset-0 w-full  h-full"
          style={{
            zIndex: 2,
            backgroundImage: `url(https://dropedition.com/images/hero5.jpg)`,
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

      <Demo className="next"></Demo>
    </div>
  );
}

export default App;
