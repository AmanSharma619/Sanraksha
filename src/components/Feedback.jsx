import "./feedback.css"
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form"

function Feedback() {
  let ltlng = useRef({ "lat": null, "lng": null })
  const [isMapInitialized, setIsMapInitialized] = useState(false);
  const [data, setData] = useState([]);
  const placemark = useRef()
  const removemark = useRef()
  let isclicked = false

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm()

  async function submit_data(data) {
    data.lat = ltlng.current.lat;
    data.lng = ltlng.current.lng;
    data.votes = 0; 

    if (!data.lat || !data.lng) {
      alert("Please place a marker on the map first.");
      return;
    }

    console.log("Submitting data:", data);

    const response = await fetch("https://sanraksha-community.onrender.com/", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
  }

  async function handleVote(id, voteType) {
    try {
      const response = await fetch(`https://sanraksha-community.onrender.com/vote/${id}`, {
        method: "PUT",
        body: JSON.stringify({ voteType }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (response.ok) {
        const updatedData = await response.json();
        setData(prevData => prevData.map(item => 
          item._id === id ? { ...item, votes: updatedData.votes } : item
        ));
      } else {
        alert("You've already voted on this feedback!");
      }
    } catch (error) {
      console.error("Error voting:", error);
    }
  }

  const delay = () => {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res()
      }, 3000);
    })
  }

  function show_form() {
    if (isclicked == true) {
      document.getElementById("form").style.display = "flex";
      document.getElementById("form").style.flexDirection = "column";
    }
    else {
      alert("Select a place by either searching on search bar or manually marking on map")
    }
  }

  function remove_last_marker() {
    lastmarker.position = null
    isclicked = false
    ltlng.current.lat = null
    ltlng.current.lng = null
    removemark.current.style.display = "none"
    placemark.current.style.backgroundColor = "#374151"
    placemark.current.style.color = "##9ca3af"
    placemark.current.style.cursor = "not-allowed"
  }

  function changebuttonui() {
    if (isclicked == true) {
      placemark.current.style.backgroundColor = "#1e40af"
      placemark.current.style.color = "white"
      placemark.current.style.cursor = "pointer"
      removemark.current.style.display = "block"
    }
  }

  useEffect(() => {
    fetch("https://sanraksha-community.onrender.com/")
      .then(async (res) => {
        let a = await res.json();
        console.log(a);

        const markers = a.map(item => ({
          _id: item._id,
          name: item.Name,
          place: item.Place,
          review: item.Review,
          color: item.Color,
          lat: item.lat,
          lng: item.lng,
          votes: item.votes || 0,
        }));

        setData(markers); 
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      initMap()
    }
  }, [data])

  useEffect(() => {
    if (isMapInitialized) {
      findPlaces()
    }
  }, [isMapInitialized])

  let map;
  let marker;
  let infoWindow;
  let lastmarker;

  async function initMap() {
    const position = { lat: 28.6273, lng: 77.3007 };

    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    map = await new Map(document.getElementById("map2"), {
      zoom: 11,
      center: position,
      mapId: "DEMO_MAP_ID",
      disableDefaultUI: true,
      gmpClickable: true,
    });

    function addMarker(latlng) {
      ltlng.current = { lat: latlng.lat(), lng: latlng.lng() }

      let currposition = { lat: latlng.lat(), lng: latlng.lng() }
      lastmarker = new AdvancedMarkerElement({
        map: map,
        position: currposition,
        gmpClickable: true,
      })

      isclicked = true
      changebuttonui()
    }

    map.addListener("click", ({ latLng }) => {
      if (isclicked == false) {
        addMarker(latLng)
      }
    })

    defaultmarkers()
    findPlaces()
  }

  async function defaultmarkers() {
    const { Place } = await google.maps.importLibrary("places");
    const { PinElement, AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    async function updateMarkers(data) {
      let image = document.createElement("img");
      image.style.width = "30px"
      image.style.borderRadius = "30px"
      image.src = "https://pixlr.com/images/index/ai-image-generator-one.webp"

      for (let i = 0; i < data.length; i++) {
        const feedbackItem = data[i];
      
        const infoContent = `
          <div class="feedback-info">
            <h3>${feedbackItem.name}</h3>
            <h4>${feedbackItem.place}</h4>
            <p>${feedbackItem.review}</p>
            <div class="voting-section">
              <button class="vote-up" data-id="${feedbackItem._id}">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 19V5M5 12l7-7 7 7"/>
                </svg>
              </button>
              <span class="vote-count">${feedbackItem.votes || 0}</span>
              <button class="vote-down" data-id="${feedbackItem._id}">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 5v14M5 12l7 7 7-7"/>
                </svg>
              </button>
            </div>
          </div>
        `;

        const pinBackground = new PinElement({
          background: feedbackItem.color,
        });

        const marker = new AdvancedMarkerElement({
          map,
          position: { lat: parseFloat(feedbackItem.lat.$numberDecimal), lng: parseFloat(feedbackItem.lng.$numberDecimal) },
          content: pinBackground.element,
          title: feedbackItem.place,
          gmpClickable: true,
        });

        marker.addEventListener("gmp-click", () => {
          infoWindow.close();
          infoWindow.setContent(infoContent);
          infoWindow.open(marker.map, marker);
          
          setTimeout(() => {
            const upvoteBtn = document.querySelector(`.vote-up[data-id="${feedbackItem._id}"]`);
            const downvoteBtn = document.querySelector(`.vote-down[data-id="${feedbackItem._id}"]`);
            
            if (upvoteBtn) {
              upvoteBtn.addEventListener('click', () => handleVote(feedbackItem._id, 'upvote'));
            }
            
            if (downvoteBtn) {
              downvoteBtn.addEventListener('click', () => handleVote(feedbackItem._id, 'downvote'));
            }
          }, 100);
        });
      }
    }
    updateMarkers(data);
    findPlaces();
  }

  async function findPlaces() {
    const placeAutocomplete = new google.maps.places.PlaceAutocompleteElement();

    placeAutocomplete.id = "place-autocomplete-input";

    const card = document.getElementById("place-autocomplete-card");

    document.getElementById("card").appendChild(placeAutocomplete);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(card);

    let loc;
    infoWindow = new google.maps.InfoWindow({});
    placeAutocomplete.addEventListener("gmp-placeselect", async ({ place }) => {
      await place.fetchFields({
        fields: ["displayName", "formattedAddress", "location", "id"],
      });

      if (place.viewport) {
        map.fitBounds(place.viewport);
      } else {
        isclicked = true
        changebuttonui()
        loc = place.location

        ltlng.current.lat = place.location.lat()
        ltlng.current.lng = place.location.lng()
        map.setCenter(place.location);
        map.setZoom(17);
      }
      lastmarker = new google.maps.marker.AdvancedMarkerElement({
        map,
        position: loc,
      });

      let content =
        '<div id="infowindow-content">' +
        '<span id="place-displayname" class="title">' +
        place.displayName +
        "</span><br />" +
        '<span id="place-address">' +
        place.formattedAddress +
        "</span>" +
        "</div>";

      updateInfoWindow(content, place.location);
      marker.position = place.location;
    });
  }

  function updateInfoWindow(content, center) {
    infoWindow.setContent(content);
    infoWindow.setPosition(center);
    infoWindow.open({
      map,
      anchor: marker,
      shouldFocus: false,
    });
  }

  return <>
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 z-10 opacity-100 flex flex-col items-center justify-center text-clr1 font-bold ">
        <div className="mx-auto h-6 flex text-clr1 text-2xl font-bold mb-5 mt-5 p-4 items-center">
          <div className="feedback" id="feedback">
            <div id="card" className="text-clr1 ">
              *Search Places Here or Mark Directly On Map
            </div>

            <div id="map2" />

            <div className="form " id="form">
              <span id="svg" onClick={() => {
                document.getElementById("form").style.display = "none"
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30" color="#000000" fill="none">
                  <path d="M19.0005 4.99988L5.00049 18.9999M5.00049 4.99988L19.0005 18.9999" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <form 
                action="/" 
  onSubmit={handleSubmit(submit_data)} 
  className="max-w-md mx-auto p-6 bg-black/10 backdrop-blur-sm rounded-lg shadow-xl border border-red-700 text-gray-200 my-8"
              >
                <h2 className="text-2xl font-bold mb-6 text-white border-b border-red-700 pb-2 text-center">
    Share Your Experience
                </h2>

                <div className="mb-4">
    <label htmlFor="name" className="block text-gray-300 text-sm font-medium mb-2">Your Name</label>
    <input 
      type="text" 
      id="name" 
      {...register("Name", { required: true })} 
      className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 hover:border-red-500"
    />
    {errors.Name && <span className="text-red-400 text-xs italic mt-1">This field is required</span>}
                </div>

                <div className="mb-4">
    <label htmlFor="place" className="block text-gray-300 text-sm font-medium mb-2">Place Name</label>
    <input 
      type="text"
      id="place" 
      {...register("Place", { required: true })} 
      className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 hover:border-red-500"
    />
    {errors.Place && <span className="text-red-400 text-xs italic mt-1">This field is required</span>}
                </div>

                <div className="mb-4">
    <label htmlFor="textarea" className="block text-gray-300 text-sm font-medium mb-2">Experience/Review</label>
    <textarea 
      id="textarea" 
      cols="30" 
      rows="4" 
      {...register("Review", { required: true })}
      className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 resize-none hover:border-red-500"
    ></textarea>
    {errors.Review && <span className="text-red-400 text-xs italic mt-1">This field is required</span>}
                </div>

                <div className="mb-6 flex items-center gap-3">
    <label htmlFor="color" className="block text-gray-300 text-sm font-medium">Marker Color:</label>
    <input 
      type="color" 
      id="color" 
      {...register("Color")} 
      className="h-10 w-16 border border-gray-500 rounded-md cursor-pointer bg-transparent hover:opacity-90 transition-opacity duration-200"
    />
    <span className="text-xs text-gray-400">Pick a color</span>
                </div>

                <input type="text" {...register("lat")} className="hidden" id="lat" value={ltlng.current.lat || ""} />
                <input type="text" {...register("lng")} className="hidden" id="lng" value={ltlng.current.lng || ""} />

                <button
    type="submit"
    disabled={isSubmitting}
    className="w-full bg-gradient-to-r from-red-700 to-red-500 text-white py-1 px-1 mb-2 rounded-md font-medium shadow-lg hover:from-red-600 hover:to-red-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
  >
    {isSubmitting ? "Submitting..." : "Submit Experience"}
                </button>

                {isSubmitting && <p className="text-red-400 text-center mt-3 animate-pulse">Submitting experience...</p>}
              </form>
            </div>
            <div className="confirm w-full flex justify-center h-14 items-center">
              <button ref={placemark} id="placebutt" className="bg-gray-700 w-1/5 rounded-md h-9 m-auto text-gray-400 button" onClick={show_form}>Place Marker?</button>
              <button ref={removemark} id="removebutt" className="bg-red-700 w-1/5 rounded-md h-9 m-auto text-white button" onClick={remove_last_marker}>Remove Marker?</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
}

export default Feedback;