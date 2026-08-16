class Employee:

    company = "Tech Solutions"

    def __init__(self, name, salary):
        self.name = name
        self.salary = salary

    def display(self):
        print(self.name, "works at", Employee.company)


e1 = Employee("Ravi", 30000)
e2 = Employee("Priya", 40000)
e3 = Employee("Kiran", 35000)

e1.display()
e2.display()
e3.display()