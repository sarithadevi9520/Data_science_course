class Employee:
    def __init__(self, name, salary):
        self.name = name
        self.salary = salary

    def display_employee(self):
        print("Name:", self.name)
        print("Salary:", self.salary)


class Developer(Employee):
    def __init__(self, name, salary, language):
        super().__init__(name, salary)
        self.language = language

    def display_developer(self):
        self.display_employee()
        print("Programming Language:", self.language)


class Tester(Employee):
    def __init__(self, name, salary, tool):
        super().__init__(name, salary)
        self.tool = tool

    def display_tester(self):
        self.display_employee()
        print("Testing Tool:", self.tool)


developer = Developer("Rahul", 50000, "Python")
developer.display_developer()

print()

tester = Tester("Priya", 45000, "Selenium")
tester.display_tester()