from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class Car(Base):
    __tablename__ = 'cars'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    price = Column(String, nullable=False)
    image = Column(String, nullable=False)
    fuel = Column(String, nullable=False)
    year = Column(String, nullable=False)


class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)


class Booking(Base):
    __tablename__ = 'bookings'

    id = Column(Integer, primary_key=True, index=True)
    car_id = Column(Integer, nullable=False)
    full_name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    card_last4 = Column(String, nullable=False)
    status = Column(String, nullable=False)
