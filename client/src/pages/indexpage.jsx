import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
export default function IndexPage() {
    const [places, setPlaces] = useState([]);
    useEffect(() => {
        axios.get('/places').then(res => {
            setPlaces(res.data);
        })
    }, [])
    return (
        <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {places.length > 0 && places.map(place => (
                <Link to={'/place/'+place._id} className="">
                    <div className="bg-gray-500 mb-2 rounded-2xl">
                        {place.addedPhotos?.[0] && (
                            <img className="rounded-2xl object-cover aspect-square max-w-full max-h-80 w-full h-auto" src={'http://localhost:3000/uploads/' + place.addedPhotos?.[0]} alt="" />
                        )}
                    </div>
                    <h3 className="text-zinc-2000 font-semibold ">{place.address}</h3>
                    <h2 className="text-sm text-gray-500">{place.title}</h2>
                    <div className="flex items-center mt-1 -ml-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <div className="">
                            <span className="font-semibold">{place.price}</span> night
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}