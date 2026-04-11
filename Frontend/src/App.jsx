import "./App.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef, useEffect } from "react";
gsap.registerPlugin(ScrollTrigger);

function App() {
  const textRef = useRef(null);
  const blurRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "+=1500",
          scrub: true,
          pin: true,
        },
      });

      tl.to(blurRef.current, {
        backgroundColor: "rgba(255,255,255,0.6)",
        ease: "none",
      }, 0);

      tl.fromTo(textRef.current,
        { backgroundPositionY: "50%", fontSize: "14rem" },
        { backgroundPositionY: "-30%",backgroundSize: "100%",fontSize: "21rem", ease: "none" },
      0);
    });

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
        {/* rgba overlay */}
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

      <div className="h-screen bg-black flex items-center justify-center text-white text-3xl">
        Next Section
      </div>
    </div>
  );
}

export default App;