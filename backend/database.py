from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from .models import Base, Car, User, Booking

SQLALCHEMY_DATABASE_URL = 'sqlite:///./carzone.db'
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={'check_same_thread': False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

DEFAULT_CARS = [
    {
        'name': 'Audi ARS6',
        'price': '₹68,00,000',
        'image': '/images/audi-ars6.jpg',
        'fuel': 'Petrol',
        'year': '2025',
    },
    {
        'name': 'BMW IX5',
        'price': '₹75,00,000',
        'image': '/images/bmw-ix5-exterior-19-830x553.jpg',
        'fuel': 'Petrol',
        'year': '2024',
    },
    {
        'name': 'Ferrari',
        'price': '₹100,00,000',
        'image': '/images/ferrari.jpg',
        'fuel': 'Petrol',
        'year': '2026',
    },
    {
        'name': 'Mercedes',
        'price': '₹90,00,000',
        'image': '/images/Mercedes.jpg',
        'fuel': 'Diesel',
        'year': '2024',
    },
    {
        'name': 'Audi',
        'price': '₹80,00,000',
        'image': '/images/audi.jpg',
        'fuel': 'Diesel',
        'year': '2025',
    },
    {
        'name': 'Mercedes',
        'price': '₹100,00,000',
        'image': '/images/image2.jpg',
        'fuel': 'Petrol',
        'year': '2023',
    },
]


def init_db():
    Base.metadata.create_all(bind=engine)
    with SessionLocal() as session:
        if session.query(Car).count() == 0:
            session.add_all([Car(**car) for car in DEFAULT_CARS])
            session.commit()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def get_cars(db):
    return db.query(Car).all()


def get_car_by_id(db, car_id):
    return db.query(Car).filter(Car.id == car_id).first()


def get_user_by_email(db, email):
    return db.query(User).filter(User.email == email).first()


def register_user(db, user_data):
    user = User(
        full_name=user_data.full_name,
        email=user_data.email,
        password=user_data.password,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def authenticate_user(db, email, password):
    user = get_user_by_email(db, email)
    if user is None or user.password != password:
        return None
    return user


def create_booking(db, booking_data):
    card_last4 = booking_data.card_number[-4:]
    booking = Booking(
        car_id=booking_data.car_id,
        full_name=booking_data.full_name,
        email=booking_data.email,
        card_last4=card_last4,
        status='confirmed',
    )
    db.add(booking)
    db.commit()
    db.refresh(booking)
    return booking
