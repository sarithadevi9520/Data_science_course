student={"name":"abd",
         "age":20,
         "course":"python"}
try:
    student_data=input("Enter a key:")
    print("Value:",student[student_data])
except KeyError as ke:
    print(f"KeyError:{ke}")