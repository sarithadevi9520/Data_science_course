class StudentResult:
    def __init__(self,name,rollno,maths,physics,chemistry):
        self.name=name
        self.rollno=rollno
        self.maths = maths
        self.physics = physics
        self.chemistry = chemistry
    def total_marks(self):
        total=self.maths+self.chemistry+self.physics
        average=total/3
        print("Name:",self.name)
        print("Roll No:",self.rollno)
        print("Total marks:",total)
        print("Average Marks:",average)
student1=StudentResult("abc",1,78,89,66)
student2=StudentResult("ddg",2,60,78,88)
print(student1.total_marks())
print(student2.total_marks())
