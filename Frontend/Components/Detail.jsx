import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import Btn from './Btn'
import Lenis from "@studio-freight/lenis";
import { useParams, Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Detail() {
  const imgRefs = useRef([]);
  const containerRef = useRef(null);
  const contentRef = useRef([]);
  const arrowRef = useRef([]);
  const [qty, setQty] = useState(1);
  const [bool, setBool] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchParams] = useSearchParams();
  const slug = searchParams.get("slug");
  const [detail, setDetail] = useState({});
  const [imgurl, setImgUrl] = useState([]);
  const arr = [];
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `http://localhost:8080/shop/detail?slug=${slug}`,
      );
      console.log(data[0]._id);
      setDetail(data[0]);
      setImgUrl(data[0].images);
    };
    fetchData();
  }, [slug]);

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

  useLayoutEffect(() => {
    const images = gsap.utils.toArray(".img");

    images.forEach((img) => {
      gsap.fromTo(
        img,
        {
          clipPath: "inset(0 100% 0 0)",
        },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.6,
          ease: "power3.inOut",
          stagger: 0.2,
          scrollTrigger: {
            trigger: img,
            start: "top 80%",
          },
        },
      );
    });
  }, [detail]);
  const arr2 = ["description", "material", "fit", "shipping", "return"];
  arr.push(detail.description);
  arr.push(detail.material);
  arr.push("Model is 5'11 / 180cm, wearing size one size.");
  arr.push("Items typically ship within 3-5 business days within the US.");
  arr.push(
    "DROP EDITION offers one free exchanges and returns on all orders. For terms and conditions see EXCHANGES & RETURNS",
  );


  useEffect(() => {
    contentRef.current.forEach((cnt, idx) => {
      const tl = gsap.timeline();
      tl.to(cnt, {
        opacity: activeIndex === idx ? 1 : 0,
        duration: 0.5,
        ease: "power2.out",
      });
      tl.to(
        cnt,
        {
          height: activeIndex === idx ? "auto" : 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.1",
      );

      gsap.to(arrowRef.current[idx], {
        rotation: activeIndex === idx ? 90 : 0,
        duration: 0.5,
        ease: "power2.in",
      });
    });
  }, [activeIndex]);

  const handelClick = (idx) => {
    setActiveIndex(activeIndex === idx ? null : idx);
  };

  const increment = () => {
    if(qty === detail.stock) return;
    setQty((prev) => prev + 1);
  };
  const decrement = ()=>{
    if(qty <= 1) return;
    setQty((prev) => prev - 1);
  }

  const handelAdd = () => {

  }

  return (
    <>
    <div className="py-35 flex detail">
      <div className="w-1/2" ref={containerRef}>
        {/* {detail.images[0]} */}
        {detail.images?.map((item, idx) => {
          return (
            <img
              ref={(el) => (imgRefs.current[idx] = el)}
              src={item}
              key={idx}
              className="w-full object-cover img"
              alt=""
              style={{ clipPath: "(0 100% 0 0)" }}
            />
          );
        })}
      </div>
      <div className="w-1/2 px-40  py-5  ">
        <div className="w-70 fixed  ">
          <h3 className="uppercase">
            DROP {detail.drop} THE {detail.name}
          </h3>
          <div className="flex flex-col gap-1 py-10">
            {arr.map((item, idx) => {
              return (
                <>
                  <div className="flex justify-between">
                    <p className="head  uppercase">{arr2[idx]}</p>
                    <button
                      onClick={() => {
                        handelClick(idx);
                      }}
                    >
                      <b>
                        <p
                          className="arrow"
                          ref={(el) => {
                            arrowRef.current[idx] = el;
                          }}
                        >
                          {" "}
                          {`>`}{" "}
                        </p>
                      </b>
                    </button>
                  </div>
                  <div
                    className="cnt overflow-hidden"
                    ref={(el) => {
                      contentRef.current[idx] = el;
                    }}
                  >
                    {item}
                  </div>
                </>
              );
            })}
          </div>
          <div className="w-full ">
            <p className="relative text-[0.65rem] -right-58">Quantity</p>
            <div className="w-full  flex justify-between items-center align-middle ">
              <div className="pt-4">
                <p className="font-[300] text-[1.2rem]">
                  ${qty * detail.price} USD
                </p>
              </div>
              <div className="flex items-center">
                <button
                  className=""
                  style={{
                    height: "2rem",
                    width: "2rem",
                    border: "1px solid black",
                  }}
                  onClick={decrement}
                >
                  -
                </button>
                <button
                  className="k"
                  style={{
                    height: "2rem",
                    width: "2rem",
                    border: "1px solid black",
                  }}
                >
                  {qty}
                </button>
                <button
                  className="k "
                  onClick={increment}
                  style={{
                    height: "2rem",
                    width: "2rem",
                    border: "1px  solid black",
                  }}
                >+
                </button>
              </div>
            </div>
            <div className="py-5">
                   <Btn h={"3rem"} w={"full"} text={"Add to Cart"}  >Add to Cart</Btn>
                   <p className="text-[0.6rem] pt-2">Disclaimer: Taxes & shipping calculated at checkout.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="h-screen w-full bg-amber-400"></div>
    <div className="h-screen w-full bg-cyan-700"></div>
    <div className="h-screen w-full bg-red-700"></div>
    </>
  );
}

export default Detail;
