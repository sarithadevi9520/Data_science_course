file = open("file3.txt", "r")

count = 0

for line in file:
    count += 1

print("Number of lines:", count)

file.close()