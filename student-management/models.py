def user_helper(user) -> dict:
    return {
        "id": str(user["_id"]),
        "username": user["username"],
        "role": user["role"]
    }

def student_helper(student) -> dict:
    return {
        "id": str(student["_id"]),
        "name": student["name"],
        "age": student["age"],
        "course": student["course"]
    }