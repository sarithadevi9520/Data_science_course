list1 = [23, 10, 34, 49, 60, 38]

largest = list1[0]
second_largest = list1[0]

for num in list1:
    if num > largest:
        second_largest = largest
        largest = num
    elif num > second_largest and num != largest:
        second_largest = num

print("Second largest number:", second_largest)
