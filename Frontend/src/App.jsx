import "./App.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef, useEffect } from "react";
gsap.registerPlugin(ScrollTrigger);

function App() {
  const scrollImgRef = useRef(null);
  const whiteRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "+=1200",
            scrub: 1.5,
            pin: true,
          },
        })

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
    });

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

      <div className="h-screen bg-black flex items-center justify-center text-white text-3xl">
        Next Section
      </div>
    </div>
  );
}

export default App;
