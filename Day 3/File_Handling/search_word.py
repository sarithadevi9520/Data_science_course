file = open("file3.txt", "r")

data = file.read()

word = input("Enter word to search: ")

if word in data:
    print("Word found")
else:
    print("Word not found")

file.close()