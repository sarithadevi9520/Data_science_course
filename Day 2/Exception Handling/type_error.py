def type_error(a,b):
    try:
         return a+b
    except TypeError as te:
        print(f"TypeError: {te}")
print(type_error("2",4))
print(type_error(3,4))

        
   