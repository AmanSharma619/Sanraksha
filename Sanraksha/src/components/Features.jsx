const Features = () => {

    const features = [
      {
        icon: "🛡️",
        title: "Safety Ranking",
        description: "Get detailed safety scores and rankings for different areas in your neighborhood"
      },
      {
        icon: "📍",
        title: "Nearby Safety Zones",
        description: "Locate and navigate to the nearest safe zones and emergency points"
      },
      {
        icon: "⚠️",
        title: "Recent Crimes",
        description: "Stay informed with real-time updates on recent incidents in your area"
      },
      {
        icon: "📝",
        title: "Feedback Forms",
        description: "Submit and track safety concerns through our interactive feedback system"
      },
      {
        icon: "🔔",
        title: "Precautionary Measures",
        description: "Access guidelines and tips for maintaining personal and community safety"
      }
    ];
  
    return (
        <div className="bg-gradient-to-b from-clr3 via-clr4 to-clr5 min-h-screen py-16">
          <div className="px-8">
            <div className="flex flex-wrap justify-center gap-32">
              {features.slice(0, 3).map((feature, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-lg rounded-xl p-6 hover:transform hover:scale-105 transition-all duration-300 w-64"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-clr1 text-2xl mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-clr1 mb-2">{feature.title}</h3>
                  <p className="text-clr2">{feature.description}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-32 mt-16">
              {features.slice(3).map((feature, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-lg rounded-xl p-6 hover:transform hover:scale-105 transition-all duration-300 w-64"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-clr1 text-2xl mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-clr1 mb-2">{feature.title}</h3>
                  <p className="text-clr2">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
      
  };
  
  export default Features;