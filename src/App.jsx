import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Cars from './pages/Cars';
import About from './pages/About';
import Contact from './pages/Contact';
import Payment from './pages/Payment';
import Login from './pages/Login';

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/register' element={<Register />} />
                <Route path='/cars' element={<Cars />} />
                <Route path='/about' element={<About />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/payment' element={<Payment />} />
                <Route path='/login' element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
