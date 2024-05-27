import { useContext, useEffect, useState } from "react"
import { differenceInCalendarDays } from 'date-fns'
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "./usercontext";

export default function BookingWidget({ place }) {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [redirect,setRedirect] = useState('');
    const {user} = useContext(UserContext);
    useEffect(()=>{
        if(user){
            setName(user.name);
        }
    },[user])
    let numberOfDays = 0;
    if (checkIn && checkOut) {
        numberOfDays = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
    }
    async function bookThisPlace(){
        const data = {place:place._id,checkIn,checkOut,mobile,numberOfGuests,name,price:numberOfDays*place.price}
        const res = await axios.post('/booking',data);
        const bookingId = res.data._id;
        console.log(bookingId);
        setRedirect(`/account/booking/${bookingId}`);

    }
    if(redirect){
        return <Navigate to={redirect} />
    }
    return (
        <div className="bg-white shadow p-4 rounded-2xl">
            <div className="flex items-center text-2xl text-center">
                <div className="pr-1">
                    Price :
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM6 5.75A.75.75 0 0 1 6.75 5h6.5a.75.75 0 0 1 0 1.5h-2.127c.4.5.683 1.096.807 1.75h1.32a.75.75 0 0 1 0 1.5h-1.32a4.003 4.003 0 0 1-3.404 3.216l1.754 1.754a.75.75 0 0 1-1.06 1.06l-3-3a.75.75 0 0 1 .53-1.28H8c1.12 0 2.067-.736 2.386-1.75H6.75a.75.75 0 0 1 0-1.5h3.636A2.501 2.501 0 0 0 8 6.5H6.75A.75.75 0 0 1 6 5.75Z" clip-rule="evenodd" />
                </svg>
                {place.price} / per night
            </div>
            <div className="border rounded-2xl mt-4">
                <div className="grid grid-cols-2">
                    <div className="py-3 px-4">
                        <label >Check In:</label>
                        <input type="date" value={checkIn} onChange={(ev) => setCheckIn(ev.target.value)} />
                    </div>
                    <div className="py-3 px-4 border-l">
                        <label >Check Out:</label>
                        <input type="date" value={checkOut} onChange={(ev) => setCheckOut(ev.target.value)} />
                    </div>
                </div>
                <div className="py-3 px-4 border-t">
                    <label >Number of guests</label>
                    <input type="number" value={numberOfGuests} onChange={(ev) => setNumberOfGuests(ev.target.value)} />
                </div>
                {numberOfDays > 0 && (
                    <>
                        <div className="py-3 px-4 border-t">
                            <label >Name :</label>
                            <input type="text" value={name} onChange={(ev) => setName(ev.target.value)} />
                        </div>
                        <div className="py-3 px-4 border-t">
                            <label >Phone no. :</label>
                            <input type="tel" value={mobile} onChange={(ev) => setMobile(ev.target.value)} />
                        </div>
                    </>
                )}
            </div>
            <button onClick={bookThisPlace} className="primary flex items-center justify-center">
                Book this place
                {numberOfDays > 0 && (
                    <span className="ml-1 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM6 5.75A.75.75 0 0 1 6.75 5h6.5a.75.75 0 0 1 0 1.5h-2.127c.4.5.683 1.096.807 1.75h1.32a.75.75 0 0 1 0 1.5h-1.32a4.003 4.003 0 0 1-3.404 3.216l1.754 1.754a.75.75 0 0 1-1.06 1.06l-3-3a.75.75 0 0 1 .53-1.28H8c1.12 0 2.067-.736 2.386-1.75H6.75a.75.75 0 0 1 0-1.5h3.636A2.501 2.501 0 0 0 8 6.5H6.75A.75.75 0 0 1 6 5.75Z" clip-rule="evenodd" />
                        </svg>
                        {numberOfDays * place.price}
                    </span>
                )}
            </button>
        </div>
    )
}