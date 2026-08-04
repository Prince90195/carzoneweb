import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { createBooking, fetchCar } from '../api/client';

function Payment() {
    const [searchParams] = useSearchParams();
    const carId = Number(searchParams.get('carId')) || null;
    const [car, setCar] = useState(null);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (!carId) return;
        fetchCar(carId)
            .then(setCar)
            .catch((err) => setError(err.message));
    }, [carId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await createBooking({
                car_id: carId,
                full_name: fullName,
                email,
                card_number: cardNumber,
            });
            setSubmitted(true);
        } catch (err) {
            setError(err.message);
        }
    };

    if (!carId) {
        return (
            <div className='payment'>
                <h1>No car selected</h1>
                <button onClick={() => navigate('/cars')}>Choose a car</button>
            </div>
        );
    }

    return (
        <div className='payment'>
            {submitted ? (
                <div>
                    <h1>✅ Booking Confirmed\!</h1>
                    <p>Thank you for choosing CarZone.</p>
                    <button onClick={() => navigate('/')}>Back to home</button>
                </div>
            ) : (
                <>
                    <h1>Payment Details</h1>
                    {car && (
                        <div className='selected-car'>
                            <h2>{car.name}</h2>
                            <p>{car.price}</p>
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <input
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            type='text'
                            placeholder='Full Name'
                            required
                        />
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type='email'
                            placeholder='Email'
                            required
                        />
                        <input
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            type='text'
                            placeholder='Card Number'
                            required
                        />
                        <button type='submit'>Confirm Booking</button>
                    </form>
                    {error && <p className='error'>{error}</p>}
                </>
            )}
        </div>
    );
}

export default Payment;
