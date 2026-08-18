#one parent -> many childs
class Vehicle:
    def cost(self,price,quantity):
        return price*quantity
    
class Bike(Vehicle):
    def bike_cost(self,price,quantity):
        print("Bike cost:",self.cost(price,quantity))
        
class Car(Vehicle):
    def car_cost(self,price,quantity):
        print("car cost:",self.cost(price,quantity))
car = Car()
car.car_cost(200000,3)
bike=Bike()
bike.bike_cost(30000,5)
