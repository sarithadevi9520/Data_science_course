items = ["apple", "banana", "cherry"]

try:
    index = int(input("Enter an index: "))
    print("Item:", items[index])
    
except ValueError as ve:
    print(f"ValueError:{ve}")
except IndexError as ie:
    print(f"Error: {ie}. "
          f"The list has {len(items)} items (valid indices: 0 to {len(items) - 1}).")