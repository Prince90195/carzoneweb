import { useEffect, useState } from 'react';
import { fetchBookings } from '../api/client';

function Bookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchBookings()
            .then(setBookings)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className='bookings-page'>
            <h1>Bookings</h1>
            {loading && <p>Loading bookings...</p>}
            {error && <p className='error'>{error}</p>}
            {!loading && bookings.length === 0 && <p>No bookings found.</p>}
            {bookings.length > 0 && (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Car ID</th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Card Last 4</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking.id}>
                                <td>{booking.id}</td>
                                <td>{booking.car_id}</td>
                                <td>{booking.full_name}</td>
                                <td>{booking.email}</td>
                                <td>{booking.card_last4}</td>
                                <td>{booking.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Bookings;
