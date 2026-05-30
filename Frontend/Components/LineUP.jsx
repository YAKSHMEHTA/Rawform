import React from "react";
import Card from "./Card";

function LineUP() {
  const links = [["/hrpanel1.webp", "/hr2.webp", "/hrpanel2.webp","/hrpanel3.webp","himage-1.webp","himage4.jpg"]];

  return (
    <div className="bg-white lineup-par pb-50  ">
      <div className="h-[100vh] w-full relative flex gap-2 pt-30 px-15 bg-white overflow-hidden">
        <Card
          btn={true}
          ani={true}
          px={"+=1300px"}
          st={'top'}
          classname={"h-120 w-160 overflow-clip"}
          imgSrc={"/hrpanel1.webp"}
        />
        <Card
          btn={true}
          px={"+=1300px"}
          st={'bt'}
          ani={true}
          classname={"h-120 w-160 overflow-clip"}
          imgSrc={"/hr2.webp"}
        />
        <Card
          btn={true}
          st={'top'}
          px={"+=1300px"}
          ani={true}
          classname={"h-120 w-160 overflow-clip"}
          imgSrc={"/hrpanel2.webp"}
        />
        <Card
          btn={true}
          st={'bt'}
          px={"+=1300px"}
          ani={true}
          classname={"h-120 w-160 overflow-clip"}
          imgSrc={"/hrpanel3.webp"}
        />
      </div>
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
              px={"+=1300px"}
              ani={true}
              st={'top'}
              end={'bottom'}
              classname={"h-200 w-160 overflow-clip"}
              imgSrc={"/hrpanel1.webp"}
            />
          </div>
          
          <div className="w-full   bg-white pl-10 mt-20 pr-10 grid gap-6 grid-cols-3 grid-rows-2 bg-white">
            {links[0].map((element,idx) => {
              return (
                <Card
                ani={true}
                px={"+=1300px"}
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
    </div>
  );
}

export default LineUP;
