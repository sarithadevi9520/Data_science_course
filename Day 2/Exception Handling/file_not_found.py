try:
    f1=open("missing_file.txt","r")
    data=f1.read()
    print(data)
except FileNotFoundError as e:
    print(f"File Not Found :{e}") 