"""Separate Positive and Negative Numbers
• Given a list of integers, create two lists:
• One containing positive numbers.
• One containing negative numbers
"""
list1=[2,-1,5,3,-9,0,4,3,-3]
positive=[]
negative=[]
for num in list1:
    if num>0:
        positive.append(num)
    else:
        negative.append(num)
print("Positive:",positive)
print("Negative:",negative)