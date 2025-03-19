import "./feedback.css"
import { useState,useEffect ,useRef} from "react";
import {useForm} from "react-hook-form"


function Feedback(){
  let ltlng=useRef({"lat":null, "lng":null})
  const [isMapInitialized, setIsMapInitialized] = useState(false);
  const [data, setData] = useState([]);
  const placemark=useRef()
  const removemark=useRef()
  let isclicked=false

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors ,isSubmitting},
  } = useForm()

  async function submit_data(data) {
    // Assign the lat and lng to form data before submitting
    data.lat = ltlng.current.lat;
    data.lng = ltlng.current.lng;
  
    // Ensure ltlng has valid data before submitting
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

  const delay=()=>{
    return new Promise((res,rej)=>{
      setTimeout(() => {
        res()
      },3000 );
    })
  }


  function show_form(){
    if(isclicked==true){
      document.getElementById("form").style.display="flex";
      document.getElementById("form").style.flexDirection="column";
    }
    else{
      alert("Select a place by either searching on search bar or manually marking on map")
    }
  }
  function remove_last_marker(){
    lastmarker.position=null
    isclicked=false
    ltlng.current.lat=null
    ltlng.current.lng=null
    removemark.current.style.display="none"
    placemark.current.style.backgroundColor="#374151"
    placemark.current.style.color="##9ca3af"
    placemark.current.style.cursor="not-allowed"
    
    }
  function changebuttonui(){
    if(isclicked==true){
      placemark.current.style.backgroundColor="#1e40af"
      placemark.current.style.color="white"
      placemark.current.style.cursor="pointer"
      removemark.current.style.display="block"
    }
  }
  useEffect(() => {
     fetch("https://sanraksha-community.onrender.com/")
  .then(async (res) => {
    let a = await res.json();
    console.log(a);
    
    // Map through each item in the array to extract PlaceID
    
    const markers = a.map(item => ({
      name: item.Name,
      place: item.Place,
      review: item.Review,
      color: item.Color,
      lat: item.lat,
      lng: item.lng,
    }));

    setData(markers); // Set data with the array of PlaceIDs
    
    
  })
  .catch((error) => console.error("Error fetching data:", error));
    
    
  },[] );

useEffect(()=>{
  if(data.length>0){
    initMap()
    
  }
},[data]) 
useEffect(()=>{
  if(isMapInitialized){
    findPlaces()
  }
},[isMapInitialized])
let map;
let marker;
let infoWindow;
let lastmarker;

async function initMap() {
  const position = { lat: 28.6273, lng: 77.3007 };
  
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
  
  map =await new Map(document.getElementById("map2"), {
    zoom: 11,
    center: position,
    mapId: "DEMO_MAP_ID",
    disableDefaultUI: true,
    gmpClickable: true,
    
  });
 
  function addMarker(latlng){
    
    ltlng.current={lat:latlng.lat(),lng:latlng.lng()}
    
    
    
    
    let currposition={lat: latlng.lat(),lng: latlng.lng()}
     lastmarker= new AdvancedMarkerElement({
      map:map,
      position: currposition,
    
      
      gmpClickable: true,
    })
    
    isclicked=true
    changebuttonui()
  }

  map.addListener("click",({latLng})=>{
    if(isclicked==false){
      addMarker(latLng)
      
    }
    
  
   
  })
  defaultmarkers()
  findPlaces()
 
 
 
}
async function defaultmarkers(){
  
  
  const { Place } = await google.maps.importLibrary("places");
  const { PinElement,AdvancedMarkerElement } = await google.maps.importLibrary("marker");
  
  async function updateMarkers(data) {
    
    let image = document.createElement("img");
    image.style.width="30px"
    image.style.borderRadius="30px"
    image.src ="https://pixlr.com/images/index/ai-image-generator-one.webp"
    

    
    
    for (let i=0;i<=data.length;i++) {
      // const place = new Place({
      //   id: e,
      // });
      
      // await place.fetchFields({
      //   fields: ["displayName", "formattedAddress", "location"],
      // });
      // const pinBackground = new PinElement({
      //   background: "#FBBC04",
      // }); 
      const titl= `Place: ${data[i].place} \n ,Name: ${data[i].name} \n, Review: ${data[i].review}`
      const pinBackground = new PinElement({
        background: data[i].color,
      });
      const marker = new AdvancedMarkerElement({
        map,
        position: {lat: parseFloat(data[i].lat.$numberDecimal), lng:parseFloat(data[i].lng.$numberDecimal)},
        content: pinBackground.element,
        title: titl,
        gmpClickable: true,
        
      });
      marker.addEventListener("gmp-click",()=>{
      

        infoWindow.close();
        infoWindow.setContent(marker.title);
        infoWindow.open(marker.map, marker);
      })
    }
  }
  
  // Usage
  updateMarkers(data);
  findPlaces()
}
async function findPlaces() {
  
  
  
  // const request = {
  //   textQuery: "pizzalicious",
  //   fields: ["displayName", "location", "businessStatus", "reviews"],
  //   includedType: "restaurant",
  //   locationBias: { lat: 28.66726540759533, lng: 77.30233064675153 },
  //   isOpenNow: true,
  //   language: "en-US",
  //   maxResultCount: 8,
  //   useStrictTypeFiltering: false,
  // };
  // //@ts-ignore
  // const { places } = await Place.searchByText(request);

  // if (places.length) {
  //   console.log(places);

  //   const { LatLngBounds } = await google.maps.importLibrary("core");
  //   const bounds = new LatLngBounds();

  //   // Loop through and get all the results.
  //   places.forEach((place) => {
  //     const markerView = new AdvancedMarkerElement({
  //       map,
  //       position: place.location,
  //       title: place.displayName,
  //     });

  //     bounds.extend(place.location);
  //     console.log(place);
  //   });
  //   map.fitBounds(bounds);
  // } else {
  //   console.log("No results");
  // }
  
    const placeAutocomplete = new google.maps.places.PlaceAutocompleteElement();

  
    placeAutocomplete.id = "place-autocomplete-input";
    
    const card = document.getElementById("place-autocomplete-card");
  
    document.getElementById("card").appendChild(placeAutocomplete);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(card);
    
    // Create the marker and infowindow
   let loc;
    infoWindow = new google.maps.InfoWindow({});
    // Add the gmp-placeselect listener, and display the results on the map.
    //@ts-ignore
    placeAutocomplete.addEventListener("gmp-placeselect", async ({ place }) => {
      await place.fetchFields({
        fields: ["displayName", "formattedAddress", "location","id"],
        
      });
      
      // If the place has a geometry, then present it on a map.
      if (place.viewport) {
        map.fitBounds(place.viewport);
      } else {
        isclicked=true
        changebuttonui()
        loc=place.location
        
        ltlng.current.lat=place.location.lat()
        ltlng.current.lng=place.location.lng()
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


<div className="absolute inset-0 z-10  opacity-100 flex flex-col items-center justify-center text-clr1 font-bold ">
  <div className="mx-auto h-6 flex text-clr1 text-2xl font-bold mb-5 items-center mt-5 p-4 items-center">
  <div className="feedback" id="feedback">

<div id="card" className="text-clr1 ">
  *Search Places Here or Mark Directly On Map
</div>

<div id="map2"/>

<div className="form " id="form">
      <span id="svg" onClick={()=>{
        document.getElementById("form").style.display="none"
        
      }}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30" color="#000000" fill="none">
    <path d="M19.0005 4.99988L5.00049 18.9999M5.00049 4.99988L19.0005 18.9999" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
</svg>
      </span>
        <form action="/" onSubmit={handleSubmit(submit_data)}>

      <h1>Your Name</h1>
      <input type="text" id="name" {...register("Name",{required:true})} />
      {errors.Name && alert("Required Field")}
      <h1>Place Name</h1>
      <input type="text" {...register("Place",{required:true})} />
      {errors.Place && alert("Required Field")}
      <h1>Experience/Review</h1>
      <textarea id="textarea" cols="30" rows="7" {...register("Review",{required:true})} ></textarea>
      {errors.Review && alert("Required Field")}
      <h1>Marker Color</h1>
      <input type="color" name="" id="color" {...register("Color")} />
      <input type="text" {...register("lat")} className="hidden" id="lat" value={ltlng.current.lat || ""} />
      <input type="text" {...register("lng")} className="hidden" id="lng" value={ltlng.current.lng || ""} />
      <input type="submit" disabled={isSubmitting} id="submit" onClick={ async ()=>{
        await delay()
        window.location.reload()
      }} />
      {isSubmitting && <p>Submittng......</p>}
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