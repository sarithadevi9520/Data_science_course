f1=open("file3.txt","a+")
print(f1.tell())
f1.seek(0)
print(f1.read())