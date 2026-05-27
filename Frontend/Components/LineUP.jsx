import React from "react";
import Card from "./Card";

function LineUP() {
  const links = [["/hrpanel1.webp", "/hr2.webp", "/hrpanel2.webp","/hrpanel3.webp","himage-1.webp","himage4.jpg"]];

  return (
    <>
      <div className="h-[100vh] w-full relative flex gap-2 pt-30 px-15 bg-white overflow-hidden">
        <Card
          btn={true}
          ani={true}
          st={'top'}
          classname={"h-120 w-160 overflow-clip"}
          imgSrc={"/hrpanel1.webp"}
        />
        <Card
          btn={true}
          st={'bt'}
          ani={true}
          classname={"h-120 w-160 overflow-clip"}
          imgSrc={"/hr2.webp"}
        />
        <Card
          btn={true}
          st={'top'}
          ani={true}
          classname={"h-120 w-160 overflow-clip"}
          imgSrc={"/hrpanel2.webp"}
        />
        <Card
          btn={true}
          st={'bt'}
          ani={true}
          classname={"h-120 w-160 overflow-clip"}
          imgSrc={"/hrpanel3.webp"}
        />
      </div>
      <div className="relative h-screen w-full bg-white">
        <div className="h-20 w-full relative overflow-hidden">
          <div className="h-full w-[50%] absolute top-0 left-0 bg-white-700 flex items-center px-4">
            <h3 className="text-white font-bold">DROP EDITION</h3>
          </div>
          <div className="h-full w-[50%] absolute top-0 right-0 bg-white-700 flex items-center px-4">
            <h3 className="text-white font-bold">DROP EDITION</h3>
          </div>
        </div>

        <div className="h-full w-full flex relative">
          <div className="flex pl-10  ">
            <Card
              btn={true}
              ani={true}
              st={'top'}
              end={'bottom'}
              classname={"h-200 w-160 overflow-clip"}
              imgSrc={"/hrpanel1.webp"}
            />
          </div>
          <div className="w-full h-full py-10 pl-10 mt-20 pr-10 grid gap-6 grid-cols-3 grid-rows-2 bg-white-800">
            {links[0].map((element,idx) => {
              return (
                <Card
                ani={true}
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
    </>
  );
}

export default LineUP;
