import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import axios from "axios";
import Card from "./Card";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function LineUP() {
  const [detail, setDetail] = useState({});

  const links = [
    [
      "/hrpanel1.webp",
      "/hr2.webp",
      "/hrpanel2.webp",
      "/hrpanel3.webp",
      "himage-1.webp",
      "himage4.jpg",
    ],
  ];

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get("http://localhost:8080/shop?drop=2");
      setDetail(data[0]);
      console.log(detail);
      console.log("data :", data);
    };
    getData();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".lineup-par",
          markers: true,
          id: "line",
          start: "top 75%",

        },
      });

      tl.fromTo(
        ".Lineup-card",
        {
          clipPath: "inset(0 0 100% 0)",
        },
        {
          clipPath: "inset(0 0 0% 0)",
          ease: "power4.out",
          duration: 1,
          stagger: 0.25,
        },
      );
    });
    return () => ctx.revert();
  },[]);

  const [widthSmall, setWidthSmall] = useState(
    window.innerWidth < 750 ? true : false,
  );

  return (
    <div className="bg-white relative lineup-par pb-50 w-full  ">
      <h2 className="bg-white px-5 pt-11 font">
        THE BIGGEST LINUP IN THE TOWN
      </h2>
      <div className="h-[100vh] w-full lineup1 relative lineup-cnt flex gap-2 pt-8 px-10 bg-white max-2xl:h-125 overflow-hidden">
        <div className="Lineup-card h-full w-full">
          <Card
            btn={true}
            ani={false}
            px={"+=300px"}
            st={"top"}
            classname={"h-full w-full overflow-clip"}
            imgSrc={"/hrpanel1.webp"}
          />
        </div>
        <div className="Lineup-card h-full w-full">
          <Card
            btn={true}
            px={"+=300px"}
            st={"bt"}
            ani={false}
            classname={"h-full w-full object-cover overflow-clip"}
            imgSrc={"/hr2.webp"}
          />
        </div>
        <div className="Lineup-card h-full w-full">
          <Card
            btn={true}
            st={"top"}
            px={"+=300px"}
            ani={false}
            classname={"h-full w-full overflow-clip"}
            imgSrc={"/hrpanel2.webp"}
          />
        </div>
        <div className="Lineup-card h-full w-full">
          <Card
            btn={true}
            st={"bt"}
            px={"+=300px"}
            ani={false}
            classname={"h-full w-full overflow-clip"}
            imgSrc={"/hrpanel3.webp"}
          />
        </div>
      </div>
      {!widthSmall ? (
        <div className=" h-screen w-full bg-white mb-30">
          <div className="h-20 w-full relative overflow-hidden">
            <div className="h-full w-[50%] absolute top-0 left-0 bg-white flex items-center px-4">
              <h3 className="text-white font-bold">DROP EDITION</h3>
            </div>
            <div className="h-full w-[50%] absolute top-0 right-0 bg-white flex items-center px-4">
              <h3 className="text-white font-bold">DROP EDITION</h3>
            </div>
          </div>

          <div className=" pb-70 w-full bg-white flex relative">
            <div className="flex pl-10  ">
              <Card
                btn={true}
                px={"+=300px"}
                ani={true}
                st={"top"}
                end={"bottom"}
                classname={"h-200 w-160 overflow-clip"}
                imgSrc={"/hrpanel1.webp"}
              />
            </div>

            <div className="w-full   bg-white pl-10 mt-20 pr-10 grid gap-6 grid-cols-3 grid-rows-2 bg-white">
              {links[0].map((element, idx) => {
                return (
                  <Card
                    ani={true}
                    px={"+=300px"}
                    st={idx % 2 === 0 ? "top" : "bottom"}
                    key={idx}
                    btn={false}
                    classname={"h-80 w-60 overflow-clip"}
                    imgSrc={element}
                  />
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full overflow-x-auto scrollbar-hide  bg-white">
          <div className="h-full flex gap-4 w-max scrollbar-hide py-4 px-4">
            {links[0].map((item, idx) => (
              <Card
                key={idx}
                imgSrc={item}
                classname={"h-80 w-60 shrink-0 scrollbar-hide overflow-clip"}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default LineUP;
