from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from routes import user_routes, student_routes

app = FastAPI(debug=True)

# Allow frontend (React) to access backend
origins = [
    "https://student-management-multiplier-ai.vercel.app/",  # React dev server
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