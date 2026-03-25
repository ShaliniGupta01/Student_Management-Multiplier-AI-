Student Management API

A FastAPI application for managing students with user authentication (JWT) and role-based access control (admin/user). Users can sign up, log in, and admins can view/update student records.

Features
User signup & login with hashed passwords (bcrypt_sha256)
JWT-based authentication for secure API access
Role-based access control: admin vs user
CRUD operations for student records (view/update)
MongoDB as the database
Tech Stack
Backend: Python, FastAPI
Database: MongoDB
Authentication: JWT + Passlib (bcrypt_sha256)
Environment Variables: python-dotenv
Dependencies: See requirements.txt
Setup Instructions
1. Clone the repository
git clone <your-repo-url>
cd student-management
2. Create virtual environment
python -m venv venv
venv\Scripts\activate      # Windows
# source venv/bin/activate  # macOS/Linux
3. Install dependencies
pip install -r requirements.txt
4. Create .env file

Create a .env file in the root directory:

SECRET_KEY=mysecretkey
ALGORITHM=HS256
MONGO_URI=mongodb://localhost:27017/
5. Run MongoDB

Make sure MongoDB is running locally on default port (27017).

Running the API
uvicorn main:app --reload
--reload enables hot-reload on code changes
The API will run on: http://127.0.0.1:8000
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
3. Login
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
4. Create Students 
URL: /students
Method: POST
Header: Authorization: Bearer <JWT_TOKEN>
{
  "name": "rahul",
  "age": "int",
  "grade": "str"
}
Response:
[
  {"id": "1", "name": "Rahul", "age": 20, "grade": "B"},
  {"id": "2", "name": "Anjali", "age": 21, "grade": "A"}
]

5. View Students (User + Admin)
URL: /students
Method: GET
Header: Authorization: Bearer <JWT_TOKEN>
Response:
[
  {"id": "1", "name": "Rahul", "age": 20, "grade": "B"},
  {"id": "2", "name": "Anjali", "age": 21, "grade": "A"}
]
6. Update Student (Admin Only)
URL: /students/{name}
Method: PUT
Header: Authorization: Bearer <JWT_TOKEN>
Body (JSON):
{
  "age": 22,
  "grade": "A"
}
Response:
{"msg": "Updated"}
Password Rules
Passwords are truncated to 72 characters for security (bcrypt limit)
Use alphanumeric + symbols for stronger passwords
Notes
Ensure MongoDB is running
JWT tokens expire in 60 minutes by default
Admin role required for update operations
Run Tests / Seed Data

Seed initial student data:

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
