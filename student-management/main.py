from fastapi import FastAPI
from routes import user_routes, student_routes

app = FastAPI(debug=True)  #  Enable debug


# Root route
@app.get("/")
async def root():
    return {"message": "Welcome to Student Management API"}


app.include_router(user_routes.router)
app.include_router(student_routes.router)