import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className='home'>
            <section className='hero'>
                <h1>🚗 Welcome to CarZone</h1>
                <p>Find your dream car and book it in minutes.</p>
                <Link to='/cars'>
                    <button>Explore Cars</button>
                </Link>
            </section>
            <section className='about-home'>
                <h2>Why Choose CarZone?</h2>
                <p>
                    Premium cars, transparent pricing, and a simple booking experience
                    for every driver.
                </p>
            </section>
        </div>
    );
}

export default Home;
