import "./App.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useState, useRef, useEffect } from "react";
gsap.registerPlugin(ScrollTrigger);
function App() {
  const textRef = useRef(null);

useEffect(() => {
  gsap.fromTo(
    textRef.current,
    { backgroundPositionY: "50%" },   // fromVars — start state
    {                                  // toVars — end state + config
      backgroundPositionY: "-80%",
      fontSize:"25rem",
      ease: "none",
      scrollTrigger: {
        markers: true,
        trigger: ".hero",
        start: "top top",
        end: "center top",
        scrub: 1,
      },
    }
  );
}, []);

  return (
    <div className="h-[200vh] relative">
      <div
        className="h-screen hero w-full flex items-center justify-center"
        style={{
          backgroundImage: `url(https://dropedition.com/images/hero5.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="blur-div z-2 h-full w-full  top-0 absolute"></div>
        <h1
          ref={textRef}
          className="hero-text z-100 font-black opacity-100 tracking-widest uppercase"
          style={{
            backgroundImage: `url(https://dropedition.com/images/hero5.jpg)`,
            backgroundSize: "100%", // match animation start
            backgroundPosition: "center",
            WebkitBackgroundClip: "text",
            backgroundAttachment: "fixed",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
          }}
        >
          RAWFORM
        </h1>

      </div>
    </div>
  );
}

export default App;
