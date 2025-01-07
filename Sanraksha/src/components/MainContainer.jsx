import {Link} from "react-router-dom";

const MainContainer = () => {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-b from-clr5 via-clr4 to-clr3">
        <div className="relative px-4 py-16 text-center space-y-8 transform hover:scale-105 transition-transform duration-500">
          <h1 className="text-5xl font-bold mb-6 text-clr1">
            Navigate Safer Paths <span className="block mt-2">with Confidence</span>
          </h1>
          <h2 className="text-2xl mb-12 text-clr2">
            Identify Safe Zones, Empower Your Decisions
          </h2>
          <button 
            className="px-8 py-4 text-white bg-clr2 hover:bg-clr1 ring-clr4 rounded-lg text-xl font-semibold shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:-translate-y-1 focus:outline-none focus:ring-4">
            <Link to="/dashboard">View Safety Dashboard</Link>
          </button>
        </div>
      </div>
    );
  };
  
  export default MainContainer;