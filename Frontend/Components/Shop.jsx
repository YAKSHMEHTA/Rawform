import React, { useEffect, useState } from "react";
import Card from "./Card";
import Lenis from "@studio-freight/lenis";
import { useParams, Link } from "react-router-dom";
import gsap from "gsap";
import Btn from "./Btn";
import axios from "axios";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Shop() {
  const [products, setProducts] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  let arr = ["a", "b", "c", "d"];
  const { drop } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `http://localhost:8080/shop?drop=${drop}`,
      );
      setProducts(data);
    };
    fetchData();
  }, [drop]);

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

  return (
    <div className="h-full shop w-full">
      <div className="h-40 sm:h-60 h2-cnt w-full flex justify-center items-end">
        <h2 className="text-5xl sm:text-7xl md:text-9xl">Shop</h2>
      </div>
      <div className="h-full w-full par-c px-10 p-cnt py-30 sm:px-0 sm:py-0">
        {products.map((item, idx) => {
          return (
            <div
              key={idx}
              className="h-full card-cnt w-full grid grid-cols-1 sm:grid-cols-2 sm:grid-rows-3 gap-4"
            >
              <div className={`c1 card ${isMobile ? '12rem' : 'w-full' } ${isMobile ? '31rem' : 'w-full' } sm:h-220 sm:w-160 sm:row-span-3`}>
                <Card
                  btn={false}
                  px={"-=500px"}
                  ani={true}
                  st={"top"}
                  classname={"h-full w-full overflow-clip"}
                  imgSrc={item.images[0]}
                />
              </div>

              <div className="text py-6 c3 sm:py-20 flex flex-col gap-5">
                <h2 className="text-2xl">{item.name}</h2>
                <h2>{item.description}</h2>
                <Link to={`/shop/detail?slug=${item.slug}`}>
                  <Btn h={"4rem"} w={"16rem"} />
                </Link>
              </div>

              <div className="c2 card w-full h-auto sm:h-220 sm:w-160 sm:row-span-2">
                <Card
                  btn={false}
                  px={"-=300px"}
                  ani={true}
                  st={"top"}
                  classname={"h-full w-full overflow-clip"}
                  imgSrc={item.images[1]}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Shop;