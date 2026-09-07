list1=[10,20,10,20,30,40,50,30]
unique_list=[]
for num in list1:
    if num not in unique_list:
        unique_list.append(num)
print(unique_list)