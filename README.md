Student Management API

A FastAPI application for managing student records with user authentication (JWT) and role-based access control. Users can sign up and log in, while admins have privileges to view and update student data.

Features
User Authentication
Signup and login with hashed passwords using bcrypt_sha256.
JWT-based Authorization
Secure API access with JSON Web Tokens.
Role-Based Access Control
Distinguishes between admin and user roles.
Student Record Management
CRUD operations for students (view and update).
Database
MongoDB as the persistent storage layer.
Tech Stack
Backend: Python, FastAPI
Database: MongoDB
Authentication: JWT + Passlib (bcrypt_sha256)
Environment Variables: python-dotenv
Dependencies: See requirements.txt
Setup Instructions
1. Clone the Repository
git clone <your-repo-url>
cd student-management
2. Create a Virtual Environment
python -m venv venv
# Activate
venv\Scripts\activate      # Windows
source venv/bin/activate  # macOS/Linux
3. Install Dependencies
pip install -r requirements.txt
4. Run MongoDB

Ensure MongoDB is running locally on the default port 27017.

Running the API
uvicorn main:app --reload
The --reload flag enables hot-reload on code changes.
API will be available at: http://127.0.0.1:8000
API Endpoints
1. Signup
URL: /signup
Method: POST
Body (JSON):
{
  "username": "admin",
  "password": "admin123",
  "role": "admin"
}
Response:
{"msg": "Admin created successfully"}
{
  "username": "rahul",
  "password": "mypassword",
  "role": "user"
}
Response:
{"msg": "User created successfully"}
2. Login
URL: /login
Method: POST
Body (JSON):
{
  "username": "rahul",
  "password": "mypassword"
}
Response:
{
  "access_token": "<JWT_TOKEN>",
  "token_type": "bearer"
}
3. Create Students
URL: /students
Method: POST
Headers: Authorization: Bearer <JWT_TOKEN>
Body (JSON):
{
  "name": "Rahul",
  "age": 20,
  "grade": "B"
}
Response:
[
  {"id": "1", "name": "Rahul", "age": 20, "grade": "B"},
  {"id": "2", "name": "Anjali", "age": 21, "grade": "A"}
]
4. View Students (Admin + User)
URL: /students
Method: GET
Headers: Authorization: Bearer <JWT_TOKEN>
Response:
[
  {"id": "1", "name": "Rahul", "age": 20, "grade": "B"},
  {"id": "2", "name": "Anjali", "age": 21, "grade": "A"}
]
5. Update Student (Admin Only)
URL: /students/{name}
Method: PUT
Headers: Authorization: Bearer <JWT_TOKEN>
Body (JSON):
{
  "age": 22,
  "grade": "A"
}
Response:
{"msg": "Updated"}
Password Guidelines
Passwords are truncated to 72 characters (bcrypt limitation).
Use a combination of alphanumeric characters and symbols for stronger passwords.
Notes
Ensure MongoDB is running before starting the API.
JWT tokens expire after 60 minutes by default.
Admin role is required for updating student records.
Seed Initial Data
from database import students_collection

students_collection.insert_many([
    {"name": "Rahul", "age": 20, "grade": "B"},
    {"name": "Anjali", "age": 21, "grade": "A"}
])
print("Data inserted successfully")
Requirements (requirements.txt)
fastapi
uvicorn
pydantic
python-dotenv
passlib[bcrypt]
python-jose
pymongo
