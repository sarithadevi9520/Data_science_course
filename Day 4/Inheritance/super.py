class Student:
    def __init__(self,name):
        self.name=name
class Person(Student):
    def __init__(self, name,course):
        super().__init__(name)
        self.course=course
    def show_details(self):
        print(f"{self.name}  "
              f"{self.course}")
per=Person("jenny","python")
per.show_details()