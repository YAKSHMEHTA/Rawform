import React,{useRef} from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function Card({
  classname="",
  imgSrc,
}){
  const imgRef = useRef(null)
  function HandelEnter(){
    gsap.to(imgRef.current,{
      scale:1,
      duration:0.45,
      ease:"power3.out",
    })
  }

  function HandelLeave(){
    gsap.to(imgRef.current,{
      scale:1.1,
      duration:0.45,
      ease:"power3.out",
    })
  }

  return (
    <div className={classname}>
      <img ref={imgRef} src={imgSrc} onMouseLeave={HandelLeave} className='w-full h-full object-cover id scale-110' onMouseOver={HandelEnter} alt="" />
    </div>
  )
}

export default Card
