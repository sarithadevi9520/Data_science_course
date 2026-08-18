from dataclasses import dataclass,field

@dataclass
class Person:
    name:str
    age:int
    password:str=field(repr=False)
    is_alive:bool=True
    
    
    def __post_init__(self):
        if self.age<0:
            raise ValueError("Age cannot be negative")
        
person=Person("jenny",20,"password")
person1=Person("tom",23,"password1")
print(person)
print(person1)
print(person==person1)