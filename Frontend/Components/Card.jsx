import React from 'react'

function Card({
    classname="",
    imgSrc,


}) {
  return (
    <div className={classname}>
      <img src={imgSrc} className='object-cover scale-110' alt="" />
    </div>
  )
}

export default Card
