source = open("file3.txt", "r")

data = source.read()

source.close()

destination = open("destination.txt", "w")

destination.write(data)

destination.close()

print("File copied successfully")