def zero_division(a,b):
    try:
        result=a/b
        return result
    except ZeroDivisionError as e:
       print(f"ZeroDivisionError: {e}")
print(zero_division(10,0))
print(zero_division(10,5))
