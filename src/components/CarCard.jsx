import { Link } from "react-router-dom";

function CarCard({ car }) {
  return (
    <div className="card">
      <img src={car.image} alt={car.name} />
      <h2>{car.name}</h2>
      <p>Year: {car.year}</p>
      <p>Fuel: {car.fuel}</p>
      <h3>{car.price}</h3>
      <Link to={`/payment?carId=${car.id}`}>
        <button>Buy Now</button>
      </Link>
    </div>
  );
}

export default CarCard;
