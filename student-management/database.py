from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

# Make sure this matches your .env variable name
MONGO_URI = os.getenv("MONGO_URI")

client = MongoClient(MONGO_URI)

db = client["student_db"]

users_collection = db["users"]
students_collection = db["students"]

# Insert test document to make DB visible in Compass
if students_collection.count_documents({}) == 0:
    students_collection.insert_one({"name": "Test Student", "age": 20})

print(" MongoDB Connected and test student added")