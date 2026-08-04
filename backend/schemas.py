from pydantic import BaseModel


class CarBase(BaseModel):
    name: str
    price: str
    image: str
    fuel: str
    year: str


class CarResponse(CarBase):
    id: int

    class Config:
        from_attributes = True


class UserCreate(BaseModel):
    full_name: str
    email: str
    password: str


class UserResponse(BaseModel):
    id: int
    full_name: str
    email: str

    class Config:
        from_attributes = True


class LoginRequest(BaseModel):
    email: str
    password: str


class BookingCreate(BaseModel):
    car_id: int
    full_name: str
    email: str
    card_number: str


class BookingResponse(BaseModel):
    id: int
    car_id: int
    full_name: str
    email: str
    card_last4: str
    status: str

    class Config:
        from_attributes = True


class MessageResponse(BaseModel):
    message: str
