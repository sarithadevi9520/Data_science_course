try:
    list1=[10,20,30]
    try:
        index=int(input("Enter an index value:"))
        print("Value:",list1[index])
    except IndexError as ie:
        print(f"Index out of range"
              f"The list has {len(list1)} items only")
except ValueError as ve:
    print(f"Enter valid integer:{ve}")