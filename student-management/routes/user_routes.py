from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from database import users_collection
from auth import hash_password, verify_password

router = APIRouter()

class User(BaseModel):
    username: str
    password: str
    role: str = "user"

@router.post("/signup")
async def signup(user: User):
    if users_collection.find_one({"username": user.username}):
        raise HTTPException(status_code=400, detail="User already exists")

    hashed_password = hash_password(user.password)  # ✅ make sure password is truncated inside hash_password
    users_collection.insert_one({
        "username": user.username,
        "password": hashed_password,
        "role": user.role
    })

    # ✅ Correct JSON response, no trailing commas
    return {
        "success": True,
        "message": "User created successfully",
        "username": user.username,
        "role": user.role
    }

@router.post("/login")
async def login(user: User):
    db_user = users_collection.find_one({"username": user.username})
    if not db_user or not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    # ✅ Correct JSON response, no trailing commas
    return {
        "success": True,
        "message": "Login successful",
        "username": db_user["username"],
        "role": db_user["role"]
    }