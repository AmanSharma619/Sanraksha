import { useEffect,useState } from 'react';
import "./Newspage.css"
import { Link } from 'react-router-dom';
const Newspage = (props) => {
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
            set_news(b)
            
            
            
        }
          get_news("seelampur")
    }, []);
    useEffect(()=>{
        if(news){
            console.log("news set");
            
        }
    },[news])

    

    return (
        <div className="flex h-full flex-col p-4 flex flex-col justify-center items-center min-w-full newspage">
            <h2 className="text-xl font-bold mb-4">Recent Crimes in {props.d}</h2>

            {/* Conditional Rendering: If news is set, display the list */}
            {news ? (
                <ul className="list-disc pl-5 space-y-5 min-w-full flex flex-col justify-center items-center">
                    {news.map((item, index) => (
                        <li key={index} className="flex flex-col justify-evenly">
                            <div
                               
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-white hover:underline ml-2  "
                            >
                                {item.title}
                            </div> 
                            <div>

                            <a href={item.link}>
                            <span className="text-clr2 ml-2 ">Link</span>
                            </a>
                            <span className="text-gray-500 ml-2">({item.date})</span>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-600">Loading recent crimes...</p>
            )}
          
        </div>
    );
};

export default Newspage;
