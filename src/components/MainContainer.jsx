import { useState ,useEffect,useRef} from "react"
import React from 'react'
import { Link } from "react-router-dom";
import { MapPin } from 'lucide-react';
import "./MainContainer.css"
const MainContainer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const vantaRef = useRef(null);
  gsap.from(".subhead span",{
    y:40,
    duration:0.7
  })
  useEffect(() => {
      if (!vantaRef.current) return; // Ensure ref exists before initialization
    const vantaEffect = VANTA.GLOBE({
      el: vantaRef.current,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
      color: 0xa00f14,
      backgroundColor: 0x000000,
    });
      const timer = setTimeout(() => {
          setIsVisible(true);
      }, 300);
       return () => {
      vantaEffect.destroy();
      clearTimeout(timer);
    };
  }, []);
  return (
    
    <div className='h-screen mt-15 text-white' ref={vantaRef}>
      <div className="main-heading h-3/5 flex items-center justify-center flex-col ">
     <div className='subhead text-center'>
     <span>Navigate  </span>
     <span className='text-clr2'>Safer Paths </span>
     <span >With Confidence</span>
     </div>
     <span>Identify Safe Zones And Empower Your Decisions</span>
     <button className={`group px-8 py-4 text-white bg-clr2 hover:bg-clr1 ring-clr4 rounded-lg text-xl font-semibold shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:-translate-y-1 focus:outline-none focus:ring-4 ${isVisible ? 'fadeInUp' : ''} my-9`} style={{animationDelay: '0.6s'}}>
            <Link to="/dashboard" className="flex items-center justify-center space-x-2">
              <span>View Safety Dashboard</span>
              <MapPin className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </button>
      </div>
    </div>
    
  )
}

export default MainContainer