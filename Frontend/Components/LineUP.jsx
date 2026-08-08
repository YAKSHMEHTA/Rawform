import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import axios from "axios";
import Card from "./Card";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function LineUP() {
  const [detail, setDetail] = useState({});
  const [drop1, setDrop1] = useState([]);
  const [drop2, setDrop2] = useState([]);
  const [dropNum, setDropNum] = useState(2);
  const [drop, setDrop] = useState([]);

  useEffect(() => {
    const link1 = [
      "https://res.cloudinary.com/dpjbpxxv4/image/upload/v1780932092/vsardofmza1mxp3cvrq1.webp",
      "https://res.cloudinary.com/dpjbpxxv4/image/upload/v1780932092/z5wpixe3erwacgxerdk2.webp",
      "https://res.cloudinary.com/dpjbpxxv4/image/upload/v1780932092/mtbd3xz5dkxkvobowkzy.webp",
      "https://res.cloudinary.com/dpjbpxxv4/image/upload/v1780932096/g6wuaw1nt2goaqrf5jgv.jpg",
      "https://res.cloudinary.com/dpjbpxxv4/image/upload/v1780932094/zojxawhtuyaua84prbmm.webp",
      "https://res.cloudinary.com/dpjbpxxv4/image/upload/v1780932095/oa4rdvc5hh8ngj3jmo2a.jpg",
    ];
    setDrop1(link1);
    const link2 = [
      "https://res.cloudinary.com/dpjbpxxv4/image/upload/v1780938591/cntd3ovjbt2bmhgboqg2.jpg",
      "https://res.cloudinary.com/dpjbpxxv4/image/upload/v1780938591/wjenr87vouder8fg0fc8.jpg",
      "https://res.cloudinary.com/dpjbpxxv4/image/upload/v1780938592/bvksebmivcnlj4dzirbq.jpg",
      "https://res.cloudinary.com/dpjbpxxv4/image/upload/v1780938592/lswztaadtzsazvk0u5z7.jpg",
      "https://res.cloudinary.com/dpjbpxxv4/image/upload/v1780938592/caawzp4dwuggzolxuefl.jpg",
      "https://res.cloudinary.com/dpjbpxxv4/image/upload/v1780938592/b6gs2fyeenk0shr04ibf.jpg",
    ];
    setDrop2(link2);
    setDrop(link1);
    console.log("drop", drop);
  }, []);

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
      const { data } = await axios.get(
        "https://rawform.onrender.com/shop?drop=2",
      );
      setDetail(data[0]);

      console.log("data :", data);
    };
    getData();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".lineup-par",
          //   markers: true,
          id: "line",
          start: "top 75%",
        },
      });

      tl.fromTo(
        ".Lineup-card",
        {
          clipPath: "inset(0 0 100% 0)",
          transformOrigin: "top",
        },
        {
          clipPath: "inset(0 0 0% 0)",
          ease: "power4.out",
          duration: 1,
          stagger: 0.25,
        },
      );

      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: ".lineup-par",
          //  markers: true,
          id: "line",
          start: "top 50%",
          end: "top top",
          scrub: 1.5,
        },
      });
      // tl2.fromTo(".card-img2",
      //     {y:0},
      //     {y:-80}
      //   )
    });
    return () => ctx.revert();
  }, []);

  const [widthSmall, setWidthSmall] = useState(
    window.innerWidth < 750 ? true : false,
  );

  return (
    <div className="bg-white max-md:pb-0   relative lineup-par pb-50 w-full  ">
      <h2 className="bg-white px-5 pt-11 font">
        THE BIGGEST LINUP IN THE TOWN
      </h2>
      <div className="h-[100vh] w-full lineup1 relative lineup-cnt flex gap-2 pt-8 px-10 bg-white max-2xl:h-125 overflow-hidden">
        <div className="Lineup-card overflow-hidden h-full w-full">
          <Card
            btn={true}
            ani={false}
            px={"+=300px"}
            st={"top"}
            classname={"h-full w-full card-img overflow-clip"}
            imgSrc={"/hrpanel1.webp"}
          />
        </div>
        <div className="Lineup-card h-full overflow-clip w-full">
          <Card
            btn={true}
            px={"+=300px"}
            st={"bt"}
            ani={false}
            classname={"h-full w-full card-img object-cover overflow-clip"}
            imgSrc={"/hr2.webp"}
          />
        </div>
        <div className="Lineup-card h-full w-full">
          <Card
            btn={true}
            st={"top"}
            px={"+=300px"}
            ani={false}
            classname={"h-full w-full card-img overflow-clip"}
            imgSrc={"/hrpanel2.webp"}
          />
        </div>
        <div className="Lineup-card h-full w-full">
          <Card
            btn={true}
            st={"bt"}
            px={"+=300px"}
            ani={false}
            classname={"h-full w-full card-img overflow-clip"}
            imgSrc={"/hrpanel3.webp"}
          />
        </div>
      </div>
      {!widthSmall ? (
        <div className=" h-screen w-full bg-white mb-30 ">
          <div className="h-20 w-full relative overflow-hidden">
            <div className="h-full w-[50%] absolute top-0 left-0 bg-white flex items-center px-4">
              <h3 className="text-white font-bold">DROP EDITION</h3>
            </div>
            <div className="h-full w-[50%] absolute top-0 right-0 bg-white flex items-center px-4">
              <h3 className="text-white font-bold">DROP EDITION</h3>
            </div>
          </div>
          <div className="w-full flex justify-between px-15 items-center py-10">
            <h2 className="font-[ABC_Whyte_Mono_Unlicensed_Trial] text-3xl">
              DROP
            </h2>
            <div className="w-1/2 flex gap-10">
              <button
              onClick={()=>setDropNum(1)}
                className={`font-[Mirtha_Display] cursor-pointer ${dropNum == 1 ? "text-[#47d7ac]" : "text-black"}  text-5xl`}
              >
                01
              </button>
              <button
              onClick={()=>setDropNum(2)}
                className={`font-[Mirtha_Display] cursor-pointer ${dropNum == 2 ? "text-[#47d7ac]" : "text-black"}  text-5xl`}
              >
                02
              </button>
            </div>
          </div>
          <div className=" pb-70 w-full bg-white flex relative">
            <div className="flex pl-10  ">
              <Card
                btn={true}
                px={"-=600px"}
                ani={true}
                st={"top"}
                end={"bottom"}
                classname={"h-200 w-160 overflow-clip"}
                imgSrc={ dropNum == 1 ?  "/hrpanel1.webp" : "https://cdn.shopify.com/s/files/1/0692/0214/9630/files/071225_DROP_EDITION_Look_12_1388_horizontal_1600x.jpg?v=1765893231"}
              />
            </div>

            <div className="w-full    bg-white pl-10 mt-20 pr-10 grid gap-6 grid-cols-3 grid-rows-2 ">
              {(dropNum == 1 ? drop1:drop2).map((element, idx) => {
                return (
                  <Card
                    ani={false}
                    px={"-=250px"}
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
        <div className="w-full  max-md:pb-10 max-md:pt-10 overflow-x-auto scrollbar-hide  bg-white">
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
