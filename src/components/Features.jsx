import React from 'react'
import "./Features.css"
import { useEffect } from 'react'
const Features = () => {
  useEffect(()=>{
   var t=gsap.timeline()
   t.from("#first",{width:"0px",duration:0.8,opacity:0})
   t.from("#second",{height:"0px",duration:0.8,opacity:0})
   t.from("#fifth",{height:"0px",duration:0.8,opacity:0})
   t.from("#fourth",{ scaleX: 0,duration:0.8,opacity:0,  transformOrigin: "100% 50%"})
   t.from("#third",{ scaleX: 0,duration:0.8,opacity:0,  transformOrigin: "100% 50%"})
  },[])
  return (
    <div
    class="flex h-screen w-full flex-col items-center justify-center rounded-lg p-6"
  >
    <h1 className='text-white mb-9'>Safety Dashboard</h1>
    <div class="grid h-full w-full grid-cols-3 grid-rows-6 gap-4">
      <div class="col-span-2 row-span-3 rounded-3xl box" id='first'></div>
      <div class="row-span-4 rounded-3xl box" id='second'></div>
      <div class="row-span-3 rounded-3xl box" id='third'></div>
      <div class="row-span-3 rounded-3xl box" id='fourth'></div>
      <div class="row-span-2 rounded-3xl box" id='fifth'></div>
    </div>
  </div>
  )
}

export default Features