import { useEffect, useState } from 'react';
import CarCard from '../components/CarCard';
import { fetchCars } from '../api/client';

function Cars() {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchCars()
            .then(setCars)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className='cars-page'>
            <h1>Available Cars</h1>
            {loading && <p>Loading cars...</p>}
            {error && <p className='error'>{error}</p>}
            <div className='cars'>
                {cars.map((car) => (
                    <CarCard key={car.id} car={car} />
                ))}
            </div>
        </div>
    );
}

export default Cars;
