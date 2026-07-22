import React, { useEffect, useState } from "react";
import Card from "./Card";
import Lenis from "@studio-freight/lenis";
import { useParams ,Link} from "react-router-dom";
import gsap from "gsap";
import Btn from "./Btn";
import axios from "axios";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Shop() {
  const [products, setProducts] = useState([]);

  let arr = ["a", "b", "c", "d"];
  const { drop } = useParams();
  console.log(drop);
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
      <div className="h-60 h2-cnt w-full flex justify-center items-end">
        <h2 className="text-9xl">Shop</h2>
      </div>
      <div className="h-full w-full px-10 p-cnt  py-30 sm:px-0 sm:py-0">
        {products.map((item, idx) => {
          return (
            <div key={idx} className="h-full card-cnt w-full grid grid-cols-2 grid-rows-3 gap-4">
              <div className="h-220 c1 w-160 card">
              <Card
                btn={false}
                px={"-=500px"}
                ani={true}
                st={"top"}
                classname={"h-full w-full row-span-3  overflow-clip"}
                imgSrc={products[idx].images[0]}
              />
              </div>
              <div className="py-20 flex text flex-col gap-5">
                <h2 className="text-2xl">{products[idx].name}</h2>
                <h2 className="" >{products[idx].description}</h2>
                <Link to={`/shop/detail?slug=${products[idx].slug}`}  >  <Btn h={"4rem"} w={"16rem"} ></Btn> </Link>
              </div>
              <div className="h-220 c2 w-160 card">
              <Card
                btn={false}
                px={"-=300px"}
                ani={true}
                st={"top"}
                classname={"h-full w-full row-span-2 overflow-clip"}
                imgSrc={products[idx].images[1]}
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
