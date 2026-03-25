# from fastapi import FastAPI
# from routes import user_routes, student_routes

# app = FastAPI(debug=True)  #  Enable debug


# # Root route
# @app.get("/")
# async def root():
#     return {"message": "Welcome to Student Management API"}


# app.include_router(user_routes.router)
# app.include_router(student_routes.router)

from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from routes import user_routes, student_routes

app = FastAPI(debug=True)

# Allow frontend (React) to access backend
origins = [
    "http://localhost:3000",  # React dev server
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,     # allow requests from React
    allow_credentials=True,
    allow_methods=["*"],       # allow GET, POST, PUT, DELETE
    allow_headers=["*"],       # allow all headers
)

# Root route
@app.get("/")
async def root():
    return {"message": "Welcome to Student Management API"}

# Include routers
app.include_router(user_routes.router)
app.include_router(student_routes.router)