import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import Btn from "./Btn";
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
  const myRef = useRef(null);
  const [qty, setQty] = useState(1);
  const [bool, setBool] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchParams] = useSearchParams();
  const slug = searchParams.get("slug");
  const [detail, setDetail] = useState({});
  const [imgurl, setImgUrl] = useState([]);
  const [size, setSize] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [width, setWidth] = useState(window.innerWidth);
  const arr = [];
  let productId = "";
  useEffect(() => {
    console.log("myRef", myRef);
    const rect = myRef.current.getBoundingClientRect();
    console.log("myRef rect", rect.bottom);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `http://localhost:8080/shop/detail?slug=${slug}`,
      );
      productId = data[0]._id;
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

  useEffect(() => {
    const change = () => {
      gsap.to(".info", {
        position:'sticky',
        duration:1,
      });

      const div2 = document.querySelector(".info");

      // div2.style.position = "sticky";
    };

    gsap.to(".info", {
      scrollTrigger: {
        trigger: ".detail",
        start: "top bottom",
        onUpdate: (self) => {
          console.log(self.progress);
          if (self.progress >= 0.762) {
            change();
          }
        },
      },
    });
  });

  const handelClick = (idx) => {
    console.log("clicked ");
    setActiveIndex(activeIndex === idx ? null : idx);
  };

  const increment = () => {
    if (qty === detail.stock) return;
    setQty((prev) => prev + 1);
  };
  const decrement = () => {
    if (qty <= 1) return;
    setQty((prev) => prev - 1);
  };

  const handelAdd = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      "http://localhost:8080/addtocart",
      { slugg: slug, qty: qty, size: size },
      { withCredentials: true },
    );
    console.log(res);
  };

  return (
    <>
      <div className="py-35 flex  z-50 detail">
        <div className="w-1/2 img-cnt relative h-[200vh]" ref={containerRef}>
          {/* {detail.images[0]} */}
          {detail.images?.map((item, idx) => {
            return (
              <img
                ref={(el) => (imgRefs.current[idx] = el)}
                src={item}
                key={idx}
                className={`w-full  object-cover img`}
                alt=""
                style={{ clipPath: "(0 100% 0 0)" }}
              />
            );
          })}
        </div>
        <div className="w-1/2 px-40 details py-5  ">
          <div className="w-full   ">
            {isMobile === false ? (
              <h3 className="uppercase ">
                DROP {detail.drop} THE {detail.name}
              </h3>
            ) : null}
            <div className="flex  flex-col px-5 gap-1 py-10">
              {arr.map((item, idx) => {
                return (
                  <>
                    <div className="flex justify-between">
                      <p onClick={() => {handelClick(idx)}} className="head hover:cursor-grabbing  uppercase">{arr2[idx]}</p>
                      <button
                        ref={myRef}
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
                      className="cnt overflow-hidden myDiv target"
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
            <div
              className={` info card w-full left-0 px-1 py-2 max-sm:px-0 max-sm:w-full `}
            >
              {isMobile ? (
                <h3 className="uppercase ">
                  DROP {detail.drop} THE {detail.name}
                </h3>
              ) : null}
              <div className="w-full flex items-end justify-end">
                <p className="relative text-[0.65rem] qty ">Quantity</p>
              </div>
              <div className="w-full  flex justify-between  items-center align-middle ">
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
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <p className="font-[300] text-[1.2rem]">Size</p>
                <div className="">
                  {["X", "M", "L"].map((item, idx) => {
                    return (
                      <button
                        key={idx}
                        onClick={() => setSize(item)}
                        className=""
                        style={{
                          height: "2rem",
                          width: "2rem",
                          border: "1px solid black",
                        }}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="py-5">
                <div onClick={handelAdd}>
                  <Btn h={"3rem"} w={"full"} text={"Add to Cart"}></Btn>
                </div>
                <p className="text-[0.6rem] pt-2">
                  Disclaimer: Taxes & shipping calculated at checkout.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[200vh] w-full"></div>
    </>
  );
}

export default Detail;
