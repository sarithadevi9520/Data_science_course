"""Count Even and Odd Numbers
• Given a list of integers, count how many are even and how many are odd.
"""
list1=[10,22,23,27,49,25,23,9,7]
even_count=0
odd_count=0
for num in list1:
    if num%2==0:
        even_count+=1
    else:
        odd_count+=1
print("Even count:",+even_count)
print("Odd count:",odd_count)
        