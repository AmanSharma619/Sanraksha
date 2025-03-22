import { useEffect, useRef } from 'react'
import "./About.css"
import about1 from "../assets/about1.png";

const About = () => {
  const heading=useRef(null)
  useEffect(()=>{
   
    gsap.from("#first img",{
      duration: 1,
      y:300,
      scrollTrigger:{
        trigger:"#first",
        start: "center bottom"
      }
    })
    gsap.from("#first .content",{
      duration: 1,
      y:-600,
      scrollTrigger:{
        trigger:"#first",
        start: "center bottom"
      }
    })
   
    gsap.from("#second img",{
      duration: 1,
      y:300,
      scrollTrigger:{
        trigger:"#second",
        start: "center bottom"
      }
    })
    gsap.from("#second .content",{
      duration: 1,
      y:-600,
      scrollTrigger:{
        trigger:"#second",
        start: "center bottom"
      }
    })
   
    gsap.from("#third img",{
      duration: 1,
      y:300,
      scrollTrigger:{
        trigger:"#third",
        start: "center bottom"
      }
    })
    gsap.from("#third .content",{
      duration: 1,
      y:-600,
      scrollTrigger:{
        trigger:"#third",
        start: "center bottom"
      }
    })
   
    gsap.from("#fourth img",{
      duration: 1,
      y:300,
      scrollTrigger:{
        trigger:"#fourth",
        start: "center bottom"
      }
    })
    gsap.from("#fourth .content",{
      duration: 1,
      y:-600,
      scrollTrigger:{
        trigger:"#fourth",
        start: "center bottom"
      }
    })
   
    gsap.from("#fifth img",{
      duration: 1,
      y:300,
      scrollTrigger:{
        trigger:"#fifth",
        start: "center bottom"
      }
    })
    gsap.from("#fifth .content",{
      duration: 1,
      y:-600,
      scrollTrigger:{
        trigger:"#fifth",
        start: "center bottom"
      }
    })
   gsap.from(heading.current.children,{
    y:100,
    duration:1,
    stagger:0.1,
    scrollTrigger:{
      trigger:".heading",
      start:"center bottom"
    }
   })


  },[])
  return (
    <div className='features text-white min-h-screen flex flex-col gap-5' id='feature'>
      <div className="heading text-center mb-7" ref={heading}>
        {"Features".split("").map((letter, index) => (
          <span key={index} className="inline-block">
            {letter}
          </span>
        ))}
      </div>
      <div className="features-list flex items-center justify-around" id='first'>
        <img src={about1} alt="" />
        <div className="content w-2/4">
          <h1 className='text-clr2 text-2xl'>Safety Ranking of Your District</h1>
          <h2>Gives you a clear idea by color grading your district, on basis of it's safety score</h2>
        </div>
      </div>
      <div className="features-list flex items-center justify-around" id='second'>
        <div className="content w-2/4">
          <h1 className='text-clr2 text-2xl'>Recent Crimes in Your Area</h1>
          <h2>Provides you with the incidents which recently occured at your present location.</h2>
        </div>
        <img src="https://i.postimg.cc/284MWJ6m/preview.webp" alt="" />
      </div>
      <div className="features-list flex items-center justify-around" id='third'>
        <img src="https://i.postimg.cc/YqnTfDVd/Screenshot-89.png" alt="" />
        <div className="content w-2/4">
          <h1 className='text-clr2 text-2xl'>Feedback Markers</h1>
          <h2>People can contribute by providing a safety scenario by specifying locations.</h2>
        </div>
      </div>
      <div className="features-list flex items-center justify-around" id='fourth'>
        <div className="content w-2/4">
          <h1 className='text-clr2 text-2xl'>"Kavach" Support</h1>
          <h2>You can freely ask about any general information, tips, or safe score of any districts you are planning to visit.</h2>
        </div>
        <img src="https://i.postimg.cc/fRwJYGwh/Designer-2.jpg" alt="" />
      </div>
      <div className="features-list flex items-center justify-around" id='fifth'>
        <img src="https://i.postimg.cc/HjDGm1kv/Designer-7.jpg" alt="" />
        <div className="content w-2/4">
          <h1 className='text-clr2 text-2xl'>Nearby Safe Spots</h1>
          <h2>Give you details about the police stations and hospitals near you.</h2>
        </div>
      </div>
    </div>
  )
}

export default About;