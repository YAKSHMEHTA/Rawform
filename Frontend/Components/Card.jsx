import React,{useRef} from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function Card({
  classname="",
  imgSrc,
  btn,
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
    <div className={ ` relative ${classname}`}>
      <img ref={imgRef} src={imgSrc} onMouseLeave={HandelLeave} 
      className='w-full h-full object-cover id scale-110' 
      onMouseOver={HandelEnter} alt="" />
      { btn && <button 
      className='bg-cyan-700 absolute bottom-2/12 left-1/2  -translate-x-1/2 z-50
        w-63 h-13'
      >BUY NOW</button>}
    </div>
  )
}

export default Card
