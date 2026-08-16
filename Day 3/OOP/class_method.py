class Employee:

    company = "ABC Technologies"

    def __init__(self, name):
        self.name = name

    @classmethod
    def change_company(cls, new_company):
        cls.company = new_company

    def display(self):
        print(self.name, "works at", self.company)

e1 = Employee("Ravi")
e2 = Employee("Priya")

e1.display()
e2.display()

Employee.change_company("Google")
print("\nAfter changing company:\n")

e1.display()
e2.display()