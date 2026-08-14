#Merge Two Lists
#• Merge two lists into a single list without using `extend()`.

list1 = [2, 3, 4, 5, 6, 7]
list2 = [2, 5, 3, 1, 8, 9]

merged_list = []

for num in list1:
    merged_list.append(num)

for num in list2:
    merged_list.append(num)

print(merged_list)