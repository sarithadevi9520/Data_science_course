from functools import reduce
list1=[10,20,34,56,12,45]
newlist=reduce(lambda x,y:x+y , list1)
print(newlist)