"""Count Occurrences
• Given `[1, 2, 2, 3, 2, 4, 1]`, count how many times a given number occurs without using `count()`.
"""
list1=[1,2,2,2,1,3,2,4,5,2,1,2,6,8]
given_num=2
count_num=0
for num in list1:
    if given_num==num:
        count_num+=1
print("Count occurances of given num:",count_num)
        