class Myfile:
    def __enter__(self):
        self.file=open("data.txt","w")
        print("File opened")
        return self.file
    def __exit__(self, exc_type, exc, tb):
        self.file.close()
        print("File CLosed")
with Myfile() as file:
    file.write("hiii")