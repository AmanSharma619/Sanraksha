import { useEffect } from 'react';

const RecentCrimes = () => {
    useEffect(() => {
        let a = confirm("Sanraksha wants to know your location");
        if (a) {
            initMap();
        }
    }, []);

    async function initMap() {
        console.log("init map");
        const { Map } = await google.maps.importLibrary("maps");
        const map = new Map(document.getElementById("map"), {
            center: { lat: 28.6893, lng: 77.2920 },
            zoom: 11,
            mapId: "498661eafe8ce553",
        });
        getlocation();
    }

    function getlocation() {
        console.log("get location");
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    console.log({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                },
                () => {
                    console.error("Error fetching location");
                }
            );
        } else {
            console.error("Geolocation not supported");
        }
    }

    const dummyNews = [
        { title: "Woman foils bike snatcher's bid in west delhi ", date: "Feb 28, 2025", link: "#" },
        { title: "2nd class student sexually assaulted by helper", date: "Feb 27, 2025", link: "#" },
        { title: "DTC bus breakdown leads to crash in west delhi", date: "Feb 26, 2025", link: "#" },
        { title: "26 year old arrested for shooting on his birthday party in khyala", date: "Feb 25, 2025", link: "#" },
        { title: "Woman dies , husband and son injured in west delhi house fire", date: "Feb 24, 2025", link: "#" },
        { title: "Assault Case Under Investigation", date: "Feb 23, 2025", link: "#" },
    ];

    return (
        <>
            <div id="map" className='hidden' />
            <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
                <div className="w-full min-h-screen bg-gradient-to-r from-clr5 via-clr2 to-clr5 p-6">
                    <div className="container mx-auto">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-white">
                                Recent Crime News in <span className="text-pink-100 text-4xl underline">West Delhi</span>
                            </h1>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {dummyNews.map((news, index) => (
                                <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
                                    <div className="p-4 bg-clr3 text-white">
                                        <h2 className="text-xl font-bold line-clamp-2 h-8 py-auto text-center">{news.title}</h2>
                                    </div>
                                    <div className="p-3 bg-pink-100 text-clr3 font-semibold">
                                        <p>{news.date}</p>
                                    </div>
                                    <div className="p-4 bg-gray-100">
                                        <a href={news.link} target="_blank" rel="noopener noreferrer" className="block w-full bg-clr3 hover:bg-clr1 text-white font-bold py-2 px-4 rounded text-center transition duration-300">
                                            Know More
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RecentCrimes;
