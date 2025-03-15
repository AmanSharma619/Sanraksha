import { Shield, MapPin, AlertCircle, FileText, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

const Features = () => {
  const features = [
    {
      path: "heatmaps",
      icon: <Shield size={32} />,
      img: "https://i.postimg.cc/5yhd4RD3/heatmaps.png",
      title: "Safety Ranking",
      description: "Get detailed safety scores and rankings for different areas in your neighborhood",
    },
    {
      path: "safezones",
      icon: <MapPin size={32} />,
      img: "https://i.postimg.cc/HjDGm1kv/Designer-7.jpg",
      title: "Nearby Safety Zones",
      description: "Locate and navigate to the nearest safe zones and emergency points",
    },
    {
      path: "recent_crimes",
      icon: <AlertCircle size={32} />,
      img: "https://i.postimg.cc/284MWJ6m/preview.webp",
      title: "Recent Crimes",
      description: "Stay informed with real-time updates on recent incidents in your area",
    },
    {
      path: "feedback",
      icon: <FileText size={32} />,
      img: "https://i.postimg.cc/YqnTfDVd/Screenshot-89.png",
      title: "Community Feedback",
      description: "Submit and track safety concerns through our interactive feedback system",
    },
    {
      path: "precautionary_measures",
      icon: <Bell size={32} />,
      img: "https://i.postimg.cc/fRwJYGwh/Designer-2.jpg",
      title: "Precautionary Measures",
      description: "Access guidelines and tips for maintaining personal and community safety",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-clr5 via-clr4 to-clr5 h-auto py-12">
      <div className="px-8">
        <div className="flex flex-wrap justify-center gap-32">
          {features.slice(0, 3).map((feature, index) => (
            <div
              key={index}
              className="bg-white/10 border group border-clr4 hover:border-clr2 backdrop-blur-lg rounded-xl p-5 hover:transform hover:scale-105 transition-all duration-300 w-80 h-72 "
            >

              {/* <div className="flex items-center justify-center w-24 h-10  bg-clr1 text-white mb-4"> */}
              <img src={feature.img} alt='image' className='object-fill w-full h-36 rounded-xl mb-1 group-hover:blur-md ' />
              {/* </div> */}

              <button className=' text-md text-clr1 font-bold hover:bg-gradient-to-r from-clr2 to-clr3 hover:text-clr5 rounded-full transition duration-300 ease-in-out   absolute px-4 py-4 left-1/3 top-28 opacity-0 group-hover:opacity-100  '>
                <Link to={`/${feature.path}`} className="block w-full h-full text-center">
                  Check Out
                </Link>
              </button>

              <h3 className="text-xl font-bold text-clr1 mb-2  group-hover:blur-sm">{feature.title}</h3>
              <p className="text-clr2  group-hover:blur-sm">{feature.description}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-32 mt-16">
          {features.slice(3).map((feature, index) => (
            <div
              key={index}
              className="bg-white/10 group border border-clr4 bg-contain bg-center hover:border-clr2 backdrop-blur-lg rounded-xl p-6 hover:transform hover:scale-105 transition-all duration-300 w-80 h-72"
            >
              {/* <div className="flex items-center justify-center w-12 h-12 rounded-full bg-clr1 text-white mb-4">
                {feature.icon}
              </div> */}
              <img src={feature.img} alt='image' className='object-fill w-full h-36 rounded-xl mb-1 group-hover:blur-md ' />
              <button className=' text-md text-clr1 font-bold hover:bg-gradient-to-r from-clr2 to-clr3 hover:text-clr5 rounded-full transition duration-300 ease-in-out   absolute px-4 py-4 left-1/3 top-28 opacity-0 group-hover:opacity-100  '>
                <Link to={`/${feature.path}`} className="block w-full h-full text-center">
                  Check Out
                </Link>
              </button>
              <h3 className="text-xl font-bold text-clr1 mb-2  group-hover:blur-sm">{feature.title}</h3>
              <p className="text-clr2  group-hover:blur-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
