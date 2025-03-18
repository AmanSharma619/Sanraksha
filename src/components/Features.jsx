import React from 'react'
import "./Features.css"
import { useEffect,useState } from 'react'
import Safezones from "./Safezones.jsx"
import Feedback from './Feedback.jsx'
import Heatmaps from "./Heatmaps.jsx"
import { Link } from 'react-router-dom'
const Features = () => {
  useEffect(()=>{
   var t=gsap.timeline()
   t.from("#first",{width:"0px",duration:0.8,opacity:0})
   t.from("#second",{height:"0px",duration:0.8,opacity:0})
   t.from("#fifth",{height:"0px",duration:0.8,opacity:0})
   t.from("#fourth",{ scaleX: 0,duration:0.8,opacity:0,  transformOrigin: "100% 50%"})
   t.from("#third",{ scaleX: 0,duration:0.8,opacity:0,  transformOrigin: "100% 50%"})
  },[])
  useEffect(() => {
    let a = confirm("Sanraksha wants to know your location");
    if (a) {
        initMap();
    }
}, []);

const [position,set_position]=useState(null);
useEffect(()=>{
  if(position){
    console.log("position is",position);
    
  }
},[position])

function getlocation() {
  console.log("get location");
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
          (position) => {
              const pos={
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
              };
              set_position(pos)
          },
          () => {
              console.error("Error fetching location");
          }
      );
  } else {
      console.error("Geolocation not supported");
  }
}

async function initMap() {
  console.log("init map");
  const { Map } = await google.maps.importLibrary("maps");
  const map = new Map(document.getElementById("map1"), {
      center: { lat: 28.6893, lng: 77.2920 },
      zoom: 11,
      mapId: "498661eafe8ce553",
  });
  getlocation();
}
  return (
    <div
    class="flex min-h-screen w-full flex-col items-center justify-center rounded-lg p-6"
  >
       <div id="map1" className='hidden' />
    <h1 className='text-white mb-9'>Safety Dashboard</h1>
    <div class="grid h-full w-full grid-cols-3 grid-rows-6 gap-4">
      <div class="col-span-2 row-span-3 rounded-3xl box " id='first'>
        
      {position ? <Safezones lat={position.lat} lng={position.lng} /> : <p>Loading location...</p>}
      </div>
      <div class="row-span-4 rounded-3xl box" id='second'>

      </div>
      <div class="row-span-3 rounded-3xl box" id='third'>
      {position ? <Heatmaps lat={position.lat} lng={position.lng} /> : <p>Loading location...</p>}
      </div>
      <div class="row-span-3 rounded-3xl box" id='fourth'>
     
      </div>
      <div className="row-span-2 rounded-3xl box relative" id="fifth">
  <img src="/Feedback.png" className="w-full h-full object-cover rounded-3xl" alt="" />
  <Link to="/feedback">
  <div className="cover h-full w-full absolute top-0 left-0 z-10 rounded-3xl text-white">
    Community Feedback
    
  </div>
  </Link>
</div>

    </div>
    
  </div>
  )
}

export default Features