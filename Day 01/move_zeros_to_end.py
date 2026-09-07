"""Move Zeros to the End
• Given `[0, 5, 0, 3, 8, 0, 2]`, move all zeros to the end.
• Expected: `[5, 3, 8, 2, 0, 0, 0]`."""
list1 = [0, 5, 0, 3, 8, 0, 2]

result = []
zero_count = 0

for num in list1:
    if num != 0:
        result.append(num)
    else:
        zero_count = zero_count + 1

for i in range(zero_count):
    result.append(0)

print(result)