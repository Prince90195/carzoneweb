import sys
from pathlib import Path

from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

# When running from backend/ with `uvicorn main:app`, the package root is one level up.
# Add the repo root to sys.path so both `backend.*` and local imports can resolve.
ROOT_DIR = Path(__file__).resolve().parent.parent
if str(ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(ROOT_DIR))

try:
    from .database import (
        authenticate_user,
        create_booking,
        get_car_by_id,
        get_cars,
        get_db,
        init_db,
        register_user,
        get_user_by_email,
    )
    from .schemas import (
        BookingCreate,
        BookingResponse,
        CarResponse,
        LoginRequest,
        MessageResponse,
        UserCreate,
        UserResponse,
    )
except ImportError:
    try:
        from backend.database import (
            authenticate_user,
            create_booking,
            get_car_by_id,
            get_cars,
            get_db,
            init_db,
            register_user,
            get_user_by_email,
        )
        from backend.schemas import (
            BookingCreate,
            BookingResponse,
            CarResponse,
            LoginRequest,
            MessageResponse,
            UserCreate,
            UserResponse,
        )
    except ImportError:
        from database import (
            authenticate_user,
            create_booking,
            get_car_by_id,
            get_cars,
            get_db,
            init_db,
            register_user,
            get_user_by_email,
        )
        from schemas import (
            BookingCreate,
            BookingResponse,
            CarResponse,
            LoginRequest,
            MessageResponse,
            UserCreate,
            UserResponse,
        )

app = FastAPI(title='CarZone API', version='1.0.0')

origins = [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)


@app.on_event('startup')
def startup_event():
    init_db()


@app.get('/health', response_model=MessageResponse)
def health():
    return {'message': 'CarZone API is healthy'}


@app.get('/cars', response_model=list[CarResponse])
def list_cars(db: Session = Depends(get_db)):
    return get_cars(db)


@app.get('/cars/{car_id}', response_model=CarResponse)
def read_car(car_id: int, db: Session = Depends(get_db)):
    car = get_car_by_id(db, car_id)
    if car is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Car not found')
    return car


@app.post('/register', response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def register(user: UserCreate, db: Session = Depends(get_db)):
    if get_user_by_email(db, user.email):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='Email already registered')
    return register_user(db, user)


@app.post('/login', response_model=MessageResponse)
def login(credentials: LoginRequest, db: Session = Depends(get_db)):
    user = authenticate_user(db, credentials.email, credentials.password)
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Invalid credentials')
    return {'message': f'Welcome back, {user.full_name}!'}


@app.get('/bookings', response_model=list[BookingResponse])
def list_bookings(db: Session = Depends(get_db)):
    return get_bookings(db)


@app.post('/book', response_model=BookingResponse, status_code=status.HTTP_201_CREATED)
def book_car(booking: BookingCreate, db: Session = Depends(get_db)):
    car = get_car_by_id(db, booking.car_id)
    if car is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Selected car was not found')
    return create_booking(db, booking)
