const API_BASE = import.meta.env.VITE_API_BASE ?? '/api';

async function request(path, options = {}) {
    const response = await fetch(`${API_BASE}${path}`, {
        headers: {
            'Content-Type': 'application/json',
        },
        ...options,
    });

    const responseText = await response.text();
    let payload = null;

    if (responseText) {
        try {
            payload = JSON.parse(responseText);
        } catch (err) {
            if (response.ok) {
                throw new Error('Invalid JSON response from API');
            }
            throw new Error(responseText || 'Failed to fetch from API');
        }
    }

    if (!response.ok) {
        throw new Error(payload?.detail || payload?.message || responseText || 'Failed to fetch from API');
    }

    return payload;
}

export function fetchCars() {
    return request('/cars');
}

export function fetchCar(carId) {
    return request(`/cars/${carId}`);
}

export function registerUser(data) {
    return request('/register', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

export function loginUser(data) {
    return request('/login', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

export function createBooking(data) {
    return request('/book', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}
