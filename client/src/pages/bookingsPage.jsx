import { useEffect, useState } from 'react'
import AccountNav from '../accountNav'
import axios from 'axios'
import PlaceImg from '../placeImg'
import { Link } from 'react-router-dom'
import BookingDates from '../bookingDates'
export default function BookingsPage() {
    const [bookings, setBookings] = useState([]);
    useEffect(() => {
        axios.get('/booking').then(res => setBookings(res.data));
    }, [])
    return (
        <div>
            <AccountNav />
            <div className='flex flex-col gap-4'>
                {bookings?.length > 0 && bookings.map(booking => (
                    <Link to={'/account/booking/'+booking._id} className='flex gap-4 rounded-2xl overflow-hidden bg-gray-100'>
                        <div className='max-w-40 max-h-40 aspect-square'>
                            <PlaceImg place={booking.place} />
                        </div>
                        <div className='py-3 pr-3 grow'>
                            <h2 className="text-2xl">{booking.place.title}</h2>
                            <div className='text-xl'>
                                <BookingDates booking={booking} className="mb-2 mt-4 text-gray-500"/>
                                <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                                    </svg>
                                    <div className="flex items-center text-2xl">
                                        Total price :
                                        <div className='ml-1'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            </svg>
                                        </div>
                                        {booking.price}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}