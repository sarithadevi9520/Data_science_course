"""Find Duplicate Numbers
• Given `[10, 20, 30, 20, 40, 10, 50]`, find all duplicate numbers.
• Expected: `[20, 10]`."""
list1 = [10, 20, 30, 20, 40, 10, 50]

duplicates = []
checked = []

for num in list1:
    if num in checked:
        duplicates.append(num)
    else:
        checked.append(num)

print("Duplicate numbers:", duplicates)