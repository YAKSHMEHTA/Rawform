import React from "react";

function Text() {
  return (
    <div
      className="w-full h-screen relative z-50 px-40 py-25 flex flex-col justify-between
      bg-gray-800 overflow-hidden"
      style={{
        zIndex: "99999",
        backgroundImage: `url(/text-bg.jpg)`,
        backgroundSize: "cover",
      }}
      
    >
      <div className="w-full">
        <p
          className="text-[#889E9E] max-sm:text-[1.125rem]"
          style={{ letterSpacing: "15px", wordSpacing: "25px" }}
        >
          .make yourself comfortable
        </p>
        <p style={{ letterSpacing: "15px", wordSpacing: "25px" }}>
          trust your body and feel free
        </p>
        <p style={{ letterSpacing: "15px", wordSpacing: "25px" }}>
          in every self manifestation+
        </p>
      </div>
    </div>
  );
}
<p class="heading-3 font-light whitespace-nowrap text-[#889E9E] max-sm:text-[1.125rem]">
  dwasd
</p>;
export default Text;
