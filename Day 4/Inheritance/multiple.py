#One child → multiple parents
class A:
    def a_show(self):
        print("class A")
class B:
    def b_show(self):
        print("calss B")
class C(A,B):
    def c_show(self):
        print("class c")
c=C()
c.c_show()
c.a_show()
