sentence = "Python is a powerful programming language"

words = sentence.split()

longest = ""

for word in words:
  if len(word) > len(longest):
        longest = word

print(longest)





sentence = "Python is a programming language"

words = sentence.split()

shortest = words[0]

for word in words:
    if len(word) < len(shortest):
        shortest = word

print(shortest)