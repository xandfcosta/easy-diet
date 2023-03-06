from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from mysql.connector import connect, Error

app = FastAPI()

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/search_meal/{meal_name}")
async def root(meal_name):
    try:
        with connect(
            host="localhost",
            user="root",
            password="admin",
            database="easy_diet",
        ) as connection:
            with connection.cursor(dictionary=True) as cursor:
                meal_name = meal_name.replace(" ", "%")
                cursor.execute(f"SELECT * FROM meals WHERE name like '{meal_name}%'")
                meals = cursor.fetchall()
    except Error as e:
        print(e)
        
    return meals
