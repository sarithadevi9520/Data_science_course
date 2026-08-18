def print_even():
    for i in range(1,100):
        if i%2==0:
            yield i
for num in print_even():
    print(num)