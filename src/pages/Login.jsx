import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/client';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await loginUser({ email, password });
            alert(response.message);
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className='login-container'>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type='email'
                    placeholder='Enter Email'
                    required
                />
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type='password'
                    placeholder='Enter Password'
                    required
                />
                <button type='submit'>Login</button>
            </form>
            {error && <p className='error'>{error}</p>}
        </div>
    );
}

export default Login;
