import uuid
from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)


def test_health_endpoint():
    response = client.get('/health')
    assert response.status_code == 200
    assert response.json() == {'message': 'CarZone API is healthy'}


def test_list_cars_has_sample_data():
    response = client.get('/cars')
    assert response.status_code == 200
    cars = response.json()
    assert isinstance(cars, list)
    assert len(cars) >= 1
    assert 'name' in cars[0]


def test_register_login_and_book_flow():
    unique_email = f'user-{uuid.uuid4().hex[:8]}@example.com'
    register_payload = {
        'full_name': 'Test User',
        'email': unique_email,
        'password': 'securePass123',
    }

    response = client.post('/register', json=register_payload)
    assert response.status_code == 201
    user = response.json()
    assert user['email'] == unique_email
    assert user['full_name'] == 'Test User'

    login_response = client.post(
        '/login',
        json={'email': unique_email, 'password': 'securePass123'},
    )
    assert login_response.status_code == 200
    assert 'Welcome back' in login_response.json()['message']

    car_response = client.get('/cars')
    car_id = car_response.json()[0]['id']

    booking_payload = {
        'car_id': car_id,
        'full_name': 'Test Buyer',
        'email': unique_email,
        'card_number': '4242424242424242',
    }
    book_response = client.post('/book', json=booking_payload)
    assert book_response.status_code == 201
    booking = book_response.json()
    assert booking['car_id'] == car_id
    assert booking['card_last4'] == '4242'
    assert booking['status'] == 'confirmed'
