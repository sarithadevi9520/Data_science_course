class InsufficientMoney(Exception):
    pass
try:
    balance=50000
    amount=float(input("Enter withdraw amount"))
    if amount <=0:
        raise ValueError("Amount must be graeter than 0")
    if amount>balance:
        raise InsufficientMoney(f"Insufficient money,please enter amount less than {balance}")
    balance-=amount
    print("withdraw successful!")
    print("Remaining balance:",balance)
except ValueError as ve:
    print(f"{ve}")
except InsufficientMoney as im:
    print(f"{im}")