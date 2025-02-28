import React from 'react'
import { useState,useEffect } from 'react';
const RecentCrimes = () => {
    const [currposition,set_position]=useState(null)
    const [district,set_district]=useState(null)
    const [recentnews,set_news]=useState([
      {
        date: "null",
        time: null
      }
    ])
    let map,curr_position;
    useEffect(()=>{
        let a =confirm("Sanraksha wants to know your location")
        if(a){
            initMap()
        }
    },[])
    useEffect(()=>{
        if(currposition){
           get_data()
           
        }
    },[currposition])
   
    function getlocation() {
        console.log("get location");
        const geocoder = new google.maps.Geocoder();
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
           async (position) => {
              const pos= {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };
              setvalues(pos)
            },
            () => {
              handleLocationError(true, infoWindow, map.getCenter());
            }
          );
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
    }
    async function get_data() {
    
        let loc = await {
          latitude: 28.6417,
          longitude:77.1225
        }
        const response = await fetch("http://127.0.0.1:5000/predict", {
          method: "POST",
          body: JSON.stringify(loc),
          headers: {
            "Content-Type": "application/json",
          },
        })
        let a = await response.json()
        let district = a.district
        set_district(district)
        let b= {
          location : district
        }
        const response2 = await fetch("http://127.0.0.1:5000/news", {
          method: "POST",
          body: JSON.stringify(b),
          headers: {
            "Content-Type": "application/json",
          },
        })
        let news=await response2.json()
        set_news(news)
        console.log(news);
        
        
        
    
      }
    async function setvalues(pos){    
        set_position(pos)
    }
    async function initMap() {
        console.log("init map");
        const { Map } = await google.maps.importLibrary("maps");
        map = await new Map(document.getElementById("map"), {
          center: { lat: 28.6893, lng: 77.2920 },
          zoom: 11,
          // mapTypeId: 'satellite',
          mapId: "498661eafe8ce553",
        });
        getlocation()
        
      }
      const delay = () => {
        return new Promise((res, rej) => {
          setTimeout(() => {
            res()
          }, 1000);
        })
      }
      
  return (
    <>
    <div id="map" className='hidden'></div>
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">


      <div className="absolute inset-0 z-10 bg-gradient-to-b from-clr5 via-clr4 to-clr5 opacity-100 flex flex-col items-center justify-center text-clr1 font-bold ">
        <div className="mx-auto h-6 flex text-clr1 text-2xl font-bold mb-5 items-center mt-5 p-4 items-center">
          Fetching recent crime news in <span className='text-clr2 text-3xl font-bold underline ml-2'> { district || "..."}</span>
        </div>
       
      <div className='news w-full h-14 bg-black text-white'>{recentnews[0].date || "wait"}</div>
      {/* <div className='news w-full h-14 bg-black text-white'>{recentnews[0].time || "wait"}</div>
      <div className='news w-full h-14 bg-black text-white'>{recentnews[0].title || "wait"}</div>
      <div className='news w-full h-14 bg-black text-white'>{recentnews[0].link || "wait"}</div> */}






      </div>




    </div>

    </>
  )
}

export default RecentCrimes