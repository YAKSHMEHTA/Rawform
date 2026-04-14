import "./App.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef, useEffect } from "react";
import Demo from "../Components/Demo";
gsap.registerPlugin(ScrollTrigger);

function App() {
  const textRef = useRef(null);
  const blurRef = useRef(null);

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
      });

      tl.to(
        blurRef.current,
        {
          backgroundColor: "rgba(255,255,255,0.7)",
          ease: "none",
        },
        0,
      );

      tl.fromTo(
        textRef.current,
        { backgroundPositionY: "50%", fontSize: "14rem" },
        {
          backgroundPositionY: "-12%",
          backgroundSize: "90%",
          fontSize: "21rem",
          ease: "power1.out",
        },
        0,
      )

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
    <div
      className="hero h-screen w-full flex items-center justify-center overflow-hidden relative"
      style={{
        backgroundImage: `url(https://dropedition.com/images/hero5.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div
        ref={blurRef}
        className="absolute top-0 left-0 w-full h-full z-[2]"
        style={{ backgroundColor: "rgba(255,255,255,0)" }}
      />

      <h1
        ref={textRef}
        className="z-[10] font-black tracking-widest uppercase text-center"
        style={{
          backgroundImage: `url(https://dropedition.com/images/hero5.jpg)`,
          backgroundSize: "127.92%",
          backgroundPosition: "center 50%",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
          color: "transparent",
        }}
      >
        RAWFORM
      </h1>
    </div>

      <Demo className="next"></Demo>

  </div>
);
}

export default App;
