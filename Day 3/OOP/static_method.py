class Calculator:

    @staticmethod
    def add(a, b):
        return a + b

    @staticmethod
    def subtract(a, b):
        return a - b

    @staticmethod
    def multiply(a, b):
        return a * b

    @staticmethod
    def divide(a, b):
        return a / b


print(Calculator.add(10, 20))
print(Calculator.subtract(20, 5))
print(Calculator.multiply(5, 4))
print(Calculator.divide(20, 5))