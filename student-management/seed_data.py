from database import students_collection

students_collection.insert_many([
    {"name": "Rahul", "age": 20, "course": "B.Tech"},
    {"name": "Anjali", "age": 21, "course": "MBA"}
])

print(" Data inserted successfully")