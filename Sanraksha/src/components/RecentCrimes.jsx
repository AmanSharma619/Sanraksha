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

      // const dummyNews = [
      //   { title: "Armed Robbery at Downtown Bank", date: "Feb 28, 2025", link: "https://example.com/news/robbery" },
      //   { title: "Police Arrest Suspect in Local Burglary Case", date: "Feb 27, 2025", link: "https://example.com/news/arrest" },
      //   { title: "Car Theft Ring Busted in Northern District", date: "Feb 26, 2025", link: "https://example.com/news/theft" },
      //   { title: "Vandalism Reported at City Park", date: "Feb 25, 2025", link: "https://example.com/news/vandalism" },
      //   { title: "Drug Bust Leads to Multiple Arrests", date: "Feb 24, 2025", link: "https://example.com/news/drugs" },
      //   { title: "Assault Case Under Investigation", date: "Feb 23, 2025", link: "https://example.com/news/assault" },
      //   { title: "Counterfeit Operation Discovered", date: "Feb 22, 2025", link: "https://example.com/news/counterfeit" },
      //   { title: "Identity Theft Scheme Targets Locals", date: "Feb 21, 2025", link: "https://example.com/news/identity" },
      //   { title: "Shoplifting Incident at Local Mall", date: "Feb 20, 2025", link: "https://example.com/news/shoplifting" },
      //   { title: "Traffic Stop Leads to Weapons Charge", date: "Feb 19, 2025", link: "https://example.com/news/weapons" },
      //   { title: "Cyber Attack on Local Business", date: "Feb 18, 2025", link: "https://example.com/news/cyber" },
      //   { title: "Suspicious Activity Reported Near School", date: "Feb 17, 2025", link: "https://example.com/news/suspicious" }
      // ];

      // const district_dummy= "a rock";
      
  return (
    <>
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <div className="w-full min-h-screen bg-gradient-to-r from-clr5 via-clr2 to-clr5 p-6">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white">
              Recent Crime News in <span className="text-pink-100 text-4xl underline">{district}</span>
            </h1>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentnews.map((news, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
              >
                <div className="p-4 bg-clr3 text-white">
                  <h2 className="text-xl font-bold line-clamp-2 h-8 py-auto text-center">{recentnews.title || "TITLE"}</h2>
                </div>
                <div className="p-3 bg-pink-100 text-clr3 font-semibold">
                  <p>{recentnews.date || "DATE"}</p>
                </div>
                <div className="p-4 bg-gray-100">
                  <a 
                    href={recentnews.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block w-full bg-clr3 hover:bg-clr1 text-white font-bold py-2 px-4 rounded text-center transition duration-300"
                  >
                    Know More
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default RecentCrimes