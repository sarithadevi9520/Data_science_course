class AgeError(Exception):
    pass
def check_age(age):
    if age<18:
        raise AgeError("Insufficient age,must be 18+")
    print("Eligible for vote")
try:
    check_age(12)
except AgeError as e:
    print(f"Error:{e}")