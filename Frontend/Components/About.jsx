import React from "react";


function About() {
  return (
    <div className="h-full abt w-full">
      <div className="h-[130vh] bg-gray-700 w-full flex overflow-hidden">
        <div className="h-full overflow-hidden relative w-1/2">
          <img
            src="Programmer Life.jpeg"
            className="object-fill absolute  -top-95"
            alt=""
          />
        </div>
        <div className="h-full w-1/2  bg-black flex flex-col pl-45 pt-55 ">
          <h3 className="text-white text-7xl font-extralight tracking-tight ">
            DROP IN
          </h3>
          <h3 className="text-white text-7xl font-extralight tracking-tight ">
            ANYTIME
          </h3>
          <p className="text-white font-extralight text-[1rem]">
            For custom web solutions, creative animations, or collaboration
            opportunities, feel free to get in touch. Let's build engaging
            digital experiences together.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
