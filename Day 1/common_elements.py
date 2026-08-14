"""Find Common Elements
• Given two lists, find the elements that are present in both lists.
"""
list1=[2,3,4,5,6,7]
list2=[2,5,3,1,8,9]
common_ele=[]
for num in list1:
    if num in list2:
        common_ele.append(num)
print("Common elements in two lists:",common_ele)