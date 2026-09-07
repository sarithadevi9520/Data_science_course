import math

def safe_sqrt(value):
    try:
        number = float(value)
    except ValueError:
        print(f"Error: '{value}' is not a valid number.")
    else:
        result = math.sqrt(number)
        print(f"Success: the square root of {number} is {result}")

safe_sqrt("25")    
safe_sqrt("abc") 