import { useEffect, useState } from 'react';
import { Shield, MapPin, AlertCircle, Bell } from 'lucide-react';
import './About.css';
import { Link } from 'react-router-dom';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      id: "01",
      icon: <Shield size={32} />,
      title: "Safety Ranking",
      description: "Get detailed safety scores and rankings for different areas in your neighborhood",
    },
    {
      id: "02",
      icon: <MapPin size={32} />,
      title: "Nearby Safety Zones",
      description: "Locate and navigate to the nearest safe zones and emergency points",
    },
    {
      id: "03",
      icon: <AlertCircle size={32} />,
      title: "Recent Crime Alerts",
      description: "Stay informed with real-time updates on recent incidents in your area",
    },
    {
      id: "04",
      icon: <Bell size={32} />,
      title: "Safety Measures",
      description: "Access guidelines and tips for maintaining personal and community safety with community feedback system",
    },
  ];

  return (
    <div className={`flex flex-col lg:flex-row min-h-[600px] w-full transition-opacity duration-800 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="flex-1 flex flex-col bg-gradient-to-b from-clr5 via-clr4 to-clr4 p-8 lg:p-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-gradient pointer-events-none"></div>
        <div className="max-w-[90%] opacity-0 animate-slideUp">
          <h2 className="text-6xl lg:text-5xl text-center font-bold mb-6 text-clr1 leading-tight">
            Drive your safety to a new age
          </h2>
          <p className="text-xl font-semibold text-center text-clr1/80 mb-8 leading-relaxed">
            Helping locate and navigate to the nearest safe zones, & providing real-time crime updates of your area
          </p>
          <div className='flex items-center justify-center'>
          <button className="bg-white flex items-center justify-center text-clr2 border-none rounded-full px-8 py-3 font-semibold cursor-pointer transition-all duration-300 hover:translate-y-1 hover:shadow-lg animate-pulse">
            <Link to='/dashboard'>Get Started</Link>
          </button>
          </div>
        </div>

        {/* <div className="w-98 aspect-square overflow-hidden opacity-0 animate-fadeIn">
          <img 
            src="https://styleguide.iu.edu/images/1-1_placeholder_768px-768px.png" 
            alt="Safety" 
            className="w-60 h-60 object-cover object-center transition-transform duration-500 opacity-0 hover:scale-105"
          />
        </div> */}
      </div>

      <div className="flex-1 flex-col bg-gradient-to-b from-clr5 via-clr3 to-clr3 p-8 pt-24 lg:p-16 lg:pt-24 flex items-center relative">
      <div className="w-120 aspect-square overflow-hidden opacity-0 animate-fadeIn">
          <img 
            src="https://styleguide.iu.edu/images/1-1_placeholder_768px-768px.png" 
            alt="Safety" 
            className="w-60 h-60 object-contain object-center transition-transform duration-500 opacity-0 hover:scale-105"
          />
        </div>
        <div className="absolute inset-0 bg-radial-gradient-light pointer-events-none"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {features.map((feature, index) => (
            <div 
              key={feature.id} 
              className={`bg-white/10 rounded-xl p-6 relative backdrop-blur-sm shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl opacity-0 border border-clr2 hover:border-clr1 ${isVisible ? 'animate-slideInRight' : ''}`}
              style={{ animationDelay: `${0.4 + index * 0.2}s` }}
            >
              <div className="absolute top-4 right-4 text-2xl font-bold text-white/30">
                {feature.id}
              </div>
              <div className="inline-block p-2 mb-4 bg-white/15 rounded-lg text-clr1">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-clr1 mb-2">
                {feature.title}
              </h3>
              <p className="text-md text-clr1 leading-relaxed">
                {feature.description}
              </p>
              <div className="absolute inset-0 rounded-xl bg-shimmer pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;