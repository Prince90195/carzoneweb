import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/client';

function Register() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await registerUser({ full_name: fullName, email, password });
            alert('Registration complete. Please log in.');
            navigate('/login');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className='register-container'>
            <h2>Register</h2>
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type='password'
                    placeholder='Password'
                    required
                />
                <button type='submit'>Register</button>
            </form>
            {error && <p className='error'>{error}</p>}
        </div>
    );
}

export default Register;
