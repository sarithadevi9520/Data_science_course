class Encapsulation:
    def __init__(self,name):
        self.name=name
        self.__marks=0
    def set_marks(self,marks):
        self.__marks=marks
    def get_marks(self):
        return self.__marks
stu=Encapsulation("jenny")
stu.set_marks(89)
print(stu.get_marks())

        