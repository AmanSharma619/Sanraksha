import React from 'react'
import { useState,useEffect } from 'react';
const RecentCrimes = () => {
    const [currposition,set_position]=useState(null)
    const [district,set_district]=useState(null)
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
    </>
  )
}

export default RecentCrimes