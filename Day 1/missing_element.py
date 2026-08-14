list1 = [1, 2, 3, 5, 6]

n = len(list1) + 1

expected_sum = n * (n + 1) // 2

actual_sum = 0

for num in list1:
    actual_sum = actual_sum + num

missing = expected_sum - actual_sum

print("Missing number:", missing)