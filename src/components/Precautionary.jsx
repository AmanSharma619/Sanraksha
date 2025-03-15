import React, { useEffect } from 'react'

const Precautionary = () => {
    useEffect(()=>{
        gsap.from(".vid", {
            y:20,
            duration: 0.3,
            
        })
    },[])
  return (
    <>
      
  <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">


<div className="absolute inset-0 z-10 bg-gradient-to-b from-clr5 via-clr4 to-clr5 opacity-100 flex flex-col items-center justify-center text-clr1 font-bold ">
  <div className="mx-auto h-6 flex text-clr1 text-2xl font-bold mb-5 items-center mt-5 p-4 items-center"></div>
  <div className="videos w-full flex flex-wrap gap-6 justify-around" >
  <iframe className='vid'
       width="350"
        height="315"
        src={`https://www.youtube.com/embed/z8T29GYPlVM?si=X6Sh1NpZO-AxsSvy`}  // ✅ Use the embed URL
        title="YouTube Video Player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
  <iframe
  className='vid'
        width="350"
        height="315"
        src={`https://www.youtube.com/embed/ZlczcKkIV8U?si=Uij14bqehRr0qLOh`}  // ✅ Use the embed URL
        title="YouTube Video Player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
  <iframe
  className='vid'
        width="350"
        height="315"
        src={`https://www.youtube.com/embed/G3P0fODHfuQ?si=5avTX0hc5lt_9ZTc`}  // ✅ Use the embed URL
        title="YouTube Video Player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
  <iframe
  className='vid'
        width="350"
        height="315"
        src={`https://www.youtube.com/embed//aijosRA7m-k?si=St6nqgkDcqTQXXGB`}  // ✅ Use the embed URL
        title="YouTube Video Player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
  <iframe
  className='vid'
        width="350"
        height="315"
        src={`https://www.youtube.com/embed///g3UInoGLGtg?si=XytMtAqIf6b84PFM`}  // ✅ Use the embed URL
        title="YouTube Video Player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
  <iframe
  className='vid'
        width="350"
        height="315"
        src={`https://www.youtube.com/embed//TmDT-RkuE6Q?si=XjnOdPM9vCT4fZWP`}  // ✅ Use the embed URL
        title="YouTube Video Player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
  </div>
  </div>
  </div>
    </>
  )
}

export default Precautionary