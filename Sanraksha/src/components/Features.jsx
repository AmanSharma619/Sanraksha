import { Shield, MapPin, AlertCircle, FileText, Bell } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Shield size={32} />,
      title: "Safety Ranking",
      description: "Get detailed safety scores and rankings for different areas in your neighborhood",
    },
    {
      icon: <MapPin size={32} />,
      title: "Nearby Safety Zones",
      description: "Locate and navigate to the nearest safe zones and emergency points",
    },
    {
      icon: <AlertCircle size={32} />,
      title: "Recent Crimes",
      description: "Stay informed with real-time updates on recent incidents in your area",
    },
    {
      icon: <FileText size={32} />,
      title: "Feedback Forms",
      description: "Submit and track safety concerns through our interactive feedback system",
    },
    {
      icon: <Bell size={32} />,
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
              className="bg-white/10 border border-clr4 hover:border-clr2 backdrop-blur-lg rounded-xl p-6 hover:transform hover:scale-105 transition-all duration-300 w-80"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-clr1 text-white mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-clr1 mb-2">{feature.title}</h3>
              <p className="text-clr2">{feature.description}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-32 mt-16">
          {features.slice(3).map((feature, index) => (
            <div
              key={index}
              className="bg-white/10 border border-clr4 hover:border-clr2 backdrop-blur-lg rounded-xl p-6 hover:transform hover:scale-105 transition-all duration-300 w-80"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-clr1 text-white mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-clr1 mb-2">{feature.title}</h3>
              <p className="text-clr2">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
