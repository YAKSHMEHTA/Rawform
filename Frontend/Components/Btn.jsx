import React,{useState,useEffect} from 'react'
import gsap from 'gsap'

function Btn({h,w,text}) {
    const handelEnter = (e) =>{
        const btn = document.getElementById("btn");
        gsap.to(e.currentTarget,{
            backgroundColor:"#47d7ac",
            color:"black",
            duration:0.3,
            ease:"power1.inOut"
        })
    }
        const handelLeave = (e) =>{
        const btn = document.getElementById("btn");
        gsap.to(e.currentTarget,{
            backgroundColor:"black",
            color:"white",
            duration:0.3,
            ease:"power1.inOut"
        })
    }
  return (
    <>
        <button onMouseEnter={handelEnter} onMouseLeave={handelLeave} 
        className="bg-black text-white  btn" id='btn' style={{height:h,width:w}} > {text || "view details"}</button>
    </>
  )
}

export default Btn
