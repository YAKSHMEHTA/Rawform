import React from 'react'

function Text() {
  return (
    <div className='w-full h-screen relative z-50  bg-gray-800 overflow-hidden'
    style={{zIndex:"99999",backgroundImage:`url(/text-bg.jpg)`}}>
        <p style={{letterSpacing: "15px",wordSpacing:"25px"}} >yaksh vardhan mehta</p>
    </div>
  )
}

export default Text
