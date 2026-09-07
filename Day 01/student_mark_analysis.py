"""Student Marks Analysis
• Given:
• `marks = [78, 92, 65, 88, 45, 91, 72]`
• Find:
• Highest mark.
• Lowest mark.
• Average mark.
• Number of students who scored above 75.
• Number of students who failed (below 40).
"""
marks = [78, 92, 65, 88, 45, 91, 72]
high = marks[0]
low = marks[0]
total = 0
above_75 = 0
failed = 0

for num in marks:
    if num > high:
        high = num

    if num < low:
        low = num
    total = total + num

    if num > 75:
        above_75 = above_75 + 1

    if num < 40:
        failed = failed + 1

average = total / len(marks)

print("Highest mark:", high)
print("Lowest mark:", low)
print("Average mark:", average)
print("Students above 75:", above_75)
print("Students failed:", failed)