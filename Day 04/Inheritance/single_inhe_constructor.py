class Student:
    def __init__(self,name):
        self.name=name
    def show_name(self):
        print("Name:",self.name)
class Person(Student):
    def show_course(self,course):
        print("COurse",course)
person=Person("jenny")
person.show_name()
person.show_course("python")