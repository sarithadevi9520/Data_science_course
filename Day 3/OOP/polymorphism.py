class UPI:

    def pay(self, amount):
        print("Paid ₹", amount, "using UPI")


class CreditCard:

    def pay(self, amount):
        print("Paid ₹", amount, "using Credit Card")


class Cash:

    def pay(self, amount):
        print("Paid ₹", amount, "using Cash")


upi = UPI()
card = CreditCard()
cash = Cash()

upi.pay(500)
card.pay(1000)
cash.pay(200)