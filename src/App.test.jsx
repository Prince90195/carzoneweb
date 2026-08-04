import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders CarZone navigation', () => {
    render(
        <MemoryRouter>
            <App />
        </MemoryRouter>,
    );

    expect(screen.getByText(/CarZone/i)).toBeInTheDocument();
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Cars/i)).toBeInTheDocument();
});
