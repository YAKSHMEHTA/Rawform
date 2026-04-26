import React from "react";

function Text() {
  return (
    <div className="h-screen w-full relative   overflow-clip">
      <div
        className="trigger relative z-40 h-full  w-full felx flex-col
            justify-between px-40 py-25 max-xl:px-5
        "
      >
        <div className="w-full leading-none">
          <p
            className="heading-3 font-light whitespace-nowrap
         text-[#889E9E] max-sm:text-[1.125rem] "
          >
            .make yourself comfortable
          </p>
          <p
            className="heading-3 font-light whitespace-nowrap
         text-[#889E9E] max-sm:text-[1.125rem]"
          >
            trust your body and feel free
          </p>
          <p
            className="heading-3 font-light whitespace-nowrap
         text-[#889E9E] max-sm:text-[1.125rem]"
          >
            in every self manifestation+
          </p>
        </div>
        <div className="w-full h-full flex flex-col-reverse leading-none text-white text-[8rem] items-end ">
          <p
            className="heading-3 font-light whitespace-nowrap
          max-sm:text-[1.125rem]"
          >
            on classical
          </p>
          <p
            className="heading-3 font-light whitespace-nowrap
          max-sm:text-[1.125rem]"
          >
            elegance
          </p>
          <p
            className="heading-3 font-light whitespace-nowrap
          max-sm:text-[1.125rem]"
          >

            modern twist
          </p>
        </div>
      </div>

      <div className="absolute top-0 left-0 w-full h-full ">
        <img
          src="/text-bg.jpg"
          alt=""
          className="absolute top-0 left-0 h-full w-full object-cover "
          style={{
            transform: "translate3d(0px, 4.7215%, 0px) scale(1.2, 1.2)",
          }}
        />
      </div>
    </div>
  );
}

export default Text;
