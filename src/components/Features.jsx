import "./Features.css";
import { useEffect, useState } from "react";
import Safezones from "./Safezones.jsx";
import Feedback from "./Feedback.jsx";
import Heatmaps from "./Heatmaps.jsx";
import { Link } from "react-router-dom";

const Features = () => {
  useEffect(() => {
    let a = confirm("Sanraksha wants to know your location");
    if (a) {
      initMap();
    }
  }, []);

  const [position, set_position] = useState(null);
  useEffect(() => {
    if (position) {
      console.log("position is", position);
    }
  }, [position]);

  function getlocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          set_position(pos);
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
    const { Map } = await google.maps.importLibrary("maps");
    const map = new Map(document.getElementById("map1"), {
      center: { lat: 28.6893, lng: 77.292 },
      zoom: 11,
      mapId: "498661eafe8ce553",
    });
    getlocation();
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center rounded-lg p-6">
      <div id="map1" className="hidden" />
      <h1 className="text-white mb-9">Safety Dashboard</h1>
      <div className="grid h-full w-full grid-cols-3 grid-rows-[6] gap-4">
        <div className="col-span-2 row-span-1 rounded-3xl box relative animate-widthExpand" id="first_item">
          {position ? <Safezones lat={position.lat} lng={position.lng} /> : <p>Loading location...</p>}
        </div>
        <div className="row-span-1 rounded-3xl box animate-heightExpand" id="second_item"></div>
        <div className="row-span-1 rounded-3xl box relative animate-scaleExpand" id="third_item">
          <img src="/Feedback.png" className="w-full h-full object-cover rounded-3xl" alt="" />
          <Link to="/feedback">
            <div className="cover h-full w-full absolute top-0 left-0 z-10 rounded-3xl text-white flex flex-col">
              <h1 className="z-20 relative">Community Feedback</h1>
              <h2 className="z-20 relative">View and Place Anonymous Markers</h2>
            </div>
          </Link>
        </div>
        <div className="col-span-2 row-span-1 rounded-3xl box animate-scaleExpand" id="fourth_item">
          {position ? <Heatmaps lat={position.lat} lng={position.lng} /> : <p>Loading location...</p>}
        </div>
      </div>

      <style jsx>{`
        @keyframes widthExpand {
          from {
            width: 0px;
            opacity: 0;
          }
          to {
            width: 100%;
            opacity: 1;
          }
        }

        @keyframes heightExpand {
          from {
            height: 0px;
            opacity: 0;
          }
          to {
            height: 100%;
            opacity: 1;
          }
        }

        @keyframes scaleExpand {
          from {
            transform: scaleX(0);
            opacity: 0;
            transform-origin: 100% 50%;
          }
          to {
            transform: scaleX(1);
            opacity: 1;
          }
        }

        .animate-widthExpand {
          animation: widthExpand 0.8s ease-out forwards;
        }
        .animate-heightExpand {
          animation: heightExpand 0.8s ease-out forwards;
        }
        .animate-scaleExpand {
          animation: scaleExpand 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Features;