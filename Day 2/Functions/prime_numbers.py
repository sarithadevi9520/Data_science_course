def prime_num(num):
    if num<2:
       print(num)
    for i in range(2,num):
        if num%i==0:
            break
    print(i)

print(prime_num(56))
        