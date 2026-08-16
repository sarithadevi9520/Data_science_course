def reverse_string(text):
    reverse = ""

    for char in text:
        reverse = char + reverse

    return reverse

print(reverse_string("Pythonreverse"))