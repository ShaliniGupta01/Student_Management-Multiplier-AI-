from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from bson import ObjectId
from database import students_collection  # Make sure database.py has correct MongoDB URI

router = APIRouter()

# ---------------------------
# Pydantic Models
# ---------------------------

# Model for creating a student
class Student(BaseModel):
    name: str
    age: int
    grade: str

# Model for updating a student
class StudentUpdate(BaseModel):
    name: str = None
    age: int = None
    grade: str = None

# ---------------------------
# Helper Functions
# ---------------------------

# Convert MongoDB document to dictionary with string ID
def student_helper(student):
    return {
        "id": str(student["_id"]),
        "name": student.get("name"),
        "age": student.get("age"),
        "grade": student.get("grade")
    }

# ---------------------------
# CRUD Routes
# ---------------------------

# CREATE a new student
@router.post("/students")
async def create_student(student: Student):
    result = students_collection.insert_one(student.dict())
    return {
        "success": True,
        "message": "Student created successfully",
        "id": str(result.inserted_id)
    }

# GET all students
@router.get("/students")
async def get_students():
    students = [student_helper(s) for s in students_collection.find()]
    return {
        "success": True,
        "students": students
    }

# GET single student by ID
@router.get("/students/{student_id}")
async def get_student(student_id: str):
    student = students_collection.find_one({"_id": ObjectId(student_id)})
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    return {
        "success": True,
        "student": student_helper(student)
    }

# UPDATE student by ID
@router.put("/students/{student_id}")
async def update_student(student_id: str, student: StudentUpdate):
    student_data = {k: v for k, v in student.dict().items() if v is not None}
    if not student_data:
        raise HTTPException(status_code=400, detail="No data provided to update")

    result = students_collection.update_one(
        {"_id": ObjectId(student_id)},
        {"$set": student_data}
    )

    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Student not found")

    updated_student = students_collection.find_one({"_id": ObjectId(student_id)})
    return {
        "success": True,
        "message": "Student updated successfully",
        "student": student_helper(updated_student)
    }

# DELETE student by ID
@router.delete("/students/{student_id}")
async def delete_student(student_id: str):
    result = students_collection.delete_one({"_id": ObjectId(student_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Student not found")
    return {"success": True, "message": "Student deleted successfully"}