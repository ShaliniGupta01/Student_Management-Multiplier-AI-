from pydantic import BaseModel

class User(BaseModel):
    username: str
    password: str
    role: str  # admin or user

class Login(BaseModel):
    username: str
    password: str

class Student(BaseModel):
    name: str
    age: int
    course: str