class A:
    def a_show(self):
        print("class A")
class B(A):
    def b_show(self):
        print("calss B")
class C(B):
    def c_show(self):
        print("class c")
c=C()
c.c_show()
c.a_show()
c.b_show()