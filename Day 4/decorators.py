def login_required(f1):
    def inner_func(name,is_login):
        if is_login==False:
            print("Please login")
        return
    return inner_func()

@login_required
def home_page(name,is_login):
    print("Welcome to home page")
    
@login_required
def orders(name,is_login):
    print("Track your orders")
    
def about():
    print("About our page")
    


    