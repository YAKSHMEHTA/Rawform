import React from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Footer() {
  return (
    <div className="h-[130vh] w-full relative pt-20 ">
      <video
        className="absolute top-0 left-0 h-full w-full object-cover"
        src="https://dropedition.com/videos/footer-video.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
      <div className="absolute   h-full w-full py-20 px-20  top-0 left-0">
        <div className="bg-white/20 backdrop-blur-lg border border-white/20 h-full w-full">
          <div className="w-full py-20 flex gap-20 px-20">
            <div className="drops">
              <h2 className=" text-4xl">DROPS</h2>
              <div className="w-full pt-10 gap-4 flex flex-col ">
                <a href="">Drop 6</a>
                <a href="">Drop 6</a>
              </div>
            </div>
            <div className="STORES">
              <h2 className=" text-4xl">STORES</h2>
              <div className="w-full gap-4 pt-10 flex flex-col ">
                <a href="">H.LORENZO</a>
                <a href="">CURVE</a>
              </div>
            </div>
            <div className="INFORMATION">
              <h2 className=" text-4xl">INFORMATION</h2>
              <div className="w-full gap-4 pt-10 flex flex-col ">
                <a href="">Contact</a>
                <a href="">Return and Refunds</a>
                <a href="">Privacy Policy</a>
                <a href="">Terms of Service</a>
              </div>
            </div>
            <div className="INFORMATION">
              <h2 className=" text-4xl">ABOUT</h2>
              <div className="w-full gap-4 pt-10 flex flex-col ">
                <b>
                  <p>
                    This website is a personal educational and reverse
                    engineering project created solely for learning,
                    experimentation, and development practice. It is not a real
                    eCommerce platform and does not process actual orders,
                    payments, or commercial transactions.
                  </p>
                </b>
                <b>
                  <p>
                    Any products, prices, payment pages, or checkout flows
                    displayed on this website are for demonstration purposes
                    only. Please do not attempt to make real purchases or submit
                    sensitive financial information.
                  </p>
                </b>
                <b>
                  <p className="bold">
                    This project was built to explore concepts related to web
                    development, UI/UX design, backend architecture, APIs,
                    authentication, databases, and scalable eCommerce systems.
                  </p>
                </b>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
