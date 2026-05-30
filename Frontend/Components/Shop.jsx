import React,{useEffect} from "react";
import Card from "./Card";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Shop() {

useEffect(() => {
    const lenis = new Lenis({ duration: 1.8 });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

 let l = "https://cdn.shopify.com/s/files/1/0692/0214/9630/files/112225_Drop_Edition_Look_10_1026_horizontal_1600x.jpg?v=1765964434"
  return (
    <div className="h-full w-full">
      <div className="h-60 w-full flex justify-center items-end  ">
        <h2 className="text-9xl">Shop</h2>
      </div>
      <div className="h-full w-full px-10  py-30">
        <div className="h-full w-full grid grid-cols-2 grid-rows-3 gap-4">
          <Card
          btn={false}
          px={"-=300px"}
          ani={true}
          st={'top'}
          classname={"h-220 w-160 row-span-3  overflow-clip"}
          imgSrc={l}
        />
        <h2 className="">yaksh</h2>
         <Card
          btn={false}
          px={"-=300px"}
          ani={true}
          st={'top'}
          classname={"h-220 w-160 row-span-2 overflow-clip"}
          imgSrc={"/hrpanel1.webp"}
        />
        </div>
      </div>
    </div>
  );
}

export default Shop;
