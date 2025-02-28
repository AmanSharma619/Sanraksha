import React, { useEffect, useState } from 'react'
const Heatmap = () => {
  useEffect(() => {
    let a = confirm("Sanraksha wants to know your location")
    if (a == 1) {
      initMap()
    }
  }, [])
  const [district,set_district]=useState('')
  let currposition;
  let d, s_i;
  let map, infoWindow;

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
          currposition=pos
          await delay()
           setvalues()
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
    
    console.log("get data");
    console.log(currposition);
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
    let safety_i = a.safety_index
    return [district, safety_i]

  }

  async function style_setter() {
    console.log("style setter");
    
    function setStyle(/* FeatureStyleFunctionOptions */ params) {
      const datasetFeature = params.feature;
      const district_names =
        datasetFeature.datasetAttributes["district"];
      switch (district_names) {
        case d: // Color undeveloped areas blue.
          if (s_i > 0.90) {
            return {
              strokeColor: "green",
              strokeWeight: 2,
              strokeOpacity: 1,
              fillColor: "green",
              fillOpacity: 0.7,
            };
            break;
          }
          else if (0.75 <= s_i < .90) {
            return {
              strokeColor: "yellow",
              strokeWeight: 2,
              strokeOpacity: 1,
              fillColor: "yellow",
              fillOpacity: 0.7,
            };
            break;
          }
          else {
            return {
              strokeColor: "red",
              strokeWeight: 2,
              strokeOpacity: 1,
              fillColor: "red",
              fillOpacity: 0.7,
            };
            break;
          }
      }
    }
    const datasetLayer = await map.getDatasetFeatureLayer("87124945-0548-4444-aca3-2d823caac0f7");
    datasetLayer.style = setStyle;
  }
  const delay = () => {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res()
      }, 3000);
    })
  }
  async function setvalues() {
    console.log(currposition);
    
    let a = await get_data()
    d = await a[0]
    set_district(d)
    s_i = await a[1]
    style_setter(map)

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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">


      <div className="absolute inset-0 z-10 bg-gradient-to-b from-clr5 via-clr4 to-clr5 opacity-100 flex flex-col items-center justify-center text-clr1 font-bold ">
        <div className="mx-auto h-6 flex text-clr1 text-2xl font-bold mb-5 items-center mt-5 p-4 items-center">
          Your District is <span className='text-clr2 text-3xl font-bold underline ml-2'> {district || "Fetching..."}</span>
        </div>
        <div id="map" className="mx-auto rounded-xl h-2/3 w-2/3" />
        <div className="mx-auto h-6 flex text-clr1 text-xl font-bold mb-3 items-center mt-3 justify-center">
          <div className="bg-red-600 w-8 h-7 ">

          </div>

          - Generally not that safe
        </div>
        <div className="mx-auto h-6 flex text-clr1 text-xl font-bold mb-3 items-center mt-3">
          <div className="bg-yellow-500 w-8 h-7 ">

          </div>

          - Generally moderately safe
        </div>
        <div className="mx-auto h-6 flex text-clr1 text-xl font-bold mb-3 items-center mt-3">
          <div className="bg-green-600 w-8 h-7 ">

          </div>

          - Generally safe
        </div>






      </div>




    </div>

  )
}

export default Heatmap