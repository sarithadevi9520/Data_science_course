def largest_list(numbers):
    largest=numbers[0]
    for num in numbers:
        if num > largest:
            largest=num
            
    return largest
marks=[56,89,98,34,56,78]
print("largest num",largest_list(marks))
    