from mysql.connector import connect, Error
import json

insert_query = ("""
    INSERT INTO meals (name, calories, carbohydrates, proteins, fats)
    VALUES (%s, %s, %s, %s, %s)
""")

alter_query = ("""
    ALTER                
""")

with open("database.json", "r") as json_file:    
	json_data = json.load(json_file)
 
meals = []

for meal in json_data:
    att_list = [meal[key] for key in meal]
    att_list = att_list[1:]
    
    name = meal["name"][:200]
    for i in range(len(att_list)):
        if type(att_list[i]) == str:
            if "," in att_list[i]:
                att_list[i] = att_list[i].replace(",", ".")
            try:
                att_list[i] = float(att_list[i])
            except:
                att_list[i] = 0     

    meals.append(tuple([name] + att_list))

print(meals[2286])

try:
    with connect(
        host="localhost",
        user=input("user: "),
        password=input("admin: "),
        database="easy_diet",
    ) as connection:
        with connection.cursor() as cursor:
            cursor.executemany(insert_query, meals)
            connection.commit()
except Error as e:
    print(e)
