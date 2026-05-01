import React from 'react'
import Card from './Card'

function LineUP() {
  return (
    <div className='h-screen w-full gap-2 relative pt-30 flex px-20  bg-white'>
      <Card btn={`true`} classname={'h-120 w-160 overflow-clip'} imgSrc={'/hrpanel1.webp'}></Card>
      <Card btn={`true`} classname={'h-120 w-160 overflow-clip'} imgSrc={'/hr2.webp'}></Card>
      <Card btn={`true`} classname={'h-120 w-160 overflow-clip'} imgSrc={'/hrpanel2.webp'}></Card>
      <Card btn={`true`} classname={'h-120 w-160 overflow-clip'} imgSrc={'/hrpanel3.webp'}></Card>
    </div>
  )
}

export default LineUP
