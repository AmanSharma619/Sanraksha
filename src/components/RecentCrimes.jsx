import { useEffect,useState } from 'react';
import "./RecentCrimes.css"
import { Link } from 'react-router-dom';
const RecentCrimes = (props) => {
    const [news,set_news]=useState(null)
    useEffect(() => {
        async function get_news(district){
            const a={location:district}
            const response = await fetch("http://127.0.0.1:5000/get_news", {
                method: "POST",
                body: JSON.stringify(a),
                headers: {
                    "Content-Type": "application/json",
                },
            })
            let b = await response.json()
            console.log(b);
            set_news(b.slice(0,2))
            
            
            
        }
          get_news(props.d)
    }, []);
    useEffect(()=>{
        if(news){
            console.log("news set");
            
        }
    },[news])

    

    return (
        <div className="flex h-full flex-col p-4 flex flex-col justify-center items-center recent">
            <h2 className=" font-bold mb-4 text-white">Recent Crimes in {props.d}</h2>

            {/* Conditional Rendering: If news is set, display the list */}
            {news ? (
                <ul className="list-disc pl-5 space-y-5">
                    {news.map((item, index) => (
                        <li key={index} className="text-center">
                            <a 
                                href={item.link} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-clr2 hover:underline"
                            >
                                {item.title}
                            </a> 
                            <div className="text-gray-500 ml-2">({item.date})</div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-600">Loading recent crimes...</p>
            )}
            <button className={`group px-8 py-4 text-white bg-clr2 hover:bg-clr1 ring-clr4 rounded-lg text-xl font-semibold shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:-translate-y-1 focus:outline-none focus:ring-4 mt-7`}>
            <Link to="/recent_crimes" className="flex items-center justify-center space-x-2">
              <span>Know More</span>
            </Link>
          </button>
        </div>
    );
};

export default RecentCrimes;
