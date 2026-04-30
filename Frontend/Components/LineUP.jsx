import React from 'react'
import Card from './Card'

function LineUP() {
  return (
    <div className='h-[90vh] gap-2 relative flex p-35  bg-cyan-900'>
      <Card classname={'h-96 w-80 overflow-clip'} imgSrc={'/text-bg.jpg'}></Card>
      <Card classname={'h-96 w-80 overflow-clip'} imgSrc={'/hr2.webp'}></Card>
      <Card classname={'h-96 w-80 overflow-clip'} imgSrc={'/hr1.webp'}></Card>
      <Card classname={'h-96 w-80 overflow-clip'} imgSrc={'/hr1.webp'}></Card>
    </div>
  )
}

export default LineUP
