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
      gsap.timeline({
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "+=1200",
          scrub: 1.5,
          pin: true,
        },
      })
 //     .to(whiteRef.current, { opacity: 1, ease: "none" })
      .to(scrollImgRef.current, { backgroundPositionY: "-20%", ease: "none" }, 0)
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative">
      <div className="hero h-screen w-full relative overflow-hidden">

        {/* Layer 1 — static background photo */}
        <img
          src="https://dropedition.com/images/hero5.jpg"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: 1 }}
        />

        {/* Layer 2 — same image as bg, element fixed, image drifts via backgroundPositionY */}
<div
  ref={scrollImgRef}
  className="absolute inset-0 w-full h-full"
  style={{
    zIndex: 2,
    backgroundImage: `url(https://dropedition.com/images/hero5.jpg)`,
    backgroundSize: "cover",
    backgroundPosition: "center 0%",
    WebkitMaskImage: `url('/rawform-mask.png'), linear-gradient(black, black)`,
    WebkitMaskComposite: "xor",
    WebkitMaskSize: "cover",        // ← was "100% 100%", this maintains aspect ratio
    WebkitMaskPosition: "center",   // ← centers the mask
    maskImage: `url('/rawform-mask.png'), linear-gradient(black, black)`,
    maskComposite: "exclude",
    maskSize: "cover",              // ← same
    maskPosition: "center",         // ← same
  }}
/>

        {/* Layer 3 — plain white div, fades in on scroll */}
        <div
          ref={whiteRef}
          className="absolute inset-0 bg-white"
          style={{ zIndex: 3, opacity: 0 }}
        />

      </div>

      <div className="h-screen bg-black flex items-center justify-center text-white text-3xl">
        Next Section
      </div>
    </div>
  );
}

export default App;