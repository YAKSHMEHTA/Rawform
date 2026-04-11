import "./App.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useState, useRef, useEffect } from "react";
gsap.registerPlugin(ScrollTrigger);

function App() {
  gsap.registerPlugin(ScrollTrigger);
  const textRef = useRef(null);
  const [blur,Setblur] = useState(0);

  const updateBlur = (n)=>{  
    Setblur(n)
  }
  let obj = {val:0}
useEffect(() => {

  gsap.to(obj,{
    val : 0.6,
    scrollTrigger:{
      markers:true,
      trigger:".hero",
      start:"top top",
      end:"center top",
      scrub:1,
    },
    onUpdate:()=>{
      updateBlur(obj.val);
    }
  })

  gsap.fromTo(
    textRef.current,
    { backgroundPositionY: "50%" },   // fromVars — start state
    {                                  // toVars — end state + config
      backgroundPositionY: "-80%",
      fontSize:"25rem",
      ease: "none",
      scrollTrigger: {
       // markers: true,
        trigger: ".hero",
        start: "top top",
        end: "center top",
        scrub: 1,
      },
    }
  );
}, []);

  return (
    <div className="h-[200vh] relative overflow-hidden">
      <div
        className="h-screen hero w-full flex items-center justify-center"
        style={{
          backgroundImage: `url(https://dropedition.com/images/hero5.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="blur-div z-2 h-full w-full  top-0 absolute"
          style={{backgroundColor:`rgba(255, 255, 255, ${blur})`}}
        ></div>
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
