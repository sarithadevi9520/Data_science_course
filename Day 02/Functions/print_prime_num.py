def print_prime(ll,ul):
    for i in range(ll,ul):
        if i>1:
            for num in range(2,i):
                if i%num==0:
                    break
            else:
                print(i)
print_prime(20,40)
            