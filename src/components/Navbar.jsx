import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav>
            <div className='logo'>
                <img src='/images/prince.png' alt='CarZone Logo' />
                <h1>CarZone</h1>
            </div>
            <ul>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/cars'>Cars</Link>
                </li>
                <li>
                    <Link to='/about'>About</Link>
                </li>
                <li>
                    <Link to='/contact'>Contact</Link>
                </li>
                <li>
                    <Link to='/bookings'>Bookings</Link>
                </li>
                <li>
                    <Link to='/register'>Register</Link>
                </li>
                <li>
                    <Link to='/login'>Login</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
