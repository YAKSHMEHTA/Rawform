import React from 'react'
import gsap from 'gsap'

function Navbar() {

  const NavColor = ()=>{
    gsap.to(".nav",{
      backgroundColor: "rgba(255,255,255,1)",
    })
  }

  const NavColor1 = ()=>{
    gsap.to(".nav",{
      backgroundColor: "rgba(255,255,255,0)",
    })
  }

  return (
    <div onMouseOver={NavColor} onMouseLeave={NavColor1} className='nav px-8 py-8 fixed w-full flex justify-between items-center z-10'>
      
      {/* Logo */}
      <div>
        <a href="">YAKSH</a>
      </div>

      {/* Center Links */}
      <div className="flex gap-15">
        <a href="">SHOP</a>
        <a href="">ABOUT</a>
        <a href="">CONTACT</a>
        <a href="">STOCKIST</a>
      </div>

      {/* Right Section */}
      <div className="flex gap-6">
        <a href="">BAG</a>
        <a href="">PROFILE</a>
      </div>

    </div>
  )
}

export default Navbar