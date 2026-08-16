def largest_num(a,b,c):
    if a>=b and a>=c:
        return a
    elif b>=a and b>=c:
        return b
    else:
        return c
print("Largest number:",largest_num(25,49,23))
